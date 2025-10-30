const { pool } = require('../config/database');

// Get all stores with ratings and user's submitted rating
exports.getStores = async (req, res) => {
    try {
        const { name, address, sortBy = 'name', sortOrder = 'ASC' } = req.query;
        const userId = req.user.id;

        let query = `
            SELECT
                s.id,
                s.name,
                s.email,
                s.address,
                COALESCE(AVG(r.rating), 0) as average_rating,
                COUNT(DISTINCT r.id) as total_ratings,
                ur.rating as user_rating,
                ur.id as user_rating_id
            FROM stores s
            LEFT JOIN ratings r ON s.id = r.store_id
            LEFT JOIN ratings ur ON s.id = ur.store_id AND ur.user_id = ?
            WHERE 1=1
        `;
        const params = [userId];

        // Apply filters
        if (name) {
            query += ' AND s.name LIKE ?';
            params.push(`%${name}%`);
        }
        if (address) {
            query += ' AND s.address LIKE ?';
            params.push(`%${address}%`);
        }

        query += ' GROUP BY s.id, s.name, s.email, s.address, ur.rating, ur.id';

        // Apply sorting
        const allowedSortFields = ['name', 'address', 'average_rating'];
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

// Submit rating for a store
exports.submitRating = async (req, res) => {
    try {
        const { store_id, rating } = req.body;
        const userId = req.user.id;

        // Check if store exists
        const [stores] = await pool.query(
            'SELECT id FROM stores WHERE id = ?',
            [store_id]
        );

        if (stores.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Store not found'
            });
        }

        // Check if user already rated this store
        const [existingRatings] = await pool.query(
            'SELECT id FROM ratings WHERE user_id = ? AND store_id = ?',
            [userId, store_id]
        );

        if (existingRatings.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'You have already rated this store. Please use update endpoint to modify your rating.'
            });
        }

        // Insert rating
        const [result] = await pool.query(
            'INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)',
            [userId, store_id, rating]
        );

        res.status(201).json({
            success: true,
            message: 'Rating submitted successfully',
            data: {
                id: result.insertId,
                rating
            }
        });
    } catch (error) {
        console.error('Submit rating error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update rating for a store
exports.updateRating = async (req, res) => {
    try {
        const { store_id, rating } = req.body;
        const userId = req.user.id;

        // Check if rating exists
        const [existingRatings] = await pool.query(
            'SELECT id FROM ratings WHERE user_id = ? AND store_id = ?',
            [userId, store_id]
        );

        if (existingRatings.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Rating not found. Please submit a rating first.'
            });
        }

        // Update rating
        await pool.query(
            'UPDATE ratings SET rating = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ? AND store_id = ?',
            [rating, userId, store_id]
        );

        res.json({
            success: true,
            message: 'Rating updated successfully',
            data: {
                rating
            }
        });
    } catch (error) {
        console.error('Update rating error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get user's submitted ratings
exports.getMyRatings = async (req, res) => {
    try {
        const userId = req.user.id;

        const [ratings] = await pool.query(
            `SELECT
                r.id,
                r.rating,
                r.created_at,
                r.updated_at,
                s.id as store_id,
                s.name as store_name,
                s.address as store_address
            FROM ratings r
            JOIN stores s ON r.store_id = s.id
            WHERE r.user_id = ?
            ORDER BY r.created_at DESC`,
            [userId]
        );

        res.json({
            success: true,
            data: ratings
        });
    } catch (error) {
        console.error('Get my ratings error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
