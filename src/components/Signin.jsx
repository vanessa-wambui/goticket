import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Signin = () => {

  // define the two hooks for storing the users input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // declare the hooks
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // useNavigate hook to direct us to a new page
  const navigate = useNavigate()

  // function to handle the signin action
  const handlesubmit = async (e) => {
    e.preventDefault()
    setLoading("Please wait while we authenticate your account...")
    try {
      const formdata = new FormData()
      formdata.append("email", email)
      formdata.append("password", password)
      const response = await axios.post("https://vanessawambui.alwaysdata.net/api/signin", formdata);
      setLoading("");
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      } else {
        setError("Login failed. Please try again")
      }
    } catch (error) {
      setLoading("");
      setError("Oops something went wrong...")
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap');

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
          padding: 2.5rem 2.25rem;
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
          margin-bottom: 2rem;
        }
        .gt-logo-icon {
          width: 44px;
          height: 44px;
          background: #facc15;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
        }
        .gt-logo-text {
          font-size: 1.6rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.5px;
        }
        .gt-logo-text span {
          color: #facc15;
        }

        /* Tab toggle */
        .gt-tabs {
          display: flex;
          background: #0d1117;
          border-radius: 10px;
          padding: 4px;
          margin-bottom: 2rem;
        }
        .gt-tab {
          flex: 1;
          padding: 0.6rem;
          text-align: center;
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          text-decoration: none;
          display: block;
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
        .gt-msg.success { background: rgba(34,197,94,0.12); color: #4ade80; }
        .gt-msg.error   { background: rgba(239,68,68,0.12);  color: #f87171; }

        /* Form fields */
        .gt-field {
          margin-bottom: 1.25rem;
        }
        .gt-field label {
          display: block;
          font-size: 0.85rem;
          color: #d1d5db;
          margin-bottom: 0.4rem;
          font-weight: 500;
        }
        .gt-field input {
          width: 100%;
          background: #0d1117;
          border: 1.5px solid #2a3040;
          border-radius: 8px;
          padding: 0.7rem 0.9rem;
          color: #f0f0f0;
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .gt-field input:focus {
          border-color: #facc15;
        }
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
        .gt-submit:hover { background: #eab308; transform: translateY(-1px); }
        .gt-submit:active { transform: translateY(0); }

        /* Signup link */
        .gt-signup-row {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.85rem;
          color: #6b7280;
        }
        .gt-signup-row a {
          color: #facc15;
          font-weight: 500;
          text-decoration: none;
          margin-left: 4px;
        }
        .gt-signup-row a:hover { text-decoration: underline; }
      `}</style>

      <div className="gt-auth-page">
        <div className="gt-auth-card">

          {/* Logo */}
          <div className="gt-logo">
            <div className="gt-logo-icon">🎟</div>
            <div className="gt-logo-text">Go<span>Ticket</span></div>
          </div>

          {/* Sign In / Sign Up tabs */}
          <div className="gt-tabs">
            <span className="gt-tab active">Sign In</span>
            <Link className="gt-tab inactive" to="/signup">Sign Up</Link>
          </div>

          {/* Feedback messages — same hooks, new look */}
          <div className={`gt-msg loading ${loading ? 'show' : ''}`}>{loading}</div>
          <div className={`gt-msg success ${success ? 'show' : ''}`}>{success}</div>
          <div className={`gt-msg error   ${error   ? 'show' : ''}`}>{error}</div>

          {/* Form — same onSubmit, same onChange handlers */}
          <form onSubmit={handlesubmit}>

            <div className="gt-field">
              <label htmlFor="gt-email">Email</label>
              <input
                id="gt-email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="gt-field">
              <label htmlFor="gt-password">Password</label>
              <input
                id="gt-password"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="gt-submit">Sign In</button>

          </form>

          {/* Navigate to signup */}
          <p className="gt-signup-row">
            Don't have an account?
            <Link to="/signup">Sign Up</Link>
          </p>

        </div>

        <Footer />
      </div>
    </>
  )
}

export default Signin;