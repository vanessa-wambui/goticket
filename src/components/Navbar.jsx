// Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import"../css/Navbar.css"; // We'll create this for animations and styling

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Sign In", path: "/signin" },
    { name: "Sign Up", path: "/signup" },
    { name: "Add Products", path: "/addproducts" },
    { name: "Make Payment", path: "/makepayment" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/">GoTicket</Link>
        </div>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={location.pathname === link.path ? "active" : ""}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${isOpen ? "animate-bar1" : ""}`}></span>
          <span className={`bar ${isOpen ? "animate-bar2" : ""}`}></span>
          <span className={`bar ${isOpen ? "animate-bar3" : ""}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;