# 🍳 HomeCook - On-demand Home Cook Food Delivery Platform

HomeCook is a full-stack MERN (MongoDB, Express, React, Node.js) web application that creates a hyperlocal marketplace connecting home chefs with users looking for fresh, homemade meals. It features daily menu uploads by chefs, a seamless ordering and payment system for users, and an admin dashboard for platform monitoring.

---

## 🌐 Live Demo

**Frontend:** [https://homecookfood.netlify.app/](https://homecookfood.netlify.app/)  
**Backend:** Hosted on Render

---

## 📂 Folder Structure

```
HomeCook/
├── backend/          # Node.js + Express API
├── frontend/         # ReactJS client app
└── README.md
```

---

## 🚀 Tech Stack

### 🔧 Backend:

- **Node.js**
- **Express.js**
- **MongoDB** + Mongoose
- **JSON Web Token (JWT)** for Authentication
- **Razorpay Integration** for Payments
- **Multer** for Image Uploads

### 🎨 Frontend:

- **React.js**
- **React Router DOM**
- **React Context API** for Auth & Cart management
- **Axios** for API requests
- **React Hot Toast** for notifications
- **Custom CSS** for responsive design

---

## 🧑‍🍳 User Roles

### 🛒 User:

- Browse daily menus from various home chefs.
- Add desired meals to the shopping cart.
- Place orders and complete payments securely via Razorpay.
- View personal order history and track order status.

### 👨‍🍳 Home Chef:

- Register for a chef account.
- Upload and manage daily meal listings, including images and descriptions.
- View their own listed menu items.

### 🛠️ Admin:

- Access a dashboard to view all orders placed on the platform.
- Monitor and update the status of any order (e.g., Confirmed, Preparing, Delivered).

---

## 🔑 Authentication & Authorization

- **JWT-based authentication** with tokens stored in secure `httpOnly` cookies.
- **Role-based access control** implemented with custom middleware to protect routes for Users, Chefs, and Admins.
- Backend routes are protected, ensuring only authenticated and authorized users can perform sensitive actions.

---

## 💳 Razorpay Payment Integration

- A seamless checkout process using the Razorpay web checkout modal.
- Payment signatures are verified on the backend to ensure transaction integrity.
- Orders are only created in the database after successful payment verification, preventing fraudulent or incomplete orders.

---

## 📥 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Amish-Soni/Infotact-Project-2
cd HomeCook
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a .env file in the /backend directory:

```bash
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_key_secret
FRONTEND_URL=http://localhost:5173
```

Start the server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create a .env file in the /frontend directory:

```bash
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_BACKEND_URL=http://localhost:8080
```

Start the frontend development server:

```bash
npm run dev
```

---

### 🛡️ Security & Best Practices
- User passwords are hashed using bcrypt before being stored.
- Sensitive environment variables are kept out of version control in .env files.
- httpOnly cookies are used for storing JWTs to prevent XSS attacks.
- The backend validates all incoming data and user roles before processing requests.
- Razorpay payment integrity is ensured through signature verification on the server side.

---

### Under the project: HomeCook - On-demand Home Cook Food Delivery Platform Stack: MERN
