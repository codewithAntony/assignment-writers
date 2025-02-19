import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router';

const LoginForm = () => {
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    // const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:3001/signup', { name, email, password })
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
    };
    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://localhost:5000/api/login', { username, password });
    //         if (response.data.success) {
    //             navigate('/dashboard'); // Redirect to dashboard after login
    //         }
    //     } catch (error) {
    //         console.error('Login failed:', error);
    //     }
    // };

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
                            className="w-full p-2 border rounded"
                            placeholder="Enter Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded"
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded"
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
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
                        className="w-full bg-blue-500 text-white p-2 rounded mb-4"
                    >
                        Register
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
        </div>
    );
};

export default LoginForm;
