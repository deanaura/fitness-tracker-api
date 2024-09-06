# Fitness Tracker API
This project is a fitness tracker API built with Node.js and MongoDB. It provides functionality for user authentication, goal management, and workout tracking. Users can register, log in, and manage their fitness goals and workout records. Admins have additional capabilities to view and manage all users.

## Technology Used

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express**: Web framework for Node.js, used for building the API.
- **MongoDB**: NoSQL database for storing user data, goals, and workouts.
- **Mongoose**: ODM library for MongoDB, used for schema modeling and querying.
- **JWT (JSON Web Tokens)**: Used for secure authentication and authorization.
- **bcryptjs**: Library for hashing passwords.
- **dotenv**: For managing environment variables.

## Features

- **User Authentication**
  - Register new users
  - Login users and generate JWT tokens
  - Middleware for user authentication and admin access

- **Goal Management**
  - Add new fitness goals
  - Retrieve goals for the authenticated user
  - Update progress of existing goals
  - Delete goals

- **Workout Tracking**
  - Create new workout entries
  - Retrieve workout history for the authenticated user
  - Get fitness statistics based on workout data
  - Delete workout entries

- **Admin Features**
  - View all registered users
  - Delete users by ID

## API Endpoints

### Authentication Routes

- **POST** `/api/register`
  - **Description**: Register a new user.
  - **Request Body**:
    ```json
    {
      "username": "string",
      "password": "string",
      "role": "string"  // Optional, defaults to 'user'
    }
    ```
  - **Response**:
    - **Success** (201):
      ```json
      {
        "message": "User registered successfully"
      }
      ```
    - **Error** (500):
      ```json
      {
        "message": "Internal Server Error"
      }
      ```

- **POST** `/api/login`
  - **Description**: Login with username and password to receive a JWT token.
  - **Request Body**:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - **Response**:
    - **Success** (200):
      ```json
      {
        "token": "jwt_token"
      }
      ```
    - **Error** (400):
      ```json
      {
        "message": "Invalid credentials"
      }
      ```
    - **Error** (500):
      ```json
      {
        "message": "Internal Server Error"
      }
      ```

### Goal Routes (Protected)

- **POST** `/api/goals`
  - **Description**: Add a new goal for the authenticated user.
  - **Headers**:
    - `Authorization: Bearer <jwt_token>`
  - **Request Body**:
    ```json
    {
      "goalName": "string",
      "target": "number"
    }
    ```
  - **Response**:
    - **Success** (201):
      ```json
      {
        "_id": "goal_id",
        "userId": "user_id",
        "goalName": "string",
        "target": "number",
        "progress": "number",
        "date": "date"
      }
      ```
    - **Error** (401):
      ```json
      {
        "message": "Unauthorized"
      }
      ```
    - **Error** (500):
      ```json
      {
        "message": "Internal Server Error"
      }
      ```

- **GET** `/api/goals`
  - **Description**: Retrieve all goals for the authenticated user.
  - **Headers**:
    - `Authorization: Bearer <jwt_token>`
  - **Response**:
    - **Success** (200):
      ```json
      [
        {
          "_id": "goal_id",
          "userId": "user_id",
          "goalName": "string",
          "target": "number",
          "progress": "number",
          "date": "date"
        }
      ]
      ```
    - **Error** (401):
      ```json
      {
        "message": "Unauthorized"
      }
      ```
    - **Error** (500):
      ```json
      {
        "message": "Internal Server Error"
      }
      ```

- **PUT** `/api/goals/:id`
  - **Description**: Update the progress of a specific goal.
  - **Headers**:
    - `Authorization: Bearer <jwt_token>`
  - **Request Body**:
    ```json
    {
      "progress": "number"
    }
    ```
  - **Response**:
    - **Success** (200):
      ```json
      {
        "_id": "goal_id",
        "userId": "user_id",
        "goalName": "string",
        "target": "number",
        "progress": "number",
        "date": "date"
      }
      ```
    - **Error** (401):
      ```json
      {
        "message": "Unauthorized"
      }
      ```
    - **Error** (404):
      ```json
      {
        "message": "Goal not found"
      }
      ```
    - **Error** (500):
      ```json
      {
        "message": "Internal Server Error"
      }
      ```

- **DELETE** `/api/goals/:id`
  - **Description**: Delete a specific goal.
  - **Headers**:
    - `Authorization: Bearer <jwt_token>`
  - **Response**:
    - **Success** (200):
      ```json
      {
        "message": "Goal deleted successfully"
      }
      ```
    - **Error** (401):
      ```json
      {
        "message": "Unauthorized"
      }
      ```
    - **Error** (404):
      ```json
      {
        "message": "Goal not found"
      }
      ```
    - **Error** (500):
      ```json
      {
        "message": "Internal Server Error"
      }
      ```

### Workout Routes (Protected)

- **POST** `/api/workouts`
  - **Description**: Create a new workout entry.
  - **Headers**:
    - `Authorization: Bearer <jwt_token>`
  - **Request Body**:
    ```json
    {
      "exercise": "string",
      "duration": "number",
      "caloriesBurned": "number"
    }
    ```
  - **Response**:
    - **Success** (201):
      ```json
      {
        "_id": "workout_id",
        "exercise": "string",
        "duration": "number",
        "caloriesBurned": "number",
        "date": "date",
        "userId": "user_id"
      }
      ```
    - **Error** (401):
      ```json
      {
        "message": "Unauthorized"
      }
      ```
    - **Error** (500):
      ```json
      {
        "message": "Internal Server Error"
      }
      ```

- **GET** `/api/workouts`
  - **Description**: Get all workout entries for the authenticated user.
  - **Headers**:
    - `Authorization: Bearer <jwt_token>`
  - **Response**:
    - **Success** (200):
      ```json
      [
        {
          "_id": "workout_id",
          "exercise": "string",
          "duration": "number",
          "caloriesBurned": "number",
          "date": "date",
          "userId": "user_id"
        }
      ]
      ```
    - **Error** (401):
      ```json
      {
        "message": "Unauthorized"
      }
      ```
    - **Error** (500):
      ```json
      {
        "message": "Internal Server Error"
      }
      ```

- **GET** `/api/workouts/stats`
  - **Description**: Get fitness statistics (total duration and calories burned) within a specified date range.
  - **Headers**:
    - `Authorization: Bearer <jwt_token>`
  - **Query Parameters**:
    - `start`: Start date in ISO format (e.g., `2024-01-01T00:00:00Z`)
    - `end`: End date in ISO format (optional, defaults to the current date)
  - **Response**:
    - **Success** (200):
      ```json
      {
        "totalDuration": "number",
        "totalCalories": "number"
      }
      ```
    - **Error** (401):
      ```json
      {
        "message": "Unauthorized"
      }
      ```
    - **Error** (400):
      ```json
      {
        "message": "Start date is required"
      }
      ```
    - **Error** (500):
      ```json
      {
        "message": "Internal Server Error"
      }
      ```

- **DELETE** `/api/workouts/:id`
  - **Description**: Delete a specific workout entry.
  - **Headers**:
    - `Authorization: Bearer <jwt_token>`
  - **Response**:
    - **Success** (200):
      ```json
      {
        "message": "Workout deleted successfully"
      }
      ```
    - **Error** (401):
      ```json
      {
        "message": "Unauthorized"
      }
      ```
    - **Error** (404):
      ```json
      {
        "message": "Workout not found"
      }
      ```
    - **Error** (500):
      ```json
      {
        "message": "Internal Server Error"
      }
      ```

### Admin Routes

- **GET** `/api/users`
  - **Description**: Retrieve a list of all registered users (admin access only).
  - **Headers**:
    - `Authorization: Bearer <jwt_token>`
  - **Response**:
    - **Success** (200):
      ```json
      [
        {
          "_id": "user_id",
          "username": "string",
          "role": "string",
          "createdAt": "date"
        }
      ]
      ```
    - **Error** (403):
      ```json
      {
        "message": "Forbidden"
      }
      ```
    - **Error** (500):
      ```json
      {
        "message": "Internal Server Error"
      }
      ```

- **DELETE** `/api/users/:id`
  - **Description**: Delete a specific user by ID (admin access only).
  - **Headers**:
    - `Authorization: Bearer <jwt_token>`
  - **Response**:
    - **Success** (200):
      ```json
      {
        "message": "User deleted successfully"
      }
      ```
    - **Error** (403):
      ```json
      {
        "message": "Forbidden"
      }
      ```
    - **Error** (404):
      ```json
      {
        "message": "User not found"
      }
      ```
    - **Error** (500):
      ```json
      {
        "message": "Internal Server Error"
      }
      ```

## Configuration
Ensure that you have a `.env` file in the root directory with the following environment variable:

  - `MONGO_URI`: The MongoDB connection URI.
  - `PORT`: Port for the server to listen on (default: 3000).
  - `JWT_SECRET`: Secret key for JWT signing.
