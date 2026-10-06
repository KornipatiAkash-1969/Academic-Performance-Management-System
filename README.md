# 🎓 Academic Performance Management System

A full-stack web application designed to help educational institutions manage **student academic performance, subjects, assessments, marks, grades, and academic coordination** through role-based dashboards.

The system provides separate portals for **Teachers, Students, and Coordinators**, allowing each role to access and manage the features relevant to them.

---

## 🚀 Project Overview

The **Academic Performance Management System (APMS)** is a centralized platform for managing academic information efficiently.

It provides three role-based portals:

- 👨‍🏫 **Teacher** – Manage students, subjects, marks, and academic records
- 👨‍🎓 **Student** – View subjects, marks, grades, and academic performance
- 👨‍💼 **Coordinator** – Manage teachers and coordinate academic activities

The application follows a **React.js + Node.js + Express.js + SQLite** architecture.

---

## ✨ Key Features

### 👨‍🏫 Teacher Portal

Teachers can manage student academic information through a dedicated dashboard.

- 🔐 Teacher Login
- 👥 Add and manage students
- 📋 View student list
- 📚 Add and manage subjects
- 📝 Add marks and assessment records
- 📊 Manage academic performance records
- 📈 Monitor student performance

---

### 👨‍🎓 Student Portal

Students can access their academic information from their dashboard.

- 🔐 Student Login
- 📚 View enrolled subjects
- 📝 View marks
- 🎯 View grades
- 📊 View academic performance
- 📈 Track assessment results

---

### 👨‍💼 Coordinator Portal

The coordinator manages academic coordination and teacher-related activities.

- 🔐 Coordinator Login
- 👨‍🏫 Create teacher accounts
- 📝 Send academic notes
- 📊 Coordinator dashboard
- 🔄 Coordinate academic activities
- 👥 Manage teacher-related information

---

# 🛠️ Tech Stack

## Frontend

- **React.js**
- **React Router DOM**
- **Axios**
- **HTML5**
- **CSS3**
- **JavaScript**

## Backend

- **Node.js**
- **Express.js**
- **REST APIs**
- **Multer** *(if used for file handling)*

## Database

- **SQLite**

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │      Frontend        │
                    │      React.js        │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │       Backend        │
                    │ Node.js + Express.js │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Database       │
                    │        SQLite        │
                    └──────────────────────┘
```

---

# 👥 Role-Based Access

| Role | Main Responsibilities |
|------|------------------------|
| 👨‍🏫 Teacher | Students, subjects, marks, academic records |
| 👨‍🎓 Student | Subjects, marks, grades, performance |
| 👨‍💼 Coordinator | Teacher accounts, notes, academic coordination |

---

# 📂 Project Structure

```text
Academic-Performance/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── database/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── routes/
│   │   └── App.js
│
├── README.md
└── package.json
```

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/KornipatiAkash-1969/Academic-Performance.git
```

Navigate into the project:

```bash
cd Academic-Performance
```

---

# ▶️ Running the Backend

Open a terminal and navigate to the backend:

```bash
cd backend
```

Install the required dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm run dev
```

The backend server will run at:

```text
http://localhost:5000
```

---

# ▶️ Running the Frontend

Open a **new terminal** and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm start
```

The frontend application will run at:

```text
http://localhost:3000
```

---

# 🗄️ Database

The application uses **SQLite** for storing academic and user information.

Database location:

```text
backend/database/student_performance.db
```

### Main Tables

```text
users
subjects
assessments
marks
notes
```

---

# 🔐 Authentication & Roles

The application provides role-based login for:

```text
Teacher
Student
Coordinator
```

After authentication, users are redirected to the dashboard associated with their role.

```text
                    Login
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
       Teacher     Student    Coordinator
          │           │           │
          ▼           ▼           ▼
      Teacher      Student    Coordinator
      Dashboard    Dashboard    Dashboard
```

---

# 📊 Application Modules

### 🔐 Authentication Module
- User login
- Role-based access
- Dashboard redirection

### 👥 Student Management
- Add students
- View student records
- Manage academic information

### 📚 Subject Management
- Add subjects
- View subject information
- Manage subjects

### 📝 Assessment & Marks
- Add assessment marks
- View marks
- Manage academic records
- Grade evaluation

### 📈 Academic Performance
- Student performance tracking
- Marks and grade visualization
- Academic record management

### 📝 Notes & Coordination
- Coordinator notes
- Academic communication
- Teacher coordination

### 📊 Dashboards
- Teacher Dashboard
- Student Dashboard
- Coordinator Dashboard

---

# 🎯 Project Objectives

The main objective of this project is to develop a centralized platform that simplifies academic management by providing:

- 👥 Centralized student records
- 📚 Subject management
- 📝 Assessment and marks management
- 🎯 Grade tracking
- 📊 Academic performance monitoring
- 👨‍🏫 Teacher management
- 📝 Academic communication
- 🔐 Role-based access control

---

# 🌟 Benefits

- Reduces manual academic record management
- Provides centralized access to academic information
- Improves communication between academic roles
- Allows students to easily track their performance
- Helps teachers manage student records efficiently
- Provides coordinators with better academic oversight

---

# 📸 Application Screens

The application includes the following major screens:

- 🔐 Login Page
- 👨‍🏫 Teacher Dashboard
- 👨‍🎓 Student Dashboard
- 👨‍💼 Coordinator Dashboard
- 👥 Student Management
- 📚 Subjects Page
- 📝 Marks & Assessments Page
- 📊 Academic Performance Page
- 📝 Notes Page

---

# 🔮 Future Enhancements

Potential future improvements include:

- 📊 Advanced performance analytics
- 📈 Interactive charts and reports
- 📄 PDF report generation
- 📧 Email notifications
- 🔔 Real-time notifications
- 🔑 Password reset functionality
- 📱 Improved mobile responsiveness
- ☁️ Cloud database integration
- 🚀 Deployment to a production environment

---

# 💻 Local Development

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

# 👨‍💻 Developer

### Kornipati Akash Babu

GitHub:

[Kornipati Akash Babu – GitHub](https://github.com/KornipatiAkash-1969?utm_source=chatgpt.com)

---

# 📌 Repository

**Academic Performance Management System**

[Academic Performance Management System – GitHub Repository](https://github.com/KornipatiAkash-1969/Academic-Performance?utm_source=chatgpt.com)

---

## ⭐ If you find this project useful

Consider giving the repository a ⭐ on GitHub.
