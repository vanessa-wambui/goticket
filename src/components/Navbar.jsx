// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import "../css/Navbar.css";

const ADMIN_PASSCODE = "1234"; // 🔐 Change this to your own secret passcode

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [targetPath, setTargetPath] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));

  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  // Re-check login state on every route change
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("user"));
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleAdminClick = (path) => {
    setTargetPath(path);
    setPasscode("");
    setError("");
    setShowModal(true);
    setIsOpen(false);
  };

  const handlePasscodeSubmit = () => {
    if (passcode === ADMIN_PASSCODE) {
      setShowModal(false);
      setPasscode("");
      setError("");
      navigate(targetPath);
    } else {
      setError("Wrong passcode. Try again.");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setIsOpen(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Home",        path: "/",          show: true },
    { name: "Sign In",     path: "/signin",     show: !isLoggedIn },
    { name: "Sign Up",     path: "/signup",     show: !isLoggedIn },
    { name: "Our Shop",    path: "/shop",       show: true },
    { name: "About Us",    path: "/aboutus",    show: true },
    { name: "My Activity", path: "/myactivity", show: isLoggedIn },
  ];

  const adminLinks = [
    { name: "Add Products", path: "/addproducts" },
    { name: "Add Item",     path: "/additem" },
  ];

  const modalStyles = {
    overlay: {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
    },
    modal: {
      backgroundColor: '#1a1a1a',
      border: '1px solid #2a2a2a',
      borderRadius: '16px',
      padding: '36px',
      width: '320px',
      textAlign: 'center',
    },
    title:    { color: '#fff', fontSize: '20px', fontWeight: '700', marginBottom: '8px' },
    subtitle: { color: '#888', fontSize: '14px', marginBottom: '24px' },
    input: {
      backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a',
      color: '#fff', borderRadius: '8px', padding: '12px 16px',
      width: '100%', fontSize: '18px', outline: 'none',
      textAlign: 'center', letterSpacing: '6px', marginBottom: '12px',
      boxSizing: 'border-box',
    },
    error:      { color: '#f44336', fontSize: '13px', marginBottom: '12px' },
    btnRow:     { display: 'flex', gap: '10px', marginTop: '8px' },
    confirmBtn: {
      flex: 1, backgroundColor: '#f5c518', color: '#000',
      border: 'none', borderRadius: '8px', padding: '12px',
      fontSize: '15px', fontWeight: '700', cursor: 'pointer',
    },
    cancelBtn: {
      flex: 1, backgroundColor: 'transparent', color: '#888',
      border: '1px solid #333', borderRadius: '8px', padding: '12px',
      fontSize: '15px', cursor: 'pointer',
    },
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">

          {/* GoTicket Logo */}
          <div className="logo">
            <Link to="/">
              Go<span>Ticket</span>
            </Link>
          </div>

          <div className={`nav-links ${isOpen ? "open" : ""}`}>

            {/* Regular nav links */}
            {navLinks
              .filter((link) => link.show)
              .map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={location.pathname === link.path ? "active" : ""}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

            {/* Admin links — logged in only, passcode required */}
            {isLoggedIn && adminLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleAdminClick(link.path)}
              >
                {link.name}
              </button>
            ))}

            {/* Cart icon — logged in only */}
            {isLoggedIn && (
              <Link
                to="/cart"
                className="cart-link"
                onClick={() => setIsOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 24 24">
                  <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l-.839 2h13.239l-.575 2h-13.601l-4-9h-3.5v-2h4.433l1.147-2.614 3.42-1.386h12.4z"/>
                </svg>
                {totalItems > 0 && (
                  <span style={{
                    position: 'absolute', top: '-8px', right: '-10px',
                    backgroundColor: '#f5c518', color: '#000',
                    fontSize: '11px', fontWeight: '800',
                    width: '20px', height: '20px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid #111',
                  }}>
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {/* Sign Out — logged in only */}
            {isLoggedIn && (
              <button className="signout-btn" onClick={handleSignOut}>
                Sign Out
              </button>
            )}

          </div>

          {/* Hamburger */}
          <div className="hamburger" onClick={toggleMenu}>
            <span className={`bar ${isOpen ? "animate-bar1" : ""}`}></span>
            <span className={`bar ${isOpen ? "animate-bar2" : ""}`}></span>
            <span className={`bar ${isOpen ? "animate-bar3" : ""}`}></span>
          </div>

        </div>
      </nav>

      {/* 🔐 Admin Passcode Modal */}
      {showModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔐</div>
            <h3 style={modalStyles.title}>Admin Access</h3>
            <p style={modalStyles.subtitle}>Enter your passcode to continue</p>
            <input
              type="password"
              placeholder="••••"
              style={modalStyles.input}
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePasscodeSubmit()}
              autoFocus
            />
            {error && <p style={modalStyles.error}>{error}</p>}
            <div style={modalStyles.btnRow}>
              <button style={modalStyles.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
              <button style={modalStyles.confirmBtn} onClick={handlePasscodeSubmit}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;