import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeOwnerAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './StoreOwner.css';

const StoreOwnerDashboard = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [stats, setStats] = useState(null);
    const [ratingUsers, setRatingUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sortConfig, setSortConfig] = useState({
        sortBy: 'created_at',
        sortOrder: 'DESC'
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    useEffect(() => {
        if (stats) {
            fetchRatingUsers();
        }
    }, [sortConfig, stats]);

    const fetchDashboardData = async () => {
        try {
            const response = await storeOwnerAPI.getDashboardStats();
            setStats(response.data.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load dashboard data');
            setLoading(false);
        }
    };

    const fetchRatingUsers = async () => {
        try {
            const response = await storeOwnerAPI.getRatingUsers(sortConfig);
            setRatingUsers(response.data.data);
        } catch (err) {
            console.error('Failed to load rating users:', err);
        }
    };

    const handleSort = (field) => {
        setSortConfig({
            sortBy: field,
            sortOrder: sortConfig.sortBy === field && sortConfig.sortOrder === 'ASC' ? 'DESC' : 'ASC'
        });
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getSortIcon = (field) => {
        if (sortConfig.sortBy !== field) return '⇅';
        return sortConfig.sortOrder === 'ASC' ? '↑' : '↓';
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
                    {i <= rating ? '★' : '☆'}
                </span>
            );
        }
        return stars;
    };

    const getRatingDistributionPercentage = (count) => {
        if (!stats || stats.totalRatings === 0) return 0;
        return ((count / stats.totalRatings) * 100).toFixed(1);
    };

    if (loading) {
        return <div className="loading">Loading dashboard...</div>;
    }

    return (
        <div className="store-owner-container">
            <nav className="store-navbar">
                <div className="navbar-brand">
                    <h2>Store Owner Panel</h2>
                </div>
                <div className="navbar-user">
                    <span>Welcome, {user?.name}</span>
                    <button onClick={() => navigate('/store-owner/update-password')} className="btn btn-secondary">
                        Change Password
                    </button>
                    <button onClick={handleLogout} className="btn btn-logout">Logout</button>
                </div>
            </nav>

            <div className="store-main">
                <h1>Dashboard</h1>

                {error && <div className="error-message">{error}</div>}

                {stats && (
                    <>
                        <div className="store-info-card">
                            <h2>{stats.storeName}</h2>
                            <div className="store-stats">
                                <div className="stat-item">
                                    <div className="stat-label">Average Rating</div>
                                    <div className="stat-value-large">
                                        {renderStars(Math.round(parseFloat(stats.averageRating)))}
                                        <span className="rating-number">{stats.averageRating}</span>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-label">Total Ratings</div>
                                    <div className="stat-value">{stats.totalRatings}</div>
                                </div>
                            </div>
                        </div>

                        {stats.ratingDistribution && stats.ratingDistribution.length > 0 && (
                            <div className="rating-distribution-card">
                                <h3>Rating Distribution</h3>
                                <div className="distribution-bars">
                                    {[5, 4, 3, 2, 1].map((rating) => {
                                        const ratingData = stats.ratingDistribution.find(r => r.rating === rating);
                                        const count = ratingData ? ratingData.count : 0;
                                        const percentage = getRatingDistributionPercentage(count);

                                        return (
                                            <div key={rating} className="distribution-row">
                                                <span className="distribution-label">
                                                    {rating} {renderStars(rating)}
                                                </span>
                                                <div className="distribution-bar-container">
                                                    <div
                                                        className="distribution-bar"
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                                <span className="distribution-count">
                                                    {count} ({percentage}%)
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="ratings-list-card">
                            <h3>Users Who Rated Your Store</h3>

                            {ratingUsers.length === 0 ? (
                                <div className="no-ratings">No ratings yet</div>
                            ) : (
                                <div className="table-container">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th onClick={() => handleSort('name')}>
                                                    Name {getSortIcon('name')}
                                                </th>
                                                <th onClick={() => handleSort('email')}>
                                                    Email {getSortIcon('email')}
                                                </th>
                                                <th>Address</th>
                                                <th onClick={() => handleSort('rating')}>
                                                    Rating {getSortIcon('rating')}
                                                </th>
                                                <th onClick={() => handleSort('created_at')}>
                                                    Date {getSortIcon('created_at')}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ratingUsers.map((user) => (
                                                <tr key={user.id}>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.address || 'N/A'}</td>
                                                    <td>
                                                        <div className="rating-display">
                                                            {renderStars(user.rating)}
                                                        </div>
                                                    </td>
                                                    <td>{new Date(user.rating_date).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default StoreOwnerDashboard;
