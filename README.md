# Item Manager

A simple full-stack application for viewing and managing a list of items.

Live Link:https://reactassginment-frontend.onrender.com/

Images:

1)Add the Item
![1](https://github.com/user-attachments/assets/b402a3aa-eaeb-4a54-9e8d-84afc6738b6e)
![add](https://github.com/user-attachments/assets/8e53cb48-15cf-4d65-8e0c-3cdcb078ae81)

2)View the Item
![2](https://github.com/user-attachments/assets/2dc9da32-df1e-41b5-a694-6b99a2feeb7f)

3)Enquire Item
![3](https://github.com/user-attachments/assets/81dc01d9-8437-4b36-95b5-f1f652baa99e)
![4](https://github.com/user-attachments/assets/17cedd6f-1481-4bb4-9400-dbca4d46d6cf)

4)More Added item is Showing on View item
![image](https://github.com/user-attachments/assets/16d70fe3-32c9-44ec-96bc-c273dfd2c53a)
 
5)Data is stored on MongoDB:
![image](https://github.com/user-attachments/assets/22d067a0-e821-47ef-9a3c-a57fd64850ba)



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
