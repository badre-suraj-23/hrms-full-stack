# HRMS Lite – Full Stack Application

## 📌 Project Overview

HRMS Lite is a lightweight Human Resource Management System built as a full-stack web application.  
It allows an admin to:

- Manage employee records
- Track daily attendance

This project demonstrates end-to-end full-stack development including frontend, backend, database integration, validation, and deployment.

---

## 🚀 Live Demo

- **Frontend URL:** https://hrms-full-stack.vercel.app/
- **Backend API URL:** https://hrms-full-stack-4405.onrender.com/
---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Axios
- React Router

### Backend
- Django
- Django REST Framework

### Database
- SQLite (Development)
- (Production DB  used on Render)

### Deployment
- Frontend: Vercel
- Backend: Render

---

## 📂 Project Structure
hrms-lite/
│
├── backend/ # Django Backend
├── frontend/hrms # React Frontend
└── README.md

---

## ⚙️ Features

### 1️⃣ Employee Management
- Add new employee
- View all employees
- Delete employee
- Unique Employee ID
- Unique Email validation

### 2️⃣ Attendance Management
- Mark attendance (Present / Absent)
- View attendance records
- Filter attendance by employee

---

## ✅ Validations Implemented

- Required fields validation
- Unique employee ID
- Unique email validation
- Proper HTTP status codes
- Meaningful error messages
- Loading, error, and empty UI states

---

## 💻 Run Locally

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
