import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ProtectedRoute({ children, adminOnly = false }) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                if (!isAuthenticated || !adminOnly) {
                    setIsLoading(false);
                    return;
                }

                const token = localStorage.getItem('token');
                const response = await axios.get('/api/user/check-admin', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setIsAdmin(response.data.isAdmin);
            } catch (error) {
                console.error('Error checking admin status:', error);
                toast.error('Error verifying permissions');
            } finally {
                setIsLoading(false);
            }
        };

        checkAdminStatus();
    }, [isAuthenticated, adminOnly]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (adminOnly && !isAdmin) {
        toast.error('Admin access required');
        return <Navigate to="/dashboard" replace />;
    }

    return children || <Outlet />;
}

export default ProtectedRoute;
