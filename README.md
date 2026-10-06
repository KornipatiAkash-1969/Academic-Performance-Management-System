# 🎓 Academic Performance Management System

A full-stack web application designed to help educational institutions manage **student academic performance, subjects, assessments, marks, grades, and academic coordination** through role-based dashboards.

The system provides separate portals for **Teachers, Students, and Coordinators**, allowing each role to access and manage the features relevant to them.

---

## 🚀 Project Overview

The **Academic Performance Management System (APMS)** is a centralized academic management platform that simplifies the process of managing student academic information.

The system provides three role-based portals:

- 👨‍🏫 **Teacher Portal** – Manage students, subjects, marks, and academic records
- 👨‍🎓 **Student Portal** – View subjects, marks, grades, and academic performance
- 👨‍💼 **Coordinator Portal** – Manage teacher accounts, notes, and academic coordination

The application is built using **React.js, Node.js, Express.js, and SQLite**.

---

# ✨ Features

## 👨‍🏫 Teacher Portal

Teachers can manage student academic information through a dedicated dashboard.

- 🔐 Teacher Login
- 👥 Add Students
- 📋 View Students List
- 📚 Add Subjects
- 📝 Add Marks
- 📊 Manage Academic Records
- 📈 Monitor Student Performance

---

## 👨‍🎓 Student Portal

Students can access their academic information through their personal dashboard.

- 🔐 Student Login
- 📚 View Subjects
- 📝 View Marks
- 🎯 View Grades
- 📊 View Academic Performance
- 📈 Track Assessment Results

---

## 👨‍💼 Coordinator Portal

Coordinators can manage academic activities and teacher-related information.

- 🔐 Coordinator Login
- 👨‍🏫 Create Teacher Accounts
- 📝 Send Notes
- 📊 Academic Coordination Dashboard
- 👥 Manage Teacher Information
- 🔄 Coordinate Academic Activities

---

# 🛠️ Tech Stack

## Frontend

- **React.js**
- **React Router DOM**
- **Axios**
- **JavaScript**
- **HTML5**
- **CSS3**

## Backend

- **Node.js**
- **Express.js**
- **REST APIs**

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

| Role | Responsibilities |
|------|------------------|
| 👨‍🏫 **Teacher** | Manage students, subjects, marks, and academic records |
| 👨‍🎓 **Student** | View subjects, marks, grades, and academic performance |
| 👨‍💼 **Coordinator** | Manage teachers, notes, and academic coordination |

---

# 📂 Project Structure

```text
Academic-Performance-Management-System/
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
git clone https://github.com/KornipatiAkash-1969/Academic-Performance-Management-System.git
```

Navigate to the project directory:

```bash
cd Academic-Performance-Management-System
```

---

# ▶️ Run the Backend

Open a terminal and navigate to the backend folder:

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

# ▶️ Run the Frontend

Open a **new terminal** and navigate to the frontend folder:

```bash
cd frontend
```

Install the required dependencies:

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

The project uses **SQLite** as the database.

Database file:

```text
backend/database/student_performance.db
```

### Main Database Tables

```text
users
subjects
assessments
marks
notes
```

---

# 🔐 Authentication & Roles

The system supports three different user roles:

```text
Teacher
Student
Coordinator
```

Each role has its own login and dashboard.

```text
                         Login
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
          Teacher       Student      Coordinator
             │             │             │
             ▼             ▼             ▼
          Teacher       Student      Coordinator
         Dashboard     Dashboard      Dashboard
```

---

# 📊 Application Modules

## 🔐 Authentication Module

- User login
- Role-based authentication
- Role-based dashboard access

## 👥 Student Management

- Add students
- View student records
- Manage academic information

## 📚 Subject Management

- Add subjects
- View subjects
- Manage subject information

## 📝 Assessment & Marks

- Add assessment marks
- View marks
- Manage academic records
- Grade management

## 📈 Academic Performance

- Track student performance
- View marks and grades
- Monitor academic progress

## 📝 Notes & Coordination

- Send academic notes
- Teacher coordination
- Academic communication

## 📊 Dashboard

Separate dashboards are available for:

- Teacher
- Student
- Coordinator

---

# 🎯 Project Objectives

The main objective of this project is to develop a centralized academic management platform that helps educational institutions manage:

- 👥 Student records
- 📚 Subject information
- 📝 Assessments
- 📊 Marks
- 🎯 Grades
- 📈 Academic performance
- 👨‍🏫 Teacher information
- 📝 Academic communication

---

# 🌟 Benefits

- Reduces manual academic record management
- Centralizes student academic information
- Provides role-based access
- Helps teachers manage student performance
- Allows students to track their academic progress
- Helps coordinators manage academic activities
- Improves academic communication and coordination

---

# 📸 Application Screens

The application includes the following major screens:

- 🔐 Login Page
- 👨‍🏫 Teacher Dashboard
- 👨‍🎓 Student Dashboard
- 👨‍💼 Coordinator Dashboard
- 👥 Student Management
- 📚 Subjects Page
- 📝 Marks Page
- 📊 Academic Performance Page
- 📝 Notes Page

---

# 🔮 Future Enhancements

Future versions of the application may include:

- 📊 Advanced performance analytics
- 📈 Interactive charts and graphs
- 📄 PDF academic report generation
- 📧 Email notifications
- 🔔 Real-time notifications
- 🔑 Password reset functionality
- 📱 Improved mobile responsiveness
- ☁️ Cloud database integration
- 🚀 Production deployment

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

## Kornipati Akash Babu

GitHub Profile:

[Kornipati Akash Babu – GitHub](https://github.com/KornipatiAkash-1969?utm_source=chatgpt.com)

---

# 📌 Repository

**Academic Performance Management System**

[Academic Performance Management System – GitHub Repository](https://github.com/KornipatiAkash-1969/Academic-Performance-Management-System?utm_source=chatgpt.com)

---

# ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
