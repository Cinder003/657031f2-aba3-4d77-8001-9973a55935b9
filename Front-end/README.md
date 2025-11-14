# Vibrant Todo App - Frontend

This is the frontend for the Vibrant Todo application, built with React, Vite, TypeScript, and TailwindCSS.

## Features

- Add, edit, and delete todos
- Mark todos as complete
- Filter todos by status
- Clear all completed todos
- Rich, colorful, and responsive UI

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  **Clone the repository** (if you haven't already from the root).

2.  **Navigate to the `Front-end` directory:**
    ```bash
    cd Front-end
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    Create a `.env` file in the `Front-end` directory and add the following, adjusting the URL if your backend runs on a different port:
    ```
    VITE_API_BASE_URL=http://localhost:3000/api
    ```

### Available Scripts

-   **`npm run dev`**: Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser. The page will reload if you make edits.

-   **`npm run build`**: Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

-   **`npm run lint`**: Lints the project files for any code quality issues.

-   **`npm run preview`**: Serves the production build locally to preview it.

## Running with Docker

You can also run the entire application stack using Docker Compose from the root directory of the project.

1.  Make sure you have Docker and Docker Compose installed.
2.  From the project root, run:
    ```bash
    docker-compose up --build
    ```
3.  The frontend will be available at `http://localhost`.