import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

const CreateUser = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        role: 'user'
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const validateForm = () => {
        const newErrors = {};

        if (formData.name.length < 20 || formData.name.length > 60) {
            newErrors.name = 'Name must be between 20 and 60 characters';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (formData.password.length < 8 || formData.password.length > 16) {
            newErrors.password = 'Password must be between 8 and 16 characters';
        } else if (!/[A-Z]/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter';
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one special character';
        }

        if (formData.address.length > 400) {
            newErrors.address = 'Address must not exceed 400 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ''
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            await adminAPI.createUser(formData);
            setSuccessMessage('User created successfully!');
            setFormData({
                name: '',
                email: '',
                password: '',
                address: '',
                role: 'user'
            });
            setTimeout(() => {
                navigate('/admin/users');
            }, 2000);
        } catch (err) {
            if (err.response?.data?.errors) {
                const apiErrors = {};
                err.response.data.errors.forEach(error => {
                    apiErrors[error.path] = error.msg;
                });
                setErrors(apiErrors);
            } else {
                setErrors({ general: err.response?.data?.message || 'Failed to create user' });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
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
                        <li onClick={() => navigate('/admin/stores')}>
                            Stores
                        </li>
                        <li className="active">
                            Add User
                        </li>
                        <li onClick={() => navigate('/admin/create-store')}>
                            Add Store
                        </li>
                    </ul>
                </div>

                <div className="admin-main">
                    <h1>Create New User</h1>

                    {errors.general && <div className="error-message">{errors.general}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}

                    <form onSubmit={handleSubmit} className="form-container">
                        <div className="form-group">
                            <label htmlFor="name">Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                minLength={20}
                                maxLength={60}
                            />
                            {errors.name && <span className="error-text">{errors.name}</span>}
                            <small className="form-hint">Min 20 characters, Max 60 characters</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password *</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                minLength={8}
                                maxLength={16}
                            />
                            {errors.password && <span className="error-text">{errors.password}</span>}
                            <small className="form-hint">
                                8-16 characters, must include uppercase and special character
                            </small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                disabled={loading}
                                maxLength={400}
                                rows={3}
                            />
                            {errors.address && <span className="error-text">{errors.address}</span>}
                            <small className="form-hint">Max 400 characters</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="role">Role *</label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            >
                                <option value="user">Normal User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Creating...' : 'Create User'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate('/admin/users')}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;
