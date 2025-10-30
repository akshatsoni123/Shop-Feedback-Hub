# Quick Setup Guide

## Prerequisites Installation

### 1. Install Node.js
- Download from: https://nodejs.org/
- Choose LTS version (recommended)
- Verify installation: `node --version` and `npm --version`

### 2. Install MySQL
- Download from: https://dev.mysql.com/downloads/mysql/
- During installation, set a root password (remember this!)
- Verify installation: `mysql --version`

## Step-by-Step Setup

### Step 1: Setup Database

1. Open Command Prompt or Terminal
2. Login to MySQL:
```bash
mysql -u root -p
```
3. Enter your MySQL root password
4. Create database and tables:
```bash
source database/schema.sql
```
Or if you're in a different directory:
```bash
source "C:\Users\aksha\OneDrive\Desktop\roxilier system project\database\schema.sql"
```
5. Verify tables were created:
```sql
USE store_rating_db;
SHOW TABLES;
```
6. Exit MySQL:
```sql
exit;
```

### Step 2: Setup Backend

1. Open Command Prompt in project directory
2. Install backend dependencies:
```bash
npm install
```
3. Create `.env` file by copying `.env.example`:
```bash
copy .env.example .env
```
4. Edit `.env` file with your settings:
   - Change `DB_PASSWORD` to your MySQL password
   - Keep other settings as default

### Step 3: Setup Frontend

1. Navigate to frontend folder:
```bash
cd frontend
```
2. Install frontend dependencies:
```bash
npm install
```
3. Go back to project root:
```bash
cd ..
```

### Step 4: Run the Application

#### Option 1: Run Backend and Frontend Separately

**Terminal 1 (Backend):**
```bash
npm run dev
```
Wait for message: "✅ Server started successfully!"

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

#### Option 2: Run Both Together
```bash
npm run dev-all
```

### Step 5: Access the Application

1. Open browser and go to: http://localhost:3000
2. Login with default admin credentials:
   - Email: admin@system.com
   - Password: Admin@123

## Common Issues and Solutions

### Issue: "Cannot connect to database"
**Solution:**
- Check if MySQL is running
- Verify database credentials in `.env` file
- Make sure database was created successfully

### Issue: "Port 5000 already in use"
**Solution:**
- Change PORT in `.env` file to another port (e.g., 5001)
- Update frontend proxy in `frontend/package.json` if needed

### Issue: "Module not found"
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install

# Do the same for frontend
cd frontend
rm -rf node_modules
npm install
```

### Issue: Frontend shows blank page
**Solution:**
- Check browser console for errors
- Make sure backend is running
- Clear browser cache and reload

## Testing the Application

### Test Admin Features
1. Login as admin (admin@system.com / Admin@123)
2. Create a new user from Admin Panel
3. Create a new store with store owner
4. View dashboard statistics

### Test User Features
1. Register a new user account (or login with created user)
2. Browse stores
3. Submit a rating for a store
4. Update your rating

### Test Store Owner Features
1. Login with store owner credentials (created by admin)
2. View dashboard with ratings
3. See users who rated your store

## Next Steps

1. Change the default admin password
2. Create test stores and users
3. Customize the application as needed

## Need Help?

- Check the main README.md for detailed documentation
- Review API endpoints in README.md
- Check form validation rules in README.md

## Security Notes

- Always change the default admin password in production
- Update JWT_SECRET in `.env` to a strong random string
- Don't commit `.env` file to version control
- Use HTTPS in production
