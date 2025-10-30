import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

const StoreList = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        name: '',
        email: '',
        address: ''
    });
    const [sortConfig, setSortConfig] = useState({
        sortBy: 'name',
        sortOrder: 'ASC'
    });

    useEffect(() => {
        fetchStores();
    }, [filters, sortConfig]);

    const fetchStores = async () => {
        try {
            const params = {
                ...filters,
                ...sortConfig
            };
            const response = await adminAPI.getStores(params);
            setStores(response.data.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load stores');
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
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
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="star filled">★</span>);
        }
        if (hasHalfStar) {
            stars.push(<span key="half" className="star half">★</span>);
        }
        for (let i = stars.length; i < 5; i++) {
            stars.push(<span key={i} className="star">☆</span>);
        }
        return stars;
    };

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
                        <li onClick={() => navigate('/admin/dashboard')}>
                            Dashboard
                        </li>
                        <li onClick={() => navigate('/admin/users')}>
                            Users
                        </li>
                        <li className="active">
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
                    <h1>Store Management</h1>

                    {error && <div className="error-message">{error}</div>}

                    <div className="filters-section">
                        <div className="filter-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Filter by store name..."
                                value={filters.name}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="filter-group">
                            <input
                                type="text"
                                name="email"
                                placeholder="Filter by email..."
                                value={filters.email}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="filter-group">
                            <input
                                type="text"
                                name="address"
                                placeholder="Filter by address..."
                                value={filters.address}
                                onChange={handleFilterChange}
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="loading">Loading stores...</div>
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
                                        <th>Total Ratings</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stores.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: 'center' }}>
                                                No stores found
                                            </td>
                                        </tr>
                                    ) : (
                                        stores.map((store) => (
                                            <tr key={store.id}>
                                                <td>{store.name}</td>
                                                <td>{store.email}</td>
                                                <td>{store.address || 'N/A'}</td>
                                                <td>
                                                    <div className="rating-display">
                                                        {renderStars(parseFloat(store.rating))}
                                                        <span className="rating-value">
                                                            {parseFloat(store.rating).toFixed(1)}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>{store.total_ratings}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoreList;
