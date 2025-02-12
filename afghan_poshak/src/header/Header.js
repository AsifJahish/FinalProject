import React from "react";
import { Link } from "react-router-dom";
import { Home, ShoppingCart } from "lucide-react";
import "./Header.css"; // Import the CSS file

export default function Navbar() {
  return (
    <header className="navbar">
      <nav className="container">
        {/* Logo and Home */}
        <Link to="signin/" className="logo">
          <Home className="home-icon" />
          <span>AfghanPoshak</span>
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/" className="nav-link">Shop</Link>
          <Link to="/help" className="nav-link">Help</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
        </div>

        {/* Cart */}
        <Link to="/cart" className="cart">
          <ShoppingCart className="cart-icon" />
          <span className="cart-text">Your cart</span>
          <span className="cart-count">(2)</span>
        </Link>
      </nav>
    </header>
  );
}
