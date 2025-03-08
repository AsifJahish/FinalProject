

import { useState } from "react";
import axios from "axios";
import {Link, useNavigate, useLocation } from "react-router-dom";
import "./SignInForm.css";

// import { Link, useNavigate, useLocation } from "react-router-dom";  // Import useNavigate and useLocation
// import { useState } from "react";
// import axios from "axios";
// import "./SignInForm.css";

export default function SignInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/users/signin/", formData);
  
      console.log(response);  // Log the full response to check if the token is returned
  
      if (response.data.token) {
        // Store the token in localStorage
        localStorage.setItem('userToken', response.data.token);
        alert("Sign-in successful!");
  
        // Navigate to the page the user tried to visit before login
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      } else {
        setError("Login failed: No token returned");
      }
    } catch (err) {
      console.error("Error occurred during sign-in:", err);
      setError("Error occurred during sign-in.");
    }
  };
  

  return (
    <div className="signin-container">
      <div className="form-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Sign In</button>
        </form>
        <p>
           Don't have an account? <Link to="/signup">Sign up here</Link>
         </p>
      </div>
    </div>
  );
}
