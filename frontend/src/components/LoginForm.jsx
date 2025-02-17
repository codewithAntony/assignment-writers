import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:5000/api/login',
                { username, password }
            );
            if (response.data.success) {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/google',
                {
                    token: credentialResponse.credential
                }
            );
            if (response.data.success) {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Google login failed:', error);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6">
                    LOGIN TO YOUR ACCOUNT
                </h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Username or Email
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="w-full p-2 border rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="text-sm text-blue-500 mt-1"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide Password' : 'Show Password'}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded mb-4"
                    >
                        Login
                    </button>
                </form>
                <GoogleOAuthProvider clientId="GOOGLE_CLIENT_ID">
                    <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={() => console.error('Google login failed')}
                    />
                </GoogleOAuthProvider>
                <div className="mt-4 text-center">
                    <a href="forgot-password" className="text-blue-500">
                        Forgot Password?
                    </a>
                </div>
                <div className="mt-2 text-center">
                    <span>Don't have an account?</span>
                    <a href="/register" className="text-blue-500"></a>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
