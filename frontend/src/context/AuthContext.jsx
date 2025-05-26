import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
        loading: true
    });
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get(
                        'http://localhost3001/api/user/me',
                        {
                            headers: { Authorization: `Bearer ${token}` }
                        }
                    );
                    setAuthState({
                        isAuthenticated: true,
                        user: response.data,
                        loading: false
                    });
                } else {
                    setAuthState((prev) => ({ ...prev, loading: false }));
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                localStorage.removeItem('token');
                setAuthState({
                    isAuthenticated: false,
                    user: null,
                    loading: false
                });
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (token) => {
        try {
            localStorage.setItem('token', token);
            const response = await axios.get(
                'http://localhost:3001/api/user/me',
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            setAuthState({
                isAuthenticated: true,
                user: response.data,
                loading: false
            });

            const isOnAdminPath = window.location.pathname.startsWith('/admin');
            const shouldRedirect =
                !window.location.pathname.startsWith('/dashboard') &&
                !window.location.pathname.startsWith('/admin');

            if (shouldRedirect) {
                if (response.data.isAdmin) {
                    navigate('/admin/dashboard', { replace: true });
                } else {
                    navigate('/dashboard', { replace: true });
                }
            }
        } catch (error) {
            console.error('Login failed:', error);
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthState({
            isAuthenticated: false,
            user: null,
            loading: false
        });
        navigate('/', { replace: true });
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: authState.isAuthenticated,
                user: authState.user,
                loading: authState.loading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
