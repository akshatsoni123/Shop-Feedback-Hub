import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalStores: 0,
        totalRatings: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const response = await adminAPI.getDashboardStats();
            setStats(response.data.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load dashboard statistics');
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return <div className="loading">Loading dashboard...</div>;
    }

    return (
        <div className="admin-container">
            <nav className="admin-navbar">
                <div className="navbar-brand">
                    <h2>Admin Panel</h2>
                </div>
                <div className="navbar-user">
                    <span>Welcome, {user?.name}</span>
                    <button onClick={handleLogout} className="btn btn-logout">Logout</button>
                </div>
            </nav>

            <div className="admin-content">
                <div className="admin-sidebar">
                    <ul className="sidebar-menu">
                        <li className="active" onClick={() => navigate('/admin/dashboard')}>
                            Dashboard
                        </li>
                        <li onClick={() => navigate('/admin/users')}>
                            Users
                        </li>
                        <li onClick={() => navigate('/admin/stores')}>
                            Stores
                        </li>
                        <li onClick={() => navigate('/admin/create-user')}>
                            Add User
                        </li>
                        <li onClick={() => navigate('/admin/create-store')}>
                            Add Store
                        </li>
                    </ul>
                </div>

                <div className="admin-main">
                    <h1>Dashboard</h1>

                    {error && <div className="error-message">{error}</div>}

                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-details">
                                <p className="stat-label">Total Users</p>
                                <h3 className="stat-value">{stats.totalUsers}</h3>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-details">
                                <p className="stat-label">Total Stores</p>
                                <h3 className="stat-value">{stats.totalStores}</h3>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-details">
                                <p className="stat-label">Total Ratings</p>
                                <h3 className="stat-value">{stats.totalRatings}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="quick-actions">
                        <h2>Quick Actions</h2>
                        <div className="action-buttons">
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate('/admin/create-user')}
                            >
                                Add New User
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => navigate('/admin/create-store')}
                            >
                                Add New Store
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => navigate('/admin/users')}
                            >
                                View All Users
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => navigate('/admin/stores')}
                            >
                                View All Stores
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
