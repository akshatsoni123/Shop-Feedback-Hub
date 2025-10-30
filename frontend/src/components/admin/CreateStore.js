import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

const CreateStore = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [formData, setFormData] = useState({
        ownerName: '',
        ownerEmail: '',
        ownerPassword: '',
        storeName: '',
        storeEmail: '',
        address: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const validateForm = () => {
        const newErrors = {};

        // Owner name validation
        if (formData.ownerName.length < 20 || formData.ownerName.length > 60) {
            newErrors.ownerName = 'Owner name must be between 20 and 60 characters';
        }

        // Owner email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.ownerEmail)) {
            newErrors.ownerEmail = 'Please enter a valid email address';
        }

        // Password validation
        if (formData.ownerPassword.length < 8 || formData.ownerPassword.length > 16) {
            newErrors.ownerPassword = 'Password must be between 8 and 16 characters';
        } else if (!/[A-Z]/.test(formData.ownerPassword)) {
            newErrors.ownerPassword = 'Password must contain at least one uppercase letter';
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.ownerPassword)) {
            newErrors.ownerPassword = 'Password must contain at least one special character';
        }

        // Store name validation
        if (formData.storeName.length < 20 || formData.storeName.length > 60) {
            newErrors.storeName = 'Store name must be between 20 and 60 characters';
        }

        // Store email validation
        if (!emailRegex.test(formData.storeEmail)) {
            newErrors.storeEmail = 'Please enter a valid email address';
        }

        // Address validation
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
            await adminAPI.createStore(formData);
            setSuccessMessage('Store and owner created successfully!');
            setFormData({
                ownerName: '',
                ownerEmail: '',
                ownerPassword: '',
                storeName: '',
                storeEmail: '',
                address: ''
            });
            setTimeout(() => {
                navigate('/admin/stores');
            }, 2000);
        } catch (err) {
            if (err.response?.data?.errors) {
                const apiErrors = {};
                err.response.data.errors.forEach(error => {
                    apiErrors[error.path] = error.msg;
                });
                setErrors(apiErrors);
            } else {
                setErrors({ general: err.response?.data?.message || 'Failed to create store' });
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
                        <li onClick={() => navigate('/admin/create-user')}>
                            Add User
                        </li>
                        <li className="active">
                            Add Store
                        </li>
                    </ul>
                </div>

                <div className="admin-main">
                    <h1>Create New Store</h1>

                    {errors.general && <div className="error-message">{errors.general}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}

                    <form onSubmit={handleSubmit} className="form-container">
                        <h3 style={{ marginBottom: '20px', color: '#667eea' }}>Store Owner Information</h3>

                        <div className="form-group">
                            <label htmlFor="ownerName">Owner Name *</label>
                            <input
                                type="text"
                                id="ownerName"
                                name="ownerName"
                                value={formData.ownerName}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                minLength={20}
                                maxLength={60}
                            />
                            {errors.ownerName && <span className="error-text">{errors.ownerName}</span>}
                            <small className="form-hint">Min 20 characters, Max 60 characters</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="ownerEmail">Owner Email *</label>
                            <input
                                type="email"
                                id="ownerEmail"
                                name="ownerEmail"
                                value={formData.ownerEmail}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                            {errors.ownerEmail && <span className="error-text">{errors.ownerEmail}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="ownerPassword">Owner Password *</label>
                            <input
                                type="password"
                                id="ownerPassword"
                                name="ownerPassword"
                                value={formData.ownerPassword}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                minLength={8}
                                maxLength={16}
                            />
                            {errors.ownerPassword && <span className="error-text">{errors.ownerPassword}</span>}
                            <small className="form-hint">
                                8-16 characters, must include uppercase and special character
                            </small>
                        </div>

                        <h3 style={{ marginTop: '30px', marginBottom: '20px', color: '#667eea' }}>Store Information</h3>

                        <div className="form-group">
                            <label htmlFor="storeName">Store Name *</label>
                            <input
                                type="text"
                                id="storeName"
                                name="storeName"
                                value={formData.storeName}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                minLength={20}
                                maxLength={60}
                            />
                            {errors.storeName && <span className="error-text">{errors.storeName}</span>}
                            <small className="form-hint">Min 20 characters, Max 60 characters</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="storeEmail">Store Email *</label>
                            <input
                                type="email"
                                id="storeEmail"
                                name="storeEmail"
                                value={formData.storeEmail}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                            {errors.storeEmail && <span className="error-text">{errors.storeEmail}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Store Address *</label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                maxLength={400}
                                rows={3}
                            />
                            {errors.address && <span className="error-text">{errors.address}</span>}
                            <small className="form-hint">Max 400 characters</small>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Creating...' : 'Create Store'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate('/admin/stores')}
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

export default CreateStore;
