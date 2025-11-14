# Vibrant Todo App - Backend

This is the backend for the Vibrant Todo application, built with Node.js, Express, TypeScript, and Prisma.

## Features

-   RESTful API for managing todos.
-   CRUD operations: Create, Read, Update, Delete.
-   Data validation with Zod.
-   SQLite database managed by Prisma ORM.
-   Security middleware (Helmet, CORS, Rate Limiting).

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn

### Installation

1.  **Clone the repository** (if you haven't already from the root).

2.  **Navigate to the `Backend` directory:**
    ```bash
    cd Backend
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    Create a `.env` file in the `Backend` directory and add the following:
    ```
    # Server Configuration
    PORT=3000
    NODE_ENV=development
    CORS_ORIGIN=http://localhost:5173

    # Database
    DATABASE_URL="file:./data/dev.db"
    ```

5.  **Set up the database:**
    Run the Prisma migration to create the database and the `Todo` table.
    ```bash
    npm run prisma:migrate:dev
    ```
    This will create a `dev.db` file in the `data` directory.

### Available Scripts

-   **`npm run dev`**: Runs the server in development mode using `ts-node-dev`. The server will automatically restart on file changes.

-   **`npm run build`**: Compiles the TypeScript code to JavaScript in the `dist` folder.

-   **`npm run start`**: Starts the production server from the compiled code in the `dist` folder.

-   **`npm run prisma:migrate:dev`**: Creates and applies a new database migration.

-   **`npm run prisma:generate`**: Generates the Prisma Client based on your `schema.prisma` file.

## API Endpoints

All endpoints are prefixed with `/api`.

-   `GET /todos`: Get all todo items.
-   `POST /todos`: Create a new todo item.
    -   Body: `{ "title": "string" }`
-   `GET /todos/:id`: Get a single todo item by ID.
-   `PUT /todos/:id`: Update a todo item.
    -   Body: `{ "title": "string", "completed": boolean }` (both optional)
-   `DELETE /todos/:id`: Delete a todo item.
-   `POST /todos/clear-completed`: Deletes all todos that are marked as completed.

## Running with Docker

You can also run the entire application stack using Docker Compose from the root directory of the project.

1.  Make sure you have Docker and Docker Compose installed.
2.  From the project root, run:
    ```bash
    docker-compose up --build
    ```
3.  The backend API will be available at `http://localhost:3000`.