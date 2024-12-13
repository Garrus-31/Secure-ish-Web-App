# Secure-ish-Web-App
Overview

This project is an implementation of a Secure Web Application built from the ground up using HTML, CSS, JavaScript and NodeJS. The main purpose of the application itself is to take and save notes for the user. It also provides the functionality to edit and delete the saved notes.

Features

The web application features a registration page which stores user data in a database with the passwords hashed, a login page which checks the database to see if the login parameters match registered entries and the main app itself, which allows users to save, edit and delete notes. 

Security Implementations

Several features have been inplemented to bolster the security of the web application, these include: input validation on both the frontend and backend, session authorization and handling, input sanitization, user authentication, password hashing and secure cookie implementation.

Project Structure

All files are contained within the "public" folder. There are several files of note, which include:
1. LoginForm.html - "Handles login functionality"
2. Registration.html - "Handles registration"
3. index.html - "Main page which contains the web application and its functionality"
4. style.css - "Stylesheet for the login and registration pages"
5. valid.js - "Javascript file used to handle input sanitization in all three .html pages"
6. DB.js - "Used to initialize the database"
7. users.db - "Stores the registration and login information"
8. server.js - "NodeJS file which handles server-side functionality"
9. Background.jpeg - "Background for the login and registration pages"

Installation Instructions

Install [NodeJS]([https://www.google.com](https://nodejs.org/en/download/package-manager))
Using this webapp requires installing the following tools within the project directory:
1. Node.js - install in terminal using command 
2. Express - npm install express
3. Express Session - npm install express-session
4. Body Parser - npm install body-parser
5. SQLite - npm install sqlite3

To start the server, open up a terminal in the root folder and run the command "node server.js". After this, you will be required to register an account and login before being able to use the application.
