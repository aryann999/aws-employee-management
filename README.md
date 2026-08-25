# AWS Employee Management System

A production-style employee management application built using AWS.

## Architecture

GitHub
↓
EC2
↓
Application Load Balancer
↓
Node.js Application
↓
Amazon RDS MySQL

## AWS Services

- Amazon VPC
- Amazon EC2
- Application Load Balancer
- Amazon RDS
- IAM
- Security Groups
- CloudWatch
- GitHub

## Features

- Employee dashboard
- Add employee
- View employees
- Delete employee
- REST API
- Health check endpoint
- MySQL database
- AWS infrastructure
- Load balancer

## API Endpoints

GET /api/employees

GET /api/employees/:id

POST /api/employees

PUT /api/employees/:id

DELETE /api/employees/:id

GET /health

## Security

Database credentials are stored using environment variables.

Sensitive files such as `.env` and `.pem` are excluded using `.gitignore`.

## Learning Objectives

This project demonstrates:

- AWS networking
- VPC
- Public and private subnets
- EC2 deployment
- RDS connectivity
- Security Groups
- Application Load Balancing
- Linux administration
- Node.js
- Git/GitHub
- Cloud troubleshooting
