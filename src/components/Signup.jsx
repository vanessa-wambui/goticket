import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Signup = () => {
  // initialize the hooks
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // define the three states of our app
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // function that will handle the submit action
  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading("Please wait as registration is in progress...");

    try {
      const formdata = new FormData();
      formdata.append("username", username);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("phone", phone);

      const response = await axios.post(
        "https://vanessawambui.alwaysdata.net/api/signup",
        formdata
      );

      setLoading("");
      setSuccess("User registered successfully");
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");

      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      setLoading("");
      setError(error.message);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        .gt-auth-page {
          min-height: 100vh;
          background: #0d1117;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          padding: 2rem 1rem;
        }

        .gt-auth-card {
          background: #161b27;
          border-radius: 16px;
          padding: 2.25rem 2rem;
          width: 100%;
          max-width: 440px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
        }

        /* Logo */
        .gt-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 1.75rem;
        }
        .gt-logo-icon {
          width: 42px;
          height: 42px;
          background: #facc15;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }
        .gt-logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.5px;
        }
        .gt-logo-text span { color: #facc15; }

        /* Tab toggle */
        .gt-tabs {
          display: flex;
          background: #0d1117;
          border-radius: 10px;
          padding: 4px;
          margin-bottom: 1.75rem;
        }
        .gt-tab {
          flex: 1;
          padding: 0.55rem;
          text-align: center;
          font-size: 0.88rem;
          font-weight: 500;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          display: block;
          transition: background 0.2s, color 0.2s;
        }
        .gt-tab.active {
          background: #1e2535;
          color: #facc15;
        }
        .gt-tab.inactive {
          background: transparent;
          color: #6b7280;
        }
        .gt-tab.inactive:hover { color: #9ca3af; }

        /* Feedback messages */
        .gt-msg {
          font-size: 0.82rem;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          display: none;
        }
        .gt-msg.show { display: block; }
        .gt-msg.loading { background: rgba(59,130,246,0.12); color: #60a5fa; }
        .gt-msg.success { background: rgba(34,197,94,0.12);  color: #4ade80; }
        .gt-msg.error   { background: rgba(239,68,68,0.12);  color: #f87171; }

        /* Form fields */
        .gt-field { margin-bottom: 1.1rem; }
        .gt-field label {
          display: block;
          font-size: 0.83rem;
          color: #d1d5db;
          margin-bottom: 0.35rem;
          font-weight: 500;
        }
        .gt-field input {
          width: 100%;
          background: #0d1117;
          border: 1.5px solid #2a3040;
          border-radius: 8px;
          padding: 0.65rem 0.85rem;
          color: #f0f0f0;
          font-size: 0.88rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .gt-field input:focus { border-color: #facc15; }
        .gt-field input::placeholder { color: #4b5563; }

        /* Submit button */
        .gt-submit {
          width: 100%;
          padding: 0.8rem;
          background: #facc15;
          color: #0b0f1a;
          font-size: 0.95rem;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          margin-top: 0.5rem;
          transition: background 0.2s, transform 0.15s;
        }
        .gt-submit:hover  { background: #eab308; transform: translateY(-1px); }
        .gt-submit:active { transform: translateY(0); }

        /* Sign in link */
        .gt-signin-row {
          text-align: center;
          margin-top: 1.4rem;
          font-size: 0.84rem;
          color: #6b7280;
        }
        .gt-signin-row a {
          color: #facc15;
          font-weight: 500;
          text-decoration: none;
          margin-left: 4px;
        }
        .gt-signin-row a:hover { text-decoration: underline; }
      `}</style>

      <div className="gt-auth-page">
        <div className="gt-auth-card">

          {/* Logo */}
          <div className="gt-logo">
            <div className="gt-logo-icon">🎟</div>
            <div className="gt-logo-text">Go<span>Ticket</span></div>
          </div>

          {/* Sign In / Sign Up tabs — Sign In navigates to /signin */}
          <div className="gt-tabs">
            <Link className="gt-tab inactive" to="/signin">Sign In</Link>
            <span className="gt-tab active">Sign Up</span>
          </div>

          {/* Feedback messages — same hooks, new look */}
          <div className={`gt-msg loading ${loading ? "show" : ""}`}>{loading}</div>
          <div className={`gt-msg success ${success ? "show" : ""}`}>{success}</div>
          <div className={`gt-msg error   ${error   ? "show" : ""}`}>{error}</div>

          {/* Form — all hooks and handlers untouched */}
          <form onSubmit={handlesubmit}>

            <div className="gt-field">
              <label htmlFor="gt-username">Full Name</label>
              <input
                id="gt-username"
                type="text"
                placeholder="Enter your full name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="gt-field">
              <label htmlFor="gt-email">Email</label>
              <input
                id="gt-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="gt-field">
              <label htmlFor="gt-password">Password</label>
              <input
                id="gt-password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="gt-field">
              <label htmlFor="gt-phone">Mobile Number</label>
              <input
                id="gt-phone"
                type="number"
                placeholder="e.g. 0712 345 678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="gt-submit">Create Account</button>

          </form>

          {/* Navigate to signin */}
          <p className="gt-signin-row">
            Already have an account?
            <Link to="/signin">Sign In</Link>
          </p>

        </div>

        <Footer />
      </div>
    </>
  );
};

export default Signup;