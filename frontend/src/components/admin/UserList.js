import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

const UserList = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        name: '',
        email: '',
        address: '',
        role: ''
    });
    const [sortConfig, setSortConfig] = useState({
        sortBy: 'name',
        sortOrder: 'ASC'
    });

    useEffect(() => {
        fetchUsers();
    }, [filters, sortConfig]);

    const fetchUsers = async () => {
        try {
            const params = {
                ...filters,
                ...sortConfig
            };
            const response = await adminAPI.getUsers(params);
            setUsers(response.data.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load users');
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
                        <li className="active">
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
                    <h1>User Management</h1>

                    {error && <div className="error-message">{error}</div>}

                    <div className="filters-section">
                        <div className="filter-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Filter by name..."
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
                        <div className="filter-group">
                            <select
                                name="role"
                                value={filters.role}
                                onChange={handleFilterChange}
                            >
                                <option value="">All Roles</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                                <option value="store_owner">Store Owner</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="loading">Loading users...</div>
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
                                        <th onClick={() => handleSort('role')}>
                                            Role {getSortIcon('role')}
                                        </th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: 'center' }}>
                                                No users found
                                            </td>
                                        </tr>
                                    ) : (
                                        users.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.address || 'N/A'}</td>
                                                <td>
                                                    <span className={`role-badge role-${user.role}`}>
                                                        {user.role.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn-view"
                                                        onClick={() => navigate(`/admin/users/${user.id}`)}
                                                    >
                                                        View Details
                                                    </button>
                                                </td>
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

export default UserList;
