import React, { useState } from "react";
import api from "../services/api"; 

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/login", formData);
            
            // Extract token and user details from the response
            const token = response.data.token;
            const user = response.data.user;

            // Store the token and user details in localStorage
            localStorage.setItem("auth_token", token);
            localStorage.setItem("auth_user", JSON.stringify(user));

            // Call the onLogin callback to update the auth state
            onLogin(token);
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white text-center">
                            <h4 className="mb-0">Login</h4>
                        </div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleLogin}>
                                {/* Email Field */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* Password Field */}
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        id="password"
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            <small>
                                Don't have an account? <a href="/register">Register here</a>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
