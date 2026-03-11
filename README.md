# Registration Flow

A simple **Node.js** and **Express** application for user registration, login, and profile management. This project demonstrates a basic registration workflow using MongoDB for data storage, JWT for authentication, and validation middleware for request handling.

---

## 🔧 Features

- User sign up with validation and password hashing (bcrypt)
- User login with JWT token generation
- Protected routes using JWT authentication
- Fetch list of registered users
- Fetch individual user profiles with authorization check
- Rate limiting on sensitive endpoints

---

## 📁 Project Structure

```
registration-flow/
├─ config/
│  └─ db.js                # Database connection setup
├─ controllers/
│  └─ userController.js    # Business logic for user operations
├─ middelware/
│  ├─ auth.js              # JWT authentication middleware
│  └─ errorMiddleware.js    # Validation error handler
├─ models/
│  └─ userModel.js         # Mongoose schema/model for users
├─ routes/
│  └─ userRoute.js         # Express routes for user endpoints
├─ index.js                # Application entry point
├─ package.json            # Dependencies and scripts
└─ README.md               # This file
```

---

## 📦 Prerequisites

Make sure you have the following installed:

- Node.js (>= 14)
- npm or yarn
- MongoDB database (local or Atlas)

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository_url>
   cd registration-flow
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or yarn install
   ```

3. **Create a `.env` file** in the root directory with the following variables:
   ```ini
   PORT=3000
   MONGO_URI=<your_mongo_connection_string>
   secretKey=<jwt_secret_key>
   ```

4. **Run the server**
   ```bash
   npm start
   # or nodemon index.js for development
   ```

The server will start on `http://localhost:3000` by default.

---

## 📡 API Endpoints

All endpoints are prefixed with `/user`.

### Sign Up
- **URL:** `POST /user/signUp`
- **Body:**
  ```json
  {
    "name": "john doe",
    "email": "john@example.com",
    "password": "password123",
    "age": 30
  }
  ```
- **Description:** Registers a new user. Validates input and hashes the password.

### Login
- **URL:** `POST /user/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** Returns a JWT token used for authenticated requests.

### Fetch Users List (Protected)
- **URL:** `GET /user/usersList`
- **Headers:** `Authorization: Bearer <token>`
- **Description:** Returns an array of all users (without sensitive fields).

### Fetch Profile (Protected)
- **URL:** `GET /user/profile?_id=<userId>`
- **Headers:** `Authorization: Bearer <token>`
- **Description:** Returns profile details for the specified user ID; only accessible by the owner.

---

## 🛡️ Authentication & Validation

- **JWT tokens** are generated during login and are required for `/usersList` and `/profile` routes.
- Tokens expire after 5 minutes (configured in controller).
- Input validation is handled with `express-validator` and custom middleware.
- Rate limiting applied to the `/usersList` route to prevent abuse.

---

## 📁 Additional Notes

- Make sure your MongoDB URI allows connections from your application.
- You can customize CORS origin settings in `index.js`.
- Feel free to expand the project with features like email verification or password reset.

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👤 Author

Developed by Nishant Gautam for XenelSoft Interview Machine Coding round.
