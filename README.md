# School Management System with Role-Based Access Control

## Project Description

This project is a **School Management System** that facilitates the management of student details, library history, and fees records. It implements **Role-Based Access Control (RBAC)**, ensuring that users have permissions based on their roles. The system supports CRUD operations for students and role-specific functionalities for Admin, Office Staff, and Librarian.

### Key Features:
- **CRUD Operations**: Create, Read, Update, and Delete operations for managing student data.
- **Role-Based Access**: Different user roles (Admin, Office Staff, Librarian) with specific permissions.
- **Authentication and Authorization**: Secure login and user role management.
- **Library Management**: Manage and view student borrowing history.
- **Fees Management**: Manage student fee records and payment details.
- **State Management**: Implemented with Redux.
- **Confirmation Dialogs**: Reconfirmation for critical actions like delete or update.

## Table of Contents
1. [Project Description](#project-description)
2. [Features](#key-features)
3. [Technologies Used](#technologies-used)
4. [Setup Instructions](#setup-instructions)
5. [Usage](#usage)


## Technologies Used

- **MongoDB**: NoSQL Database for storing student, library, and fee records.
- **Express.js**: Backend framework for building REST APIs.
- **React.js**: Frontend library for creating interactive user interfaces.
- **Node.js**: JavaScript runtime for the server-side.
- **Redux**: State management for handling global application state.
- **JWT**: JSON Web Token for secure authentication.
- **bcrypt**: For password hashing.
- **React Router**: For routing and navigation in the frontend.

## Setup Instructions

### Prerequisites:
- **Node.js**: Ensure Node.js and npm are installed.
- **MongoDB**: Set up MongoDB either locally or using a cloud provider like MongoDB Atlas.

### Installation:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/AparnaVjn/School-Management-System-MERN.git
    cd School-Management-System-MERN
    ```

2. **Install dependencies**:
    ```bash
    cd Frontend
    npm install

    cd Backend
    npm install
    ```

3. **Set up environment variables**:
   - Create a `.env` file in the project Backend folder and add the following:
     ```bash
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Run the backend**:
    ```bash
    npm start
    ```

5. **Run the frontend**:
    ```bash
    npm run dev
    ```

6. **Access the application**:
   - Open your browser and navigate to `http://localhost:5173`.

## Usage

1. **Admin Login**: Manage staff and librarian accounts, as well as student data.
2. **Office Staff Login**: Manage student fees history and view library records.
3. **Librarian Login**: View and manage student library history.

### Role-Based Access:

- **Admin**: Full access to student details, library records, and fee records. Ability to manage Office Staff and Librarian accounts.
- **Office Staff**: Can view and manage student fees and library records.
- **Librarian**: Has view-only access to student details and can manage library history.

## Video Presentation

Please refer to the following link for a demonstration of the project:  
[Video Presentation](https://drive.google.com/file/d/1sTClxoBFX2jCdKegzouZXcS0L29v4nGv/view?usp=drive_link)

