const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));


/*
==================================================
DATABASE CONNECTION
==================================================
*/

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


/*
==================================================
HEALTH CHECK
==================================================
*/

app.get("/health", async (req, res) => {

    try {

        await db.query("SELECT 1");

        res.status(200).json({
            status: "UP",
            application: "Employee Management System",
            database: "Connected"
        });

    } catch (error) {

        res.status(500).json({
            status: "DOWN",
            application: "Employee Management System",
            database: "Disconnected",
            error: error.message
        });

    }

});


/*
==================================================
GET ALL EMPLOYEES
==================================================
*/

app.get("/api/employees", async (req, res) => {

    try {

        const [rows] = await db.query(
            "SELECT * FROM employees ORDER BY employee_id"
        );

        res.json(rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Unable to retrieve employees"
        });

    }

});


/*
==================================================
GET SINGLE EMPLOYEE
==================================================
*/

app.get("/api/employees/:id", async (req, res) => {

    try {

        const [rows] = await db.query(
            "SELECT * FROM employees WHERE employee_id = ?",
            [req.params.id]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                error: "Employee not found"
            });

        }

        res.json(rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Unable to retrieve employee"
        });

    }

});


/*
==================================================
ADD EMPLOYEE
==================================================
*/

app.post("/api/employees", async (req, res) => {

    try {

        const {
            employee_id,
            name,
            email,
            department,
            designation
        } = req.body;


        if (
            !employee_id ||
            !name ||
            !email ||
            !department ||
            !designation
        ) {

            return res.status(400).json({
                error: "All fields are required"
            });

        }


        await db.query(
            `INSERT INTO employees
            (employee_id, name, email, department, designation)
            VALUES (?, ?, ?, ?, ?)`,
            [
                employee_id,
                name,
                email,
                department,
                designation
            ]
        );


        res.status(201).json({
            message: "Employee created successfully"
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Unable to create employee"
        });

    }

});


/*
==================================================
UPDATE EMPLOYEE
==================================================
*/

app.put("/api/employees/:id", async (req, res) => {

    try {

        const {
            name,
            email,
            department,
            designation
        } = req.body;


        const [result] = await db.query(
            `UPDATE employees
             SET name = ?,
                 email = ?,
                 department = ?,
                 designation = ?
             WHERE employee_id = ?`,
            [
                name,
                email,
                department,
                designation,
                req.params.id
            ]
        );


        if (result.affectedRows === 0) {

            return res.status(404).json({
                error: "Employee not found"
            });

        }


        res.json({
            message: "Employee updated successfully"
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Unable to update employee"
        });

    }

});


/*
==================================================
DELETE EMPLOYEE
==================================================
*/

app.delete("/api/employees/:id", async (req, res) => {

    try {

        const [result] = await db.query(
            "DELETE FROM employees WHERE employee_id = ?",
            [req.params.id]
        );


        if (result.affectedRows === 0) {

            return res.status(404).json({
                error: "Employee not found"
            });

        }


        res.json({
            message: "Employee deleted successfully"
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Unable to delete employee"
        });

    }

});


/*
==================================================
START SERVER
==================================================
*/

app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `Employee Management Server running on port ${PORT}`
    );

});
