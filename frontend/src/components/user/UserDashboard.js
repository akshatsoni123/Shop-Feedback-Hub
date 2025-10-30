import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './User.css';

const UserDashboard = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchParams, setSearchParams] = useState({
        name: '',
        address: ''
    });
    const [sortConfig, setSortConfig] = useState({
        sortBy: 'name',
        sortOrder: 'ASC'
    });
    const [ratingModal, setRatingModal] = useState({
        isOpen: false,
        storeId: null,
        storeName: '',
        currentRating: null
    });
    const [selectedRating, setSelectedRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        fetchStores();
    }, [searchParams, sortConfig]);

    const fetchStores = async () => {
        try {
            const params = {
                ...searchParams,
                ...sortConfig
            };
            const response = await userAPI.getStores(params);
            setStores(response.data.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load stores');
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        });
    };

    const handleSort = (field) => {
        setSortConfig({
            sortBy: field,
            sortOrder: sortConfig.sortBy === field && sortConfig.sortOrder === 'ASC' ? 'DESC' : 'ASC'
        });
    };

    const openRatingModal = (store) => {
        setRatingModal({
            isOpen: true,
            storeId: store.id,
            storeName: store.name,
            currentRating: store.user_rating
        });
        setSelectedRating(store.user_rating || 0);
    };

    const closeRatingModal = () => {
        setRatingModal({
            isOpen: false,
            storeId: null,
            storeName: '',
            currentRating: null
        });
        setSelectedRating(0);
        setHoverRating(0);
    };

    const submitRating = async () => {
        if (selectedRating === 0) {
            alert('Please select a rating');
            return;
        }

        try {
            const data = {
                store_id: ratingModal.storeId,
                rating: selectedRating
            };

            if (ratingModal.currentRating) {
                await userAPI.updateRating(data);
            } else {
                await userAPI.submitRating(data);
            }

            closeRatingModal();
            fetchStores();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to submit rating');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getSortIcon = (field) => {
        if (sortConfig.sortBy !== field) return '⇅';
        return sortConfig.sortOrder === 'ASC' ? '↑' : '↓';
    };

    const renderStars = (rating, interactive = false, storeId = null) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (interactive) {
                stars.push(
                    <span
                        key={i}
                        className={`star interactive ${i <= (hoverRating || selectedRating) ? 'filled' : ''}`}
                        onClick={() => setSelectedRating(i)}
                        onMouseEnter={() => setHoverRating(i)}
                        onMouseLeave={() => setHoverRating(0)}
                    >
                        ★
                    </span>
                );
            } else {
                stars.push(
                    <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
                        {i <= rating ? '★' : '☆'}
                    </span>
                );
            }
        }
        return stars;
    };

    return (
        <div className="user-container">
            <nav className="user-navbar">
                <div className="navbar-brand">
                    <h2>Store Rating System</h2>
                </div>
                <div className="navbar-user">
                    <span>Welcome, {user?.name}</span>
                    <button onClick={() => navigate('/user/update-password')} className="btn btn-secondary">
                        Change Password
                    </button>
                    <button onClick={handleLogout} className="btn btn-logout">Logout</button>
                </div>
            </nav>

            <div className="user-main">
                <h1>Browse Stores</h1>

                {error && <div className="error-message">{error}</div>}

                <div className="search-section">
                    <input
                        type="text"
                        name="name"
                        placeholder="Search by store name..."
                        value={searchParams.name}
                        onChange={handleSearchChange}
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Search by address..."
                        value={searchParams.address}
                        onChange={handleSearchChange}
                    />
                </div>

                {loading ? (
                    <div className="loading">Loading stores...</div>
                ) : (
                    <div className="stores-grid">
                        {stores.length === 0 ? (
                            <div className="no-results">No stores found</div>
                        ) : (
                            stores.map((store) => (
                                <div key={store.id} className="store-card">
                                    <h3>{store.name}</h3>
                                    <p className="store-address">{store.address || 'No address provided'}</p>

                                    <div className="rating-section">
                                        <div className="rating-row">
                                            <span className="rating-label">Overall Rating:</span>
                                            <div className="rating-display">
                                                {renderStars(Math.round(parseFloat(store.average_rating)))}
                                                <span className="rating-value">
                                                    {parseFloat(store.average_rating).toFixed(1)}
                                                </span>
                                                <span className="rating-count">
                                                    ({store.total_ratings} {store.total_ratings === 1 ? 'rating' : 'ratings'})
                                                </span>
                                            </div>
                                        </div>

                                        {store.user_rating && (
                                            <div className="rating-row">
                                                <span className="rating-label">Your Rating:</span>
                                                <div className="rating-display">
                                                    {renderStars(store.user_rating)}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        className="btn btn-rate"
                                        onClick={() => openRatingModal(store)}
                                    >
                                        {store.user_rating ? 'Update Rating' : 'Rate Store'}
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {ratingModal.isOpen && (
                <div className="modal-overlay" onClick={closeRatingModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{ratingModal.currentRating ? 'Update' : 'Submit'} Rating</h2>
                        <p className="modal-store-name">{ratingModal.storeName}</p>

                        <div className="rating-input">
                            <p>Select your rating:</p>
                            <div className="stars-input">
                                {renderStars(selectedRating, true)}
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button className="btn btn-primary" onClick={submitRating}>
                                Submit
                            </button>
                            <button className="btn btn-secondary" onClick={closeRatingModal}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
