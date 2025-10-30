import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Auth components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Admin components
import AdminDashboard from './components/admin/AdminDashboard';
import UserList from './components/admin/UserList';
import StoreList from './components/admin/StoreList';
import CreateUser from './components/admin/CreateUser';
import CreateStore from './components/admin/CreateStore';

// User components
import UserDashboard from './components/user/UserDashboard';

// Store Owner components
import StoreOwnerDashboard from './components/storeOwner/StoreOwnerDashboard';

import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Admin routes */}
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/users"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <UserList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/stores"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <StoreList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/create-user"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <CreateUser />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/create-store"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <CreateStore />
                            </ProtectedRoute>
                        }
                    />

                    {/* User routes */}
                    <Route
                        path="/user/stores"
                        element={
                            <ProtectedRoute allowedRoles={['user']}>
                                <UserDashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Store Owner routes */}
                    <Route
                        path="/store-owner/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={['store_owner']}>
                                <StoreOwnerDashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Default redirect */}
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    {/* Unauthorized route */}
                    <Route path="/unauthorized" element={
                        <div className="error-page">
                            <h1>403 - Unauthorized</h1>
                            <p>You don't have permission to access this page.</p>
                            <a href="/login">Go to Login</a>
                        </div>
                    } />

                    {/* 404 route */}
                    <Route path="*" element={
                        <div className="error-page">
                            <h1>404 - Page Not Found</h1>
                            <p>The page you're looking for doesn't exist.</p>
                            <a href="/login">Go to Login</a>
                        </div>
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
