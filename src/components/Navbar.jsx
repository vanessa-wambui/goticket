// Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "./CartContext"; // <-- Import Cart Hook
import "../css/Navbar.css"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart(); // <-- Get total items for the badge

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Sign In", path: "/signin" },
    { name: "Sign Up", path: "/signup" },
    { name: "Add Products", path: "/addproducts" },
    { name: "About Us", path: "/aboutus" },
  ];

  return (
    <nav className="navbar" style={{ backgroundColor: '#111', borderBottom: '1px solid #2a2a2a', position: 'sticky', top: '0', zIndex: '1000' }}>
      <div className="nav-container">
        
        {/* GoTicket Logo */}
        <div className="logo" style={{ fontSize: '24px', fontWeight: 'bold' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
            Go<span style={{ color: '#f5c518' }}>Ticket</span>
          </Link>
        </div>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={location.pathname === link.path ? "active" : ""}
              onClick={() => setIsOpen(false)}
              // Inline theme overrides for text color
              style={{ 
                color: location.pathname === link.path ? '#f5c518' : '#ccc',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
            >
              {link.name}
            </Link>
          ))}

          {/* CART ICON WITH BADGE */}
          <Link 
            to="/cart" 
            onClick={() => setIsOpen(false)}
            style={{ 
              position: 'relative', 
              display: 'flex', 
              alignItems: 'center', 
              textDecoration: 'none',
              marginLeft: '10px' // Adds slight space before the cart icon
            }}
          >
            {/* Cart SVG Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 24 24">
              <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l-.839 2h13.239l-.575 2h-13.601l-4-9h-3.5v-2h4.433l1.147-2.614 3.42-1.386h12.4z"/>
            </svg>
            
            {/* Dynamic Counter Badge */}
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-10px',
                backgroundColor: '#f5c518',
                color: '#000',
                fontSize: '11px',
                fontWeight: '800',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #111' // Hides background gaps against dark navbar
              }}>
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Hamburger Menu - forced to white to be visible on dark bg */}
        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${isOpen ? "animate-bar1" : ""}`} style={{ backgroundColor: '#fff' }}></span>
          <span className={`bar ${isOpen ? "animate-bar2" : ""}`} style={{ backgroundColor: '#fff' }}></span>
          <span className={`bar ${isOpen ? "animate-bar3" : ""}`} style={{ backgroundColor: '#fff' }}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;