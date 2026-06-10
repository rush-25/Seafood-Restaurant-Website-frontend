# Ocean's Pearl Restaurant

Welcome to the **Ocean's Pearl Restaurant** project! This is a full-stack web application designed for a luxury seafood restaurant. It provides a beautiful, responsive customer-facing website and an administrative dashboard to manage operations.

## 🏗️ Project Architecture

The project is split into two distinct parts:
- **Frontend**: A modern React web application built with Vite.
- **Backend**: A robust Express.js REST API using Node.js and MongoDB.

---

## ✨ Features

### Frontend (Customer & Admin UI)
- **Responsive Design**: Built using Tailwind CSS for a mobile-first, seamless experience across devices.
- **Interactive UI components**: Utilizing Radix UI for accessible, high-quality components and Embla Carousel.
- **Smooth Animations**: Powered by Framer Motion to give a premium feel.
- **Routing**: Managed by React Router for seamless navigation between Home, Menu, Reservations, Contact, and Admin pages.
- **Forms & Validation**: Built with React Hook Form and Zod (via backend schema validation) for secure user inputs.

### Backend (REST API)
- **Express.js Server**: Handling all API requests securely.
- **Database**: MongoDB integration via Mongoose for storing reservations, user accounts, and messages.
- **Authentication**: JWT (JSON Web Tokens) and bcryptjs for secure user authentication and authorization (e.g., for the Admin panel).
- **Validation**: Strict input validation using Zod.
- **Email Notifications**: Integration with Nodemailer for sending booking confirmations or contact form auto-replies.
- **Core Endpoints**:
  - `/api/auth`: Login and registration
  - `/api/reservations`: Booking creation and retrieval
  - `/api/contact`: Handling contact form inquiries
  - `/api/admin`: Administrative data management

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local installation or MongoDB Atlas cluster)

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd path/to/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend root directory and add the following:
   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server should now be running on `http://localhost:8000`.*

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd path/to/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the frontend root directory. You might need to specify your backend API URL here:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The application should now be accessible in your browser, typically at `http://localhost:5173`.*

---

## 🛠️ Technology Stack

| Frontend                | Backend                |
| ----------------------- | ---------------------- |
| React 18                | Node.js                |
| Vite                    | Express.js             |
| Tailwind CSS 4          | MongoDB & Mongoose     |
| Radix UI                | JWT & bcryptjs         |
| Framer Motion           | Zod                    |
| React Router            | Nodemailer             |

---

## 📄 License

This project is licensed under the MIT License.
