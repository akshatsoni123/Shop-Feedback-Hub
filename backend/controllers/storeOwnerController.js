const { pool } = require('../config/database');

// Get store owner's store information and average rating
exports.getMyStore = async (req, res) => {
    try {
        const ownerId = req.user.id;

        const [stores] = await pool.query(
            `SELECT
                s.id,
                s.name,
                s.email,
                s.address,
                COALESCE(AVG(r.rating), 0) as average_rating,
                COUNT(r.id) as total_ratings
            FROM stores s
            LEFT JOIN ratings r ON s.id = r.store_id
            WHERE s.owner_id = ?
            GROUP BY s.id, s.name, s.email, s.address`,
            [ownerId]
        );

        if (stores.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No store found for this owner'
            });
        }

        res.json({
            success: true,
            data: stores[0]
        });
    } catch (error) {
        console.error('Get my store error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get users who rated the store
exports.getRatingUsers = async (req, res) => {
    try {
        const ownerId = req.user.id;
        const { sortBy = 'created_at', sortOrder = 'DESC' } = req.query;

        // First, get the store ID for this owner
        const [stores] = await pool.query(
            'SELECT id FROM stores WHERE owner_id = ?',
            [ownerId]
        );

        if (stores.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No store found for this owner'
            });
        }

        const storeId = stores[0].id;

        // Get all users who rated this store
        let query = `
            SELECT
                u.id,
                u.name,
                u.email,
                u.address,
                r.rating,
                r.created_at as rating_date,
                r.updated_at as last_updated
            FROM ratings r
            JOIN users u ON r.user_id = u.id
            WHERE r.store_id = ?
        `;

        // Apply sorting
        const allowedSortFields = ['name', 'email', 'rating', 'created_at'];
        const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'created_at';
        const order = sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

        if (sortField === 'name' || sortField === 'email') {
            query += ` ORDER BY u.${sortField} ${order}`;
        } else if (sortField === 'created_at') {
            query += ` ORDER BY r.created_at ${order}`;
        } else {
            query += ` ORDER BY r.${sortField} ${order}`;
        }

        const [users] = await pool.query(query, [storeId]);

        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Get rating users error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get dashboard statistics for store owner
exports.getDashboardStats = async (req, res) => {
    try {
        const ownerId = req.user.id;

        // Get store information with average rating
        const [stores] = await pool.query(
            `SELECT
                s.id,
                s.name,
                COALESCE(AVG(r.rating), 0) as average_rating,
                COUNT(r.id) as total_ratings
            FROM stores s
            LEFT JOIN ratings r ON s.id = r.store_id
            WHERE s.owner_id = ?
            GROUP BY s.id, s.name`,
            [ownerId]
        );

        if (stores.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No store found for this owner'
            });
        }

        const storeData = stores[0];

        // Get rating distribution
        const [distribution] = await pool.query(
            `SELECT
                rating,
                COUNT(*) as count
            FROM ratings
            WHERE store_id = ?
            GROUP BY rating
            ORDER BY rating DESC`,
            [storeData.id]
        );

        res.json({
            success: true,
            data: {
                storeId: storeData.id,
                storeName: storeData.name,
                averageRating: parseFloat(storeData.average_rating).toFixed(2),
                totalRatings: storeData.total_ratings,
                ratingDistribution: distribution
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
