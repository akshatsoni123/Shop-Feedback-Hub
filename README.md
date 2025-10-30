<div align="center">

# 🏪 Shop Feedback Hub

### A Modern Full-Stack Store Rating & Management Platform

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Overview

**Shop Feedback Hub** is a comprehensive full-stack web application designed to manage store ratings with role-based access control. Built with modern technologies, it provides a seamless experience for administrators, store owners, and customers to interact with store feedback data.

### Why Shop Feedback Hub?

- 🎨 **Modern UI/UX** - Beautiful, responsive design with smooth animations
- 🔐 **Secure Authentication** - JWT-based authentication with bcrypt password hashing
- 👥 **Role-Based Access** - Three distinct user roles with specific permissions
- 📊 **Real-Time Analytics** - Dashboard with live statistics and insights
- ⚡ **Fast & Scalable** - Optimized performance with efficient database queries
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile

---

## ✨ Features

### 🔑 For System Administrators

<details>
<summary>Click to expand</summary>

- **User Management**
  - Create admin and normal user accounts
  - View, filter, and sort all users
  - Search by name, email, address, and role
  - View detailed user profiles

- **Store Management**
  - Add new stores with owner accounts
  - View all stores with ratings
  - Filter and sort stores by various criteria
  - Monitor store performance

- **Analytics Dashboard**
  - Total users count
  - Total stores count
  - Total ratings submitted
  - Real-time statistics

</details>

### 👤 For Normal Users

<details>
<summary>Click to expand</summary>

- **Account Features**
  - Self-registration with validation
  - Secure login/logout
  - Password update functionality

- **Store Interaction**
  - Browse all registered stores
  - Search stores by name and address
  - View overall store ratings
  - Submit ratings (1-5 stars)
  - Update previously submitted ratings
  - View personal rating history

</details>

### 🏬 For Store Owners

<details>
<summary>Click to expand</summary>

- **Store Dashboard**
  - View average store rating
  - See rating distribution (1-5 stars)
  - Monitor total ratings count
  - Track performance metrics

- **Customer Insights**
  - View users who rated the store
  - See individual ratings and feedback
  - Sort and filter customer data
  - Export rating information

</details>

---

## 🛠 Tech Stack

### Backend
```
Express.js      - Web application framework
Node.js         - JavaScript runtime
MySQL           - Relational database
JWT             - Authentication tokens
bcrypt          - Password hashing
express-validator - Input validation
```

### Frontend
```
React 18        - UI library
React Router    - Client-side routing
Axios           - HTTP client
Context API     - State management
CSS3            - Styling with animations
```

### Database
```
MySQL 8.0       - Primary database
SQL             - Query language
```

---

## 📸 Screenshots

### Login Page
![Login Page](https://via.placeholder.com/800x400/667eea/ffffff?text=Modern+Login+Page)

### Admin Dashboard
![Admin Dashboard](https://via.placeholder.com/800x400/667eea/ffffff?text=Admin+Dashboard+with+Statistics)

### User Store Browser
![Store Browser](https://via.placeholder.com/800x400/667eea/ffffff?text=Browse+and+Rate+Stores)

### Store Owner Analytics
![Store Analytics](https://via.placeholder.com/800x400/667eea/ffffff?text=Store+Owner+Dashboard)

---

## 🚀 Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MySQL** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/mysql/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

### Quick Start

#### 1. Clone the Repository

```bash
git clone https://github.com/akshatsoni123/Shop-Feedback-Hub.git
cd Shop-Feedback-Hub
```

#### 2. Install Dependencies

**Backend:**
```bash
npm install
```

**Frontend:**
```bash
cd frontend
npm install
cd ..
```

#### 3. Database Setup

**Option A: Using MySQL Command Line**
```bash
mysql -u root -p
```
Then run:
```sql
source database/schema.sql
exit
```

**Option B: Using phpMyAdmin (XAMPP)**
1. Open phpMyAdmin
2. Go to Import tab
3. Select `database/schema.sql`
4. Click "Go"

#### 4. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=store_rating_db
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=24h

# Frontend URL
CLIENT_URL=http://localhost:3000
```

#### 5. Start the Application

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

The application will open at **http://localhost:3000**

---

## ⚙️ Configuration

### Default Admin Credentials

```
Email: admin@system.com
Password: Admin@123
```

⚠️ **IMPORTANT**: Change these credentials immediately after first login in production!

### Form Validation Rules

| Field | Rules |
|-------|-------|
| **Name** | Min: 20 chars, Max: 60 chars |
| **Email** | Valid email format |
| **Password** | 8-16 chars, 1 uppercase, 1 special character |
| **Address** | Max: 400 characters |

---

## 📖 Usage

### For Administrators

1. **Login** with admin credentials
2. Navigate to **Dashboard** to view statistics
3. Use **Add User** to create new accounts
4. Use **Add Store** to register new stores
5. Manage users and stores from respective sections

### For Normal Users

1. **Register** a new account
2. **Login** with your credentials
3. **Browse stores** from the dashboard
4. **Submit ratings** by clicking "Rate Store"
5. **Update ratings** anytime by clicking "Update Rating"

### For Store Owners

1. **Login** with provided credentials
2. View your **store dashboard**
3. Check **rating distribution**
4. See **customer feedback**
5. Monitor **performance metrics**

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe Smith Anderson",
  "email": "john@example.com",
  "password": "Password@123",
  "address": "123 Main Street, City"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password@123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

#### Get Profile
```http
GET /auth/profile
Authorization: Bearer {token}
```

#### Update Password
```http
PUT /auth/update-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "currentPassword": "OldPassword@123",
  "newPassword": "NewPassword@123"
}
```

### Admin Endpoints

All admin endpoints require `Authorization: Bearer {admin_token}`

#### Dashboard Statistics
```http
GET /admin/dashboard/stats
```

#### Create User
```http
POST /admin/users
Content-Type: application/json

{
  "name": "Jane Doe Smith Wilson",
  "email": "jane@example.com",
  "password": "Password@123",
  "address": "456 Oak Avenue",
  "role": "user"
}
```

#### Get All Users
```http
GET /admin/users?name=john&role=user&sortBy=name&sortOrder=ASC
```

#### Create Store
```http
POST /admin/stores
Content-Type: application/json

{
  "ownerName": "Store Owner Full Name Here",
  "ownerEmail": "owner@example.com",
  "ownerPassword": "Password@123",
  "storeName": "Amazing Electronics Store Name",
  "storeEmail": "store@example.com",
  "address": "789 Store Street, City"
}
```

### User Endpoints

All user endpoints require `Authorization: Bearer {user_token}`

#### Get Stores
```http
GET /user/stores?name=electronics&sortBy=average_rating&sortOrder=DESC
```

#### Submit Rating
```http
POST /user/ratings
Content-Type: application/json

{
  "store_id": 1,
  "rating": 5
}
```

#### Update Rating
```http
PUT /user/ratings
Content-Type: application/json

{
  "store_id": 1,
  "rating": 4
}
```

### Store Owner Endpoints

All store owner endpoints require `Authorization: Bearer {store_owner_token}`

#### Get Dashboard Stats
```http
GET /store-owner/dashboard/stats
```

#### Get Rating Users
```http
GET /store-owner/ratings/users?sortBy=rating&sortOrder=DESC
```

---

## 🗄️ Database Schema

### Tables

#### Users Table
```sql
users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(400),
  role ENUM('admin', 'user', 'store_owner'),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

#### Stores Table
```sql
stores (
  id INT PRIMARY KEY AUTO_INCREMENT,
  owner_id INT NOT NULL,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(255) NOT NULL,
  address VARCHAR(400),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id)
)
```

#### Ratings Table
```sql
ratings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  store_id INT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  UNIQUE (user_id, store_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (store_id) REFERENCES stores(id)
)
```

### Relationships

- One User (Store Owner) → Many Stores
- Many Users ↔ Many Stores (through Ratings)
- Each User can rate each Store only once

---

## 🔒 Security

### Implemented Security Measures

- ✅ **Password Hashing** - bcrypt with salt rounds (10)
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **SQL Injection Prevention** - Parameterized queries
- ✅ **Input Validation** - Frontend & Backend validation
- ✅ **Role-Based Access Control** - Protected routes by role
- ✅ **CORS Configuration** - Restricted origins
- ✅ **Environment Variables** - Sensitive data protection
- ✅ **Password Requirements** - Strong password policy

### Security Best Practices

1. **Change default admin password** immediately
2. **Use strong JWT_SECRET** in production
3. **Enable HTTPS** in production
4. **Regular security updates** for dependencies
5. **Database backups** regularly
6. **Monitor logs** for suspicious activity

---

## 📁 Project Structure

```
Shop-Feedback-Hub/
├── backend/
│   ├── config/
│   │   └── database.js           # Database connection
│   ├── controllers/
│   │   ├── adminController.js    # Admin logic
│   │   ├── authController.js     # Authentication logic
│   │   ├── storeOwnerController.js
│   │   └── userController.js     # User logic
│   ├── middleware/
│   │   ├── auth.js               # JWT authentication
│   │   └── validation.js         # Input validation
│   ├── routes/
│   │   ├── adminRoutes.js        # Admin routes
│   │   ├── authRoutes.js         # Auth routes
│   │   ├── storeOwnerRoutes.js   # Store owner routes
│   │   └── userRoutes.js         # User routes
│   ├── utils/
│   │   └── generateHash.js       # Password hash generator
│   └── server.js                 # Express server
├── database/
│   ├── schema.sql                # Database schema
│   └── seed_data.sql             # Sample data (optional)
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── admin/            # Admin components
│       │   ├── auth/             # Auth components
│       │   ├── storeOwner/       # Store owner components
│       │   ├── user/             # User components
│       │   └── ProtectedRoute.js
│       ├── context/
│       │   └── AuthContext.js    # Auth state management
│       ├── services/
│       │   └── api.js            # API service layer
│       ├── App.js                # Main app component
│       └── index.js              # Entry point
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
├── package.json                  # Backend dependencies
├── README.md                     # This file
├── SETUP_GUIDE.md                # Quick setup guide
└── PROJECT_SUMMARY.md            # Detailed project info
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration with validation
- [ ] Login with different roles
- [ ] Admin create user/store
- [ ] User submit/update ratings
- [ ] Store owner view ratings
- [ ] Search and filter functionality
- [ ] Sorting on all tables
- [ ] Form validation errors
- [ ] Authentication flow
- [ ] Unauthorized access attempts

### Run Tests (Future Implementation)

```bash
# Backend tests
npm test

# Frontend tests
cd frontend
npm test
```

---

## 🚀 Deployment

### Backend Deployment (Heroku Example)

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create shop-feedback-hub-api

# Add MySQL addon
heroku addons:create cleardb:ignite

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret_here

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel Example)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

---

## 🤝 Contributing

Contributions are always welcome! Here's how you can help:

### Ways to Contribute

1. 🐛 **Report Bugs**
2. 💡 **Suggest Features**
3. 📝 **Improve Documentation**
4. 🔧 **Submit Pull Requests**

### Development Process

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Code Style Guidelines

- Use ESLint for JavaScript
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features

---

## 🐛 Known Issues

- ESLint warnings for React hooks dependencies (non-breaking)
- Some deprecation warnings from react-scripts (harmless)

---

## 📝 Future Enhancements

- [ ] Email verification for registration
- [ ] Forgot password functionality
- [ ] Store image uploads
- [ ] Rating comments/reviews
- [ ] Advanced analytics and reports
- [ ] Export data to CSV/PDF
- [ ] Real-time notifications
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Social media integration

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Akshat Soni

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👨‍💻 Author

**Akshat Soni**

- GitHub: [@akshatsoni123](https://github.com/akshatsoni123)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Web framework
- [React](https://reactjs.org/) - Frontend library
- [MySQL](https://www.mysql.com/) - Database
- [JWT](https://jwt.io/) - Authentication
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Password hashing

---

## 📞 Support

Need help? Have questions?

- 📧 **Email**: your.email@example.com
- 💬 **Issues**: [GitHub Issues](https://github.com/akshatsoni123/Shop-Feedback-Hub/issues)
- 📖 **Documentation**: [Wiki](https://github.com/akshatsoni123/Shop-Feedback-Hub/wiki)

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

<div align="center">

### Made with ❤️ by Akshat Soni

**[⬆ Back to Top](#-shop-feedback-hub)**

</div>
