# Fitness Tracker API
The Fitness Tracker API is a RESTful API designed to help users manage their workout sessions. It allows users to create, view, and delete workout records, as well as retrieve fitness statistics based on a date range. This API is built using Node.js, Express, and MongoDB.

## Features

- **Create a Workout**: Add a new workout session.
- **Get Workouts**: Retrieve a list of all workout sessions.
- **Get Workout Statistics**: Fetch total duration and calories burned for workouts within a specified date range.
- **Delete a Workout**: Remove a workout session by its ID.

## Dependencies

- `dotenv`: Loads environment variables.
- `express`: Web framework for Node.js.
- `mongoose`: MongoDB object modeling tool.

## API Endpoints

### Create a Workout
  - **Endpoint**: `POST /api/workouts`
  - **Body**:
      ```json
      {
        "exercise": "string",
        "duration": "number", 
        "caloriesBurned": "number" 
      }
  - **Response**:
      ```json
      {
        "_id": "string",
        "exercise": "string",
        "duration": "number",
        "caloriesBurned": "number",
        "date": "string"
      }


### Get All Workouts
  - **Endpoint**: `GET /api/workouts`
  - **Response**:
      ```json
      [
        {
          "_id": "string",
          "exercise": "string",
          "duration": "number",
          "caloriesBurned": "number",
          "date": "string"
        }
      ]


### Get Workout Statistics
  - **Endpoint**: `GET /api/workouts/stats`
  - **Query Parameters**:
      - `start`: Start date in ISO format (required)
      - `end`: End date in ISO format (optional; defaults to today)
  - **Response**:
      ```json
      {
        "totalDuration": "number",
        "totalCalories": "number"
      }


### Delete a Workout
  - **Endpoint**: `DELETE /api/workouts/:id`
  - **Response**:
      ```json
      {
        "message": "Workout deleted"
      }

## Configuration
Ensure that you have a `.env` file in the root directory with the following environment variable:

  - `MONGO_URI`: The MongoDB connection URI.
