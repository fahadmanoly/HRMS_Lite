Project Overview
This project is a full-stack web application designed to streamline Human Resource operations. It provides a centralized platform for managing employee data and tracking daily attendance logs.



Tech Stack Used
 Frontend - React.js, Axios, Bootstrap.
 Backend - Django, Django REST Framework.
 Database - PostgreSQL

Steps to Run the Project Locally
1. Backend Configuration
Ensure Python is installed on your system.

Configure a Python virtual environment to isolate project dependencies.

Install the necessary libraries including Django, djangorestframework, and django-cors-headers.

Instal PostgreSQL and Run the database migrations to initialize the schema.

Start the Django development server.

2. Frontend Configuration
Ensure Node.js and npm are installed on your system.

Install the project dependencies defined in the package configuration.

Start the React development server to launch the interface in your browser.

Assumptions or Limitations

Daily Attendance Limit: The system assumes an employee can only have one attendance status (Present or Absent) per calendar day. 

Authentication: This version does not include a user login system or authentication.

Image upload: There is currently no support for uploading employee profile pictures.

