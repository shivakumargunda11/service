# Smart Campus Management System (CampusConnect)

A modern, full-stack (MERN) platform for efficiently managing campus service requests from students and faculty.

## 🚀 Features

- **Inclusive User Access**: Support for both Students, Faculty, and Administrators.
- **Service Request Form**: Interactive form with real-time validation for reporting issues (Hostel, Classroom, Transport, Facility).
- **Personalized Dashboards**:
    - **Student/Faculty**: Track personal request statuses and history.
    - **Admin Dashboard**: Overview of all campus issues with analytics and status management.
- **Secure Authentication**: JWT-based login and signup with password hashing (Bcrypt).
- **MongoDB Integration**: Real-time data storage for all users and requests.
- **Responsive Design**: Built with Bootstrap 5 and modern CSS (Glassmorphism).

## 🛠️ Technology Stack

- **Frontend**: HTML5, Vanilla JavaScript, CSS3, Bootstrap 5.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB.
- **Authentication**: JSON Web Tokens (JWT).

## 📦 Getting Started

### 1. Backend Setup
1. Navigate to the `backend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Simply open `index.html` in your browser (use Live Server for the best experience).
2. Ensure the backend is running on `http://localhost:5000`.

## 🤝 Contributing
Feel free to fork this project and submit pull requests!
"# smart-campus-service-management-system" 
