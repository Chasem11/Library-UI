import './styles/App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login"; 
import Register from "./pages/Register"; 
import Home from "./pages/Home"; 
import Books from "./components/Books"; 
import Movies from "./components/Movies";

// Reusable Private Route
const PrivateRoute = ({ isAuthenticated, children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
};

// Reusable Public Route
const PublicRoute = ({ isAuthenticated, children }) => {
    return !isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check authentication state on initial load
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    // Handle login
    const handleLogin = (token) => {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route
                    path="/login"
                    element={
                        <PublicRoute isAuthenticated={isAuthenticated}>
                            <Login onLogin={handleLogin} />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicRoute isAuthenticated={isAuthenticated}>
                            <Register onRegister={handleLogin} />
                        </PublicRoute>
                    }
                />

                {/* Private Routes */}
                <Route
                    path="/"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Home onLogout={handleLogout} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/books"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Books />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/movies"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Movies />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;


