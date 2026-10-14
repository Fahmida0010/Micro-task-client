 
# 🌟 Micro Tasking & Earning Platform (MicroTask)

## 🔗 Live Website

👉 https://micro-task-client.onrender.com

---

## 📂 GitHub Repositories

* 🔗 Client Side:https://github.com/Fahmida0010/Micro-task-client.git
* 🔗 Server Side:  https://github.com/Fahmida0010/Micro-task-server.git

---
## 👑 Admin Credentials

* **Email:** [tahmid@gmail.com]
* *Password:** Tahmid26@#

---

## 📌 Overview

The **Micro Tasking & Earning Platform** is a modern web application where users can earn money by completing small tasks. The platform supports three different roles — **Worker, Buyer, and Admin** — each with powerful and unique functionalities.

Inspired by platforms like Picoworkers and Clickworker, this system ensures smooth task management, secure transactions, and efficient user interaction.

---

## 🚀 Key Features

* ✅ Role-Based Authentication System (Worker, Buyer, Admin)
* ✅ JWT Secure Authorization & Protected Routes
* ✅ Workers can complete tasks and earn coins
* ✅ Buyers can create tasks and manage My Task
* ✅ Admin can manage users, tasks, and withdrawals
* ✅ Real-time Notification System for all important actions
* ✅ Coin-based earning and withdrawal system
* ✅ Stripe Integration for purchasing coins
* ✅ Task filtering & sorting (deadline, amount, latest)
* ✅ Image Upload System using imgBB
* ✅ Pagination implemented for better performance
* ✅ Responsive and modern UI design
* ✅ Animated Homepage with slider (Swiper / Carousel)
* ✅ Dashboard with dynamic data based on user role
* ✅ Withdrawal system (20 coins = 1 dollar logic)
* ✅ Task approval/rejection system with instant updates

---

## 👨‍💻 User Roles & Functionalities

### 🧑‍🔧 Worker

* View available tasks
* Submit tasks for review
* Earn coins for approved tasks
* Withdraw earnings
* Get notifications for approvals/rejections

#### 🧑‍💼 Buyer

* Create and manage tasks
* Review worker submissions
* Approve or reject submissions
* Purchase coins via payment system
* Track payment history

### 🛠️ Admin

* Manage all users and roles
* Monitor platform statistics
* Approve withdrawal requests
* Delete tasks or users if needed
* Maintain system integrity

---

## 🖥️ Technologies Used

* **Frontend:** React.js, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** Firebase + JWT
* **Payment:** Stripe (or Dummy System)
* **Image Hosting:** imgBB

---

## 📊 Business Logic

* 💰 Buyer buys: **10 coins = $1**
* 💸 Worker withdraws: **20 coins = $1**
* 🧠 Platform earns profit from the difference

---

## 🔔 Notification System

* Worker gets notified when:

  * Task is approved ✅
  * Task is rejected ❌
* Buyer gets notified when:

  * Worker submits a task 📩
* Admin notifies:

  * Withdrawal approval 💸


###🎯 Future Improvements (Optional)

* 📧 Email notification system (SendGrid / AWS SES)
* 🔍 Advanced filtering & search system
* 🚨 Report system for invalid submissions
* 📱 Mobile app version

---

## 📦 Dependencies Used

### Production Dependencies

- **React & React DOM** – Building interactive user interfaces.
- **React Router & React Router DOM** – Client-side routing and navigation.
- **Tailwind CSS & @tailwindcss/vite** – Responsive styling and UI design.
- **TanStack React Query** – Server-state management and data fetching.
- **Axios** – Making HTTP requests to the backend API.
- **Firebase** – Authentication and user management.
- **Stripe** – Payment integration for purchasing coins.
- **Framer Motion** – Smooth animations and transitions.
- **Lucide React & React Icons** – Icons for the user interface.
- **React Hot Toast & React Toastify** – Toast notifications and feedback messages.
- **SweetAlert2** – Interactive alerts and confirmation dialogs.
- **Swiper** – Responsive sliders and carousels.

### Development Dependencies

- **Vite** – Fast development server and build tool.
- **@vitejs/plugin-react** – React support for Vite.
- **ESLint** – Code linting and quality checks.
- **@eslint/js** – JavaScript linting configurations.
- **eslint-plugin-react-hooks** – Linting rules for React Hooks.
- **eslint-plugin-react-refresh** – React Fast Refresh linting support.
- **@types/react & @types/react-dom** – TypeScript type definitions for React.
- **globals** – Global variable definitions for ESLint.

### 🛠️ Package Manager & Build Tools

- **npm** – Dependency and package management.
- **Vite** – Development, production builds, and preview server.

  ## ⚙️ Installation & Run Locally

Follow these steps to run the MicroTask project on your local machine.

### 1. Clone the Client Repository

```bash
git clone https://github.com/Fahmida0010/Micro-task-client.git
```

### 2. Navigate to the Project Directory

```bash
cd Micro-task-client
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root and add the required environment variables.

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_IMGBB_API_KEY=your_imgbb_api_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

Replace the placeholder values with your actual credentials. Use only the variables required by your project and check your Firebase configuration and API usage in the source code.

### 5. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

### 6. Build for Production (Optional)

```bash
npm run build
```

### 7. Preview the Production Build (Optional)

```bash
npm run preview
```

### 8. Run the Backend

The client also requires the backend server to be running for API-dependent features.

```bash
git clone https://github.com/Fahmida0010/Micro-task-server.git
cd Micro-task-server
npm install
```

Configure the backend environment variables according to its `.env.example` or project configuration, then run the appropriate development command defined in its `package.json`.

**Note:** Ensure that the backend API URL and CORS configuration allow requests from your local frontend URL.

## ❤️ Final Note

This project demonstrates a complete full-stack application with authentication, role-based access, payment integration, and real-world business logic.



✨ Thank you for visiting this project!💙
