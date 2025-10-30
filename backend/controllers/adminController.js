const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
    try {
        // Get total users count
        const [userCount] = await pool.query(
            'SELECT COUNT(*) as total FROM users'
        );

        // Get total stores count
        const [storeCount] = await pool.query(
            'SELECT COUNT(*) as total FROM stores'
        );

        // Get total ratings count
        const [ratingCount] = await pool.query(
            'SELECT COUNT(*) as total FROM ratings'
        );

        res.json({
            success: true,
            data: {
                totalUsers: userCount[0].total,
                totalStores: storeCount[0].total,
                totalRatings: ratingCount[0].total
            }
        });
    } catch (error) {
        console.error('Get dashboard stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Create new user (admin or normal user)
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, address, role } = req.body;

        // Validate role
        if (!['admin', 'user'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role. Must be admin or user'
            });
        }

        // Check if user already exists
        const [existingUsers] = await pool.query(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
            [name, email, hashedPassword, address, role]
        );

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                id: result.insertId,
                name,
                email,
                role
            }
        });
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Create new store (with store owner)
exports.createStore = async (req, res) => {
    try {
        const { ownerName, ownerEmail, ownerPassword, storeName, storeEmail, address } = req.body;

        // Check if email already exists
        const [existingUsers] = await pool.query(
            'SELECT id FROM users WHERE email = ?',
            [ownerEmail]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(ownerPassword, 10);

        // Start transaction
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            // Create store owner
            const [ownerResult] = await connection.query(
                'INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
                [ownerName, ownerEmail, hashedPassword, address, 'store_owner']
            );

            const ownerId = ownerResult.insertId;

            // Create store
            const [storeResult] = await connection.query(
                'INSERT INTO stores (owner_id, name, email, address) VALUES (?, ?, ?, ?)',
                [ownerId, storeName, storeEmail, address]
            );

            await connection.commit();
            connection.release();

            res.status(201).json({
                success: true,
                message: 'Store and owner created successfully',
                data: {
                    storeId: storeResult.insertId,
                    ownerId: ownerId
                }
            });
        } catch (error) {
            await connection.rollback();
            connection.release();
            throw error;
        }
    } catch (error) {
        console.error('Create store error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get all users with filters and sorting
exports.getUsers = async (req, res) => {
    try {
        const { name, email, address, role, sortBy = 'name', sortOrder = 'ASC' } = req.query;

        let query = 'SELECT id, name, email, address, role, created_at FROM users WHERE 1=1';
        const params = [];

        // Apply filters
        if (name) {
            query += ' AND name LIKE ?';
            params.push(`%${name}%`);
        }
        if (email) {
            query += ' AND email LIKE ?';
            params.push(`%${email}%`);
        }
        if (address) {
            query += ' AND address LIKE ?';
            params.push(`%${address}%`);
        }
        if (role) {
            query += ' AND role = ?';
            params.push(role);
        }

        // Apply sorting
        const allowedSortFields = ['name', 'email', 'role', 'created_at'];
        const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'name';
        const order = sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        query += ` ORDER BY ${sortField} ${order}`;

        const [users] = await pool.query(query, params);

        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get all stores with ratings, filters and sorting
exports.getStores = async (req, res) => {
    try {
        const { name, email, address, sortBy = 'name', sortOrder = 'ASC' } = req.query;

        let query = `
            SELECT
                s.id,
                s.name,
                s.email,
                s.address,
                s.owner_id,
                COALESCE(AVG(r.rating), 0) as rating,
                COUNT(r.id) as total_ratings
            FROM stores s
            LEFT JOIN ratings r ON s.id = r.store_id
            WHERE 1=1
        `;
        const params = [];

        // Apply filters
        if (name) {
            query += ' AND s.name LIKE ?';
            params.push(`%${name}%`);
        }
        if (email) {
            query += ' AND s.email LIKE ?';
            params.push(`%${email}%`);
        }
        if (address) {
            query += ' AND s.address LIKE ?';
            params.push(`%${address}%`);
        }

        query += ' GROUP BY s.id, s.name, s.email, s.address, s.owner_id';

        // Apply sorting
        const allowedSortFields = ['name', 'email', 'rating'];
        const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'name';
        const order = sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        query += ` ORDER BY ${sortField} ${order}`;

        const [stores] = await pool.query(query, params);

        res.json({
            success: true,
            data: stores
        });
    } catch (error) {
        console.error('Get stores error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get user details by ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const [users] = await pool.query(
            'SELECT id, name, email, address, role, created_at FROM users WHERE id = ?',
            [id]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const user = users[0];

        // If user is a store owner, get their store rating
        if (user.role === 'store_owner') {
            const [stores] = await pool.query(
                `SELECT
                    s.id,
                    s.name as store_name,
                    COALESCE(AVG(r.rating), 0) as rating
                FROM stores s
                LEFT JOIN ratings r ON s.id = r.store_id
                WHERE s.owner_id = ?
                GROUP BY s.id, s.name`,
                [id]
            );

            user.stores = stores;
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Get user by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
