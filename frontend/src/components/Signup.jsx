import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:3001/signup',
                formData
            );

            if (response.data.token) {
                toast.success('Account created successfully!');
                setTimeout(() => navigate('/login', 1500));
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    // const handleGoogleLogin = async (credentialResponse) => {
    //     try {
    //         const response = await axios.post('http://localhost:5000/api/auth/google', {
    //             token: credentialResponse.credential,
    //         });
    //         if (response.data.success) {
    //             navigate('/dashboard'); // Redirect to dashboard after Google login
    //         }
    //     } catch (error) {
    //         console.error('Google login failed:', error);
    //     }
    // };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6">REGISTER ACCOUNT</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="w-full p-2 border rounded"
                            placeholder="Enter Name"
                            onChange={handleChange}
                            required
                            minLength={2}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="w-full p-2 border rounded"
                            placeholder="Enter Email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="w-full p-2 border rounded"
                            placeholder="Enter Password"
                            onChange={handleChange}
                            required
                            minLength={6}
                        />
                        {/* <button
                            type="button"
                            className="text-sm text-blue-500 mt-1"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide Password' : 'Show Password'}
                        </button> */}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full text-white p-2 rounded ${
                            loading
                                ? 'bg-blue-300 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    >
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>
                {/* <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
                    <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={() => console.error('Google login failed')}
                    />
                </GoogleOAuthProvider> */}

                <div className="mt-2 text-center">
                    <span>Have an account? </span>
                    <Link to="/login" className="text-blue-500">
                        Login
                    </Link>
                </div>
            </div>
            <ToastContainer position="top-right" />
        </div>
    );
};

export default LoginForm;
