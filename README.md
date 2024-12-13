# Secure-ish-Web-App
**Overview**

This project is an implementation of a Secure Web Application built from the ground up using HTML, CSS, JavaScript and NodeJS. The main purpose of the application itself is to take and save notes for the user. It also provides the functionality to edit and delete the saved notes.

**Features**

The web application features a registration page that stores user data in a database with the passwords hashed, a login page that checks the database to see if the login parameters match registered entries and the main app itself, which allows users to save, edit and delete notes. 

**Security Implementations**

Several features have been implemented to bolster the security of the web application, these include: input validation on both the frontend and backend, session authorization and handling, input sanitization, user authentication, password hashing, use of parameterized queries and secure cookie implementation.

**Project Structure**

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
10. package.json & package-lock.json - "Gives detailed information about the project dependencies"

**Installation Instructions**

Install <a href="https://nodejs.org/en/download/package-manager">NodeJS</a> on your computer. After installing NodeJS, open a command line terminal in the /public directory and install the needed tools using "npm install express express-session sqlite3 bcryptjs body-parser" or install them individually with the commands given:
1. Express - "npm install express"
2. Express Session - "npm install express-session"
3. Body Parser - "npm install body-parser"
4. Bcrypt - "npm install bcryptjs"
5. SQLite - "npm install sqlite3"

To start the server, open up a terminal in the root folder and run the command "node server.js". Once the server starts, follow the link to open up the login page. You will be required to register an account and login before being able to use the application.

**Usage Guidelines**

Registration:
1. Navigate to the registration page by clicking on the "Register" link at the bottom of the login form.
2. Fill in the registration form:
   Username: It must be a valid email address and it must be unique. If the email already exists, the system 
   will prompt you to choose another or log in.
   Password: It must be 7-16 characters long, must start with a letter and can contain only letters, 
   numbers, or underscores.
3. Submit the form.
4. If the registration is successful, you will see a confirmation message with a link to log in.

Logging In:
1. Enter your registered email and password and click the "login" button.
2. If the login details are correct, you will be redirected to the protected dashboard.

You will be notified if your login credentials are invalid.

Dashboard:
1. Click on the "+" icon to open an input box where you can enter a task to add to the application.
2. You can edit the task by clicking on the pencil icon or delete it by clicking on the trash icon.
3. Click on the Github icon toward the end of the page to redirect to the linked repository.
4. Click on the "Logout" button toward the end of the webpage to end the session. Doing this redirects you 
   to the login page.

If you try to access the dashboard without being logged in, the system will redirect you with an "Unauthorized" error. Sessions also expire automatically after 30 seconds of inactivity. If your session expires, log in again.

**Security Implementations**:

1. Input Validation: Input validation was added to the login form, registration form and dashboard to 
   prevent users from entering malicious data or weak credentials, reducing risks like credential stuffing 
   or brute force attacks.
2. Parameterized Queries: Used "?" placeholders in SQL queries and bound inputs to prevent SQL injection.
3. Password Hashing: Passwords stored in the database were hashed using bcrypt to help protect against 
   password leakage in case of database breaches, ensuring passwords cannot be easily reversed.
4. Session Control: Session control was used to ensure that the dashboard times out after a brief period of 
   inactivity. This helpt to prevent session hijacking.
5. Secure Cookies: The implemented session cookie included the "httpOnly" and "SameSite" tags to help 
   prevent XSS and CSRF attacks.
6. Cache Control: Disabled caching of sensitive pages to prevent unauthorized access to sensitive data 
   through browser back buttons or cached copies.

