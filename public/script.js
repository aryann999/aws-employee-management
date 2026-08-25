async function loadEmployees() {

    try {

        const response =
            await fetch("/api/employees");


        const employees =
            await response.json();


        const table =
            document.getElementById(
                "employeeTable"
            );


        table.innerHTML = "";


        employees.forEach(employee => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${employee.employee_id}</td>

                <td>${employee.name}</td>

                <td>${employee.email}</td>

                <td>${employee.department}</td>

                <td>${employee.designation}</td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deleteEmployee('${employee.employee_id}')">

                        Delete

                    </button>

                </td>

            `;


            table.appendChild(row);

        });


        updateDashboard(employees);


    } catch (error) {

        console.error(error);

        alert(
            "Unable to load employees"
        );

    }

}



function updateDashboard(employees) {

    document.getElementById(
        "totalEmployees"
    ).textContent =
        employees.length;


    document.getElementById(
        "itEmployees"
    ).textContent =
        employees.filter(
            employee =>
                employee.department === "IT"
        ).length;


    document.getElementById(
        "supportEmployees"
    ).textContent =
        employees.filter(
            employee =>
                employee.department === "Support"
        ).length;


    document.getElementById(
        "hrEmployees"
    ).textContent =
        employees.filter(
            employee =>
                employee.department === "HR"
        ).length;

}



document
    .getElementById("employeeForm")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const employee = {

                employee_id:
                    document.getElementById(
                        "employee_id"
                    ).value,

                name:
                    document.getElementById(
                        "name"
                    ).value,

                email:
                    document.getElementById(
                        "email"
                    ).value,

                department:
                    document.getElementById(
                        "department"
                    ).value,

                designation:
                    document.getElementById(
                        "designation"
                    ).value

            };


            try {

                const response =
                    await fetch(
                        "/api/employees",
                        {

                            method:
                                "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    employee
                                )

                        }
                    );


                const result =
                    await response.json();


                if (!response.ok) {

                    alert(
                        result.error
                    );

                    return;

                }


                alert(
                    "Employee added successfully"
                );


                document
                    .getElementById(
                        "employeeForm"
                    )
                    .reset();


                loadEmployees();


            } catch (error) {

                console.error(error);

                alert(
                    "Server error"
                );

            }

        }
    );



async function deleteEmployee(employeeId) {

    if (
        !confirm(
            "Delete this employee?"
        )
    ) {

        return;

    }


    try {

        const response =
            await fetch(
                `/api/employees/${employeeId}`,
                {

                    method:
                        "DELETE"

                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            alert(
                result.error
            );

            return;

        }


        alert(
            "Employee deleted"
        );


        loadEmployees();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to delete employee"
        );

    }

}



loadEmployees();
