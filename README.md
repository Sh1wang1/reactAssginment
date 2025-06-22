# Item Manager

A simple full-stack application for viewing and managing a list of items.

Live Link:https://reactassginment-frontend.onrender.com/

Images:
1)Main page 
![1](https://github.com/user-attachments/assets/b07c5061-b652-4eb3-bbaf-faea6f104212)
2)View the Item
![2](https://github.com/user-attachments/assets/c120f274-95a3-4f4b-8c1b-11a04e9f39fc)
3)Enquire the Item
![3](https://github.com/user-attachments/assets/55398c10-4d05-490a-97de-43b57816c89f)
4)Mail Sent 
![4](https://github.com/user-attachments/assets/ecbd092f-df04-4ebd-975a-e98fb73c24a0)
5)Add the item
![5](https://github.com/user-attachments/assets/a3113053-58f3-4508-954c-83ce786da9e1)
6)Added item is Showing on View item
![6](https://github.com/user-attachments/assets/6dc37f67-99ca-4ec7-80a8-7873a9432564)



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
