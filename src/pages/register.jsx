import React, { useState, useEffect } from "react";
import api from "../services/api";

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        user_type: "",
        grade_level: "",
        department: "",
        gender: "",
        password: "",
        password_confirmation: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch CSRF token on component mount
    useEffect(() => {
        api.get("/sanctum/csrf-cookie").then(() => {
            console.log("CSRF token fetched successfully");
        }).catch(err => console.error("Error fetching CSRF token:", err));
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle registration form submission
    const handleRegister = async (e) => {
        e.preventDefault();

        // Clean data to avoid sending unnecessary fields
        const cleanedData = {
            ...formData,
            grade_level: formData.user_type === "student" ? formData.grade_level : null,
            department: formData.user_type === "teacher" ? formData.department : null,
        };

        try {
            const response = await api.post("/createUser", cleanedData);
            if (response.status === 200) {
                setSuccess("Registration successful! You can now log in.");
                setError("");
                setFormData({
                    first_name: "",
                    last_name: "",
                    email: "",
                    user_type: "",
                    grade_level: "",
                    department: "",
                    gender: "",
                    password: "",
                    password_confirmation: "",
                });
            }
        } catch (err) {
            if (err.response?.status === 422) {
                const errors = err.response.data.errors;
                setError(
                    Object.values(errors)
                        .flat()
                        .join(". ")
                );
            } else {
                setError(err.response?.data?.message || "Registration failed. Please check your input.");
            }
            setSuccess("");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white text-center">
                            <h4 className="mb-0">Register</h4>
                        </div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}
                            <form onSubmit={handleRegister}>
                                {/* First Name */}
                                <div className="mb-3 row">
                                    <label htmlFor="first_name" className="col-md-4 col-form-label text-md-end">
                                        First Name
                                    </label>
                                    <div className="col-md-6">
                                        <input
                                            id="first_name"
                                            type="text"
                                            className="form-control"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Last Name */}
                                <div className="mb-3 row">
                                    <label htmlFor="last_name" className="col-md-4 col-form-label text-md-end">
                                        Last Name
                                    </label>
                                    <div className="col-md-6">
                                        <input
                                            id="last_name"
                                            type="text"
                                            className="form-control"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="mb-3 row">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-end">
                                        Email Address
                                    </label>
                                    <div className="col-md-6">
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
                                </div>

                                {/* User Type */}
                                <div className="mb-3 row">
                                    <label htmlFor="user_type" className="col-md-4 col-form-label text-md-end">
                                        User Type
                                    </label>
                                    <div className="col-md-6">
                                        <select
                                            id="user_type"
                                            className="form-select"
                                            name="user_type"
                                            value={formData.user_type}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select User Type</option>
                                            <option value="student">Student</option>
                                            <option value="teacher">Teacher</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Conditional Fields */}
                                {formData.user_type === "student" && (
                                    <div className="mb-3 row">
                                        <label htmlFor="grade_level" className="col-md-4 col-form-label text-md-end">
                                            Grade Level
                                        </label>
                                        <div className="col-md-6">
                                            <select
                                                id="grade_level"
                                                className="form-select"
                                                name="grade_level"
                                                value={formData.grade_level}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">Select Grade</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                            </select>
                                        </div>
                                    </div>
                                )}

                                {formData.user_type === "teacher" && (
                                    <div className="mb-3 row">
                                        <label htmlFor="department" className="col-md-4 col-form-label text-md-end">
                                            Department
                                        </label>
                                        <div className="col-md-6">
                                            <input
                                                id="department"
                                                type="text"
                                                className="form-control"
                                                name="department"
                                                value={formData.department}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Gender */}
                                <div className="mb-3 row">
                                    <label htmlFor="gender" className="col-md-4 col-form-label text-md-end">
                                        Gender
                                    </label>
                                    <div className="col-md-6">
                                        <select
                                            id="gender"
                                            className="form-select"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="mb-3 row">
                                    <label htmlFor="password" className="col-md-4 col-form-label text-md-end">
                                        Password
                                    </label>
                                    <div className="col-md-6">
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
                                </div>

                                {/* Confirm Password */}
                                <div className="mb-3 row">
                                    <label htmlFor="password_confirmation" className="col-md-4 col-form-label text-md-end">
                                        Confirm Password
                                    </label>
                                    <div className="col-md-6">
                                        <input
                                            id="password_confirmation"
                                            type="password"
                                            className="form-control"
                                            name="password_confirmation"
                                            value={formData.password_confirmation}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="row mb-0">
                                    <div className="col-md-6 offset-md-4">
                                        <button type="submit" className="btn btn-primary w-100">
                                            Register
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            <small>
                                Already have an account? <a href="/login">Login here</a>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

