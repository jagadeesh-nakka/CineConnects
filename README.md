# CineConnects

# 🎬 CineConnects - Movie Review & Discussion Platform

## 📌 Project Overview

CineConnects is a web application where users can discover movies, write reviews, and engage in discussions. It provides a platform for movie lovers to connect and share their opinions on various films.

## 🚀 Features

✅ User Authentication (Signup/Login)  
✅ Browse Popular & Trending Movies  
✅ Search for Movies by Title or Genre  
✅ Write & Edit Reviews  
✅ Like & Comment on Reviews  
✅ Personalized Watchlist  
✅ Dark/Light Mode  

## 🛠️ Technology Stack

### **Frontend:**
- React.js (with Hooks & Context API)
- Tailwind CSS (for styling)
- Axios (for API calls)
- React Router (for navigation)

### **Backend:**
- Node.js & Express.js
- MongoDB (Mongoose ORM)
- JSON Web Token (JWT) for authentication
- Multer (for handling file uploads)

---

## 🏗 Installation & Setup

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/yourusername/cineconnects.git
cd cineconnects
2️⃣ Backend Setup

cd backend
npm install
npm install
Create a .env file in the backend/ folder and add:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Start the backend server:

sh
Copy
Edit
npm start
3️⃣ Frontend Setup
sh
Copy
Edit
cd ../frontend
npm install
npm start
🔗 API Endpoints
Auth Routes
POST /api/auth/register → Register a new user
POST /api/auth/login → Login user & return JWT token
Movie Routes
GET /api/movies → Get list of movies
GET /api/movies/:id → Get details of a specific movie
POST /api/movies/:id/review → Submit a review (Auth required)
User Routes
GET /api/user/profile → Get user profile
PUT /api/user/watchlist → Add/remove movies from watchlist
🚀 Deployment
Deploy Backend (Node.js & Express) on Render/Vercel
sh
Copy
Edit
git push origin main
Deploy Frontend (React) on Vercel
sh
Copy
Edit
npm run build
vercel deploy
📀 Contributors
Jagadeesh Nakka - GitHub Profile
🐝 License
This project is licensed under the MIT License.

🎯 Contact
For queries, reach out at jagadeeshnakka9640@gmail.com.

yaml
Copy
Edit

---

This is a beginner-friendly README. Just copy and paste it into `README.md` in your project. Let me know if you need any changes! 🚀🎬






