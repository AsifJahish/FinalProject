import React from 'react';
import SignUpForm from './signup/SignUpForm';
import SignInForm from './signin/SignInForm';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './header/Header';  // Import the Navbar component


function App() {
  return (
    <Router>
      {/* Add Navbar here */}
      <Header />

      {/* Main Content Section */}
      <div className="main-content">
        <Routes>
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
