# Yug Node.js Practical Exam

## JWT Login + Profile API

---

# 🎯 Objective

Build a simple **JWT-based Login + Profile REST API** using:

* Node.js
* Express.js
* MongoDB
* JWT (jsonwebtoken)
* bcryptjs
* dotenv
* Postman

By the end of this practical, students will be able to:

* Create a User Registration API
* Hash passwords using bcrypt
* Authenticate users using Login API
* Generate JWT tokens
* Protect routes using JWT middleware
* Access the logged-in user's profile

---

# ⏱ Duration

### Hour 1 – Setup & Authentication APIs

* Project Setup
* Install Required Packages
* MongoDB Connection
* Create User Model
* Register API
* Login API

### Hour 2 – JWT Authentication

* JWT Token Generation
* Authentication Middleware
* Protected Profile Route
* Postman Testing
* Logout Discussion (Optional)

---

# 📁 Folder Structure

```text
jwt-lab/
│
├── models/
│   └── User.js
│
├── middleware/
│   └── auth.js
│
├── .env
├── package.json
├── server.js
└── README.md
```

---

# Step 1: Create Project

```bash
mkdir jwt-lab
cd jwt-lab
npm init -y
```

---

# Step 2: Install Packages

```bash
npm install express mongoose bcryptjs jsonwebtoken dotenv
npm install --save-dev nodemon
```

---

# Step 3: Update package.json

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Run the project:

```bash
npm run dev
```

---

# Step 4: Create Environment File

Create a **.env** file.

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/jwt_lab

JWT_SECRET=mysecretkey
```

---

# Step 5: Connect MongoDB

Use Mongoose to connect your application to MongoDB.

```javascript
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
```

---

# Step 6: Create User Model

Create **models/User.js**

Fields:

* name
* email
* password

Password should be stored in encrypted (hashed) form.

---

# Step 7: Register API

### Route

```
POST /register
```

### Request Body

```json
{
    "name":"John",
    "email":"john@gmail.com",
    "password":"123456"
}
```

### Process

* Validate input
* Check if email already exists
* Hash password using bcrypt
* Save user
* Return success response

### Success Response

```json
{
    "message":"User Registered Successfully"
}
```

---

# Step 8: Login API

### Route

```
POST /login
```

### Request Body

```json
{
    "email":"john@gmail.com",
    "password":"123456"
}
```

### Process

* Find user by email
* Compare password using bcrypt
* Generate JWT token
* Return token

### Success Response

```json
{
    "token":"JWT_TOKEN"
}
```

---

# Step 9: JWT Token

Generate a token after successful login.

Example:

```javascript
jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
);
```

---

# Step 10: Authentication Middleware

Create:

```
middleware/auth.js
```

Responsibilities:

* Read token from Authorization header
* Verify JWT
* Decode user information
* Allow request to continue if valid
* Return Unauthorized if token is invalid

Header Format:

```
Authorization: Bearer JWT_TOKEN
```

---

# Step 11: Protected Profile API

### Route

```
GET /profile
```

### Middleware

```
auth
```

### Response

```json
{
    "_id":"...",
    "name":"John",
    "email":"john@gmail.com"
}
```

Only logged-in users should access this route.

---

# Step 12: Test Using Postman

## Register

```
POST
http://localhost:5000/register
```

---

## Login

```
POST
http://localhost:5000/login
```

Copy the generated JWT token.

---

## Profile

```
GET
http://localhost:5000/profile
```

Add Header:

```
Authorization

Bearer YOUR_TOKEN
```

If the token is valid, the user's profile will be returned.

---

# API Summary

| Method | Endpoint  | Description                              |
| ------ | --------- | ---------------------------------------- |
| POST   | /register | Register a new user                      |
| POST   | /login    | Login and receive JWT                    |
| GET    | /profile  | Get logged-in user's profile (Protected) |

---

# Flow Diagram

```text
Register
    │
    ▼
Save User (Password Hashed)
    │
    ▼
Login
    │
    ▼
Verify Password
    │
    ▼
Generate JWT
    │
    ▼
Send Token
    │
    ▼
Client Stores Token
    │
    ▼
Protected API (/profile)
    │
    ▼
JWT Middleware
    │
    ▼
Verify Token
    │
    ▼
Return User Profile
```

---

# Learning Outcomes

After completing this practical, students will understand:

* Express.js project setup
* MongoDB integration using Mongoose
* Environment variables with dotenv
* Password hashing using bcryptjs
* JWT authentication
* Authentication middleware
* Protected REST APIs
* API testing using Postman

---

# Viva Questions

1. What is JWT?
2. Why do we hash passwords?
3. What is bcryptjs?
4. What is the purpose of dotenv?
5. What is middleware in Express.js?
6. What is the difference between authentication and authorization?
7. Where is the JWT token stored?
8. What happens if a JWT token expires?
9. Why should passwords never be stored in plain text?
10. Why do we use the Authorization header?

---

# Conclusion

This practical demonstrates a complete JWT Authentication system using Node.js, Express.js, MongoDB, bcryptjs, and JSON Web Tokens. Students learn how to securely register users, authenticate logins, protect routes with middleware, and retrieve authenticated user information using REST APIs tested through Postman.
