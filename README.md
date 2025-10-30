# Store Rating System

A full-stack web application for managing store ratings with role-based access control.

## Tech Stack

- **Backend**: Express.js (Node.js)
- **Frontend**: React.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)

## Features

### System Administrator
- Add new stores, normal users, and admin users
- Dashboard with statistics (total users, stores, ratings)
- View and filter lists of users and stores
- Search functionality with sorting capabilities
- View detailed user information including store ratings for store owners

### Normal User
- Sign up and log in to the platform
- Browse and search stores by name and address
- View store ratings and overall average
- Submit ratings (1-5 stars) for stores
- Update previously submitted ratings
- Change password

### Store Owner
- Log in to the platform
- View store dashboard with average rating
- See rating distribution
- View list of users who rated their store
- Change password

## Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/) (v8.0 or higher)
- npm (comes with Node.js)

## Installation & Setup

### 1. Clone or Download the Project

```bash
cd "roxilier system project"
```

### 2. Database Setup

1. Open MySQL and create the database:

```bash
mysql -u root -p
```

2. Run the schema file to create the database and tables:

```sql
source database/schema.sql
```

Or manually execute the SQL commands from `database/schema.sql`

The default admin credentials will be created:
- **Email**: admin@system.com
- **Password**: Admin@123 (You should change this after first login)

### 3. Backend Setup

1. Navigate to the project root and install backend dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory by copying `.env.example`:

```bash
copy .env.example .env
```

3. Update the `.env` file with your configuration:

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
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=24h

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

### 4. Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install frontend dependencies:

```bash
npm install
```

3. (Optional) Create a `.env` file in the frontend directory if you need to customize the API URL:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 5. Running the Application

#### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Backend:**
```bash
# From project root
npm run dev
```

**Terminal 2 - Frontend:**
```bash
# From project root
cd frontend
npm start
```

#### Option 2: Run Both Concurrently (After installing concurrently)

```bash
# From project root
npm run dev-all
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## Default Login Credentials

### Admin Account
- **Email**: admin@system.com
- **Password**: Admin@123

### Creating Test Accounts

You can create test accounts in two ways:

1. **As Admin**: Log in as admin and use the "Add User" or "Add Store" functionality
2. **User Registration**: Use the registration page for normal users

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get user profile (authenticated)
- `PUT /api/auth/update-password` - Update password (authenticated)

### Admin Routes (Requires Admin Role)
- `GET /api/admin/dashboard/stats` - Get dashboard statistics
- `POST /api/admin/users` - Create new user
- `GET /api/admin/users` - Get all users (with filters)
- `GET /api/admin/users/:id` - Get user by ID
- `POST /api/admin/stores` - Create new store
- `GET /api/admin/stores` - Get all stores (with filters)

### User Routes (Requires User Role)
- `GET /api/user/stores` - Get all stores with ratings
- `POST /api/user/ratings` - Submit rating
- `PUT /api/user/ratings` - Update rating
- `GET /api/user/ratings` - Get user's ratings

### Store Owner Routes (Requires Store Owner Role)
- `GET /api/store-owner/store` - Get store information
- `GET /api/store-owner/dashboard/stats` - Get dashboard statistics
- `GET /api/store-owner/ratings/users` - Get users who rated the store

## Form Validation Rules

### Name
- Minimum: 20 characters
- Maximum: 60 characters

### Email
- Must be a valid email format

### Password
- Length: 8-16 characters
- Must include at least one uppercase letter
- Must include at least one special character (!@#$%^&*(),.?":{}|<>)

### Address
- Maximum: 400 characters

## Project Structure

```
roxilier-system-project/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── storeOwnerController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── storeOwnerRoutes.js
│   │   └── userRoutes.js
│   └── server.js
├── database/
│   └── schema.sql
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── admin/
│       │   ├── auth/
│       │   ├── storeOwner/
│       │   ├── user/
│       │   └── ProtectedRoute.js
│       ├── context/
│       │   └── AuthContext.js
│       ├── services/
│       │   └── api.js
│       ├── App.js
│       ├── App.css
│       └── index.js
├── .env.example
├── package.json
└── README.md
```

## Features Implemented

✅ Role-based authentication (Admin, User, Store Owner)
✅ User registration and login
✅ Password management (update password)
✅ Admin dashboard with statistics
✅ User and store management for admins
✅ Store browsing and search for users
✅ Rating system (1-5 stars)
✅ Update existing ratings
✅ Store owner dashboard with rating analytics
✅ Sorting and filtering on all tables
✅ Form validations (frontend + backend)
✅ Responsive design
✅ Protected routes
✅ JWT authentication
✅ Database relationships and constraints

## Security Features

- Passwords hashed using bcrypt
- JWT tokens for authentication
- Protected API routes
- Input validation on both frontend and backend
- SQL injection prevention using parameterized queries
- CORS configuration
- Role-based access control

## Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Check your database credentials in `.env`
- Verify the database exists: `SHOW DATABASES;`

### Port Already in Use
- Change the PORT in `.env` file
- Or kill the process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### Module Not Found Errors
- Delete `node_modules` and reinstall:
  ```bash
  rm -rf node_modules
  npm install
  ```

### CORS Errors
- Check that `CLIENT_URL` in backend `.env` matches your frontend URL
- Ensure backend is running before frontend

## Future Enhancements

- Email verification
- Forgot password functionality
- File upload for store images
- Advanced analytics and reports
- Rating comments/reviews
- Store categories
- User profile management
- Admin ability to edit/delete stores and users

## License

This project is created for educational purposes.

## Support

For issues or questions, please create an issue in the project repository.
