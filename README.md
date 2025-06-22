# Item Manager

A simple full-stack application for viewing and managing a list of items.

## Tech Stack

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server for modern web projects.
- **React Router**: For declarative routing in the React application.
- **Axios**: For making HTTP requests to the backend API.
- **react-modal**: For creating the item detail modal.
- **react-responsive-carousel**: For the image carousel in the modal.

### Backend
- **Node.js**: A JavaScript runtime for the server.
- **Express**: A minimal and flexible Node.js web application framework.
- **lowdb**: A small local JSON database.
- **cors**: For enabling Cross-Origin Resource Sharing.
- **nodemailer**: For sending emails.

## Project Structure

- **/app**: Contains the React frontend application.
- **/server**: Contains the Node.js/Express backend server.

## How to Run

You need to run both the frontend and backend servers simultaneously.

### 1. Backend Server

```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Run the server
node server.js
```
The server will start on `http://localhost:3001`.

### 2. Frontend Application

```bash
# Navigate to the app directory from the root
cd app

# Install dependencies
npm install

# Run the development server
npm run dev
```
The React application will be available at the URL provided by Vite (usually `http://localhost:5173`).
