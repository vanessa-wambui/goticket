import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Additem = () => {
  // introduce the hooks
  const [item_name, setItemName] = useState("");
  const [item_description, setItemDescription] = useState("");
  const [item_cost, setItemCost] = useState("");
  const [item_photo, setItemPhoto] = useState("");

  // declare the status hooks
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // create the handlesubmit
  const handlesubmit = async (e) => {
    e.preventDefault()

    // activate the loading hook
    setLoading(true)

    try {
      const formdata = new FormData()

      formdata.append("item_name", item_name)
      formdata.append("item_description", item_description)
      formdata.append("item_cost", item_cost)
      formdata.append("item_photo", item_photo)

      // interact with axios — ✅ changed URL to add_item endpoint
      const response = await axios.post("https://vanessawambui.alwaysdata.net/api/add_item", formdata)

      // set loading to default
      setLoading(false)

      // update the success hook with a message
      setSuccess(response.data.message)

      // clear the hooks
      setItemName("");
      setItemDescription("");
      setItemCost("");
      setItemPhoto("");

      e.target.reset()

      // ✅ redirect to shop page after 1.5 seconds
      setTimeout(() => {
        navigate("/shop")
      }, 1500)

    }
    catch (error) {
      // set loading to default
      setLoading(false)
      // update the setError with a message
      setError(error.message)

    }

  }

  const styles = {
    pageBackground: {
      minHeight: '100vh',
      backgroundColor: '#0d0d0d',
      padding: '40px 20px'
    },
    cardContainer: {
      backgroundColor: '#1a1a1a',
      borderRadius: '16px',
      padding: '40px',
      maxWidth: '500px',
      margin: '0 auto',
      border: '1px solid #2a2a2a'
    },
    logoContainer: {
      textAlign: 'center',
      marginBottom: '10px'
    },
    logoText: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#fff',
      margin: 0
    },
    logoHighlight: {
      color: '#f5c518'
    },
    subtitle: {
      color: '#888',
      fontSize: '14px',
      textAlign: 'center',
      marginBottom: '30px',
      marginTop: '6px'
    },
    input: {
      backgroundColor: '#2a2a2a',
      border: '1px solid #3a3a3a',
      color: '#fff',
      borderRadius: '8px',
      padding: '12px 16px',
      width: '100%',
      fontSize: '14px',
      transition: 'border-color 0.3s ease'
    },
    label: {
      color: '#aaa',
      fontSize: '14px',
      marginBottom: '8px',
      display: 'block'
    },
    submitBtn: {
      backgroundColor: '#f5c518',
      color: '#000',
      border: 'none',
      borderRadius: '8px',
      padding: '12px',
      width: '100%',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    },
    successMsg: {
      color: '#4caf50',
      fontSize: '14px',
      textAlign: 'center',
      marginBottom: '15px'
    },
    errorMsg: {
      color: '#f44336',
      fontSize: '14px',
      textAlign: 'center',
      marginBottom: '15px'
    },
    backLink: {
      display: 'block',
      textAlign: 'center',
      color: '#888',
      fontSize: '13px',
      marginTop: '20px',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'color 0.3s ease'
    }
  }

  return (
    <div style={styles.pageBackground}>
      <div style={styles.cardContainer}>

        {/* GoTicket Logo */}
        <div style={styles.logoContainer}>
          <h2 style={styles.logoText}>
            Go<span style={styles.logoHighlight}>Ticket</span>
          </h2>
          <p style={styles.subtitle}>Add new item to the shop</p>
        </div>

        {/* bind the loading hook */}
        {loading && <Loader />}

        {success && <h5 style={styles.successMsg}>✅ {success}</h5>}
        {error && <h5 style={styles.errorMsg}>❌ {error}</h5>}

        <form onSubmit={handlesubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={styles.label}>Item Name</label>
            <input
              type="text"
              placeholder='Enter the item name'
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#f5c518'}
              onBlur={(e) => e.target.style.borderColor = '#3a3a3a'}
              required
              value={item_name}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={styles.label}>Item Description</label>
            <input
              type="text"
              placeholder='Enter the item description'
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#f5c518'}
              onBlur={(e) => e.target.style.borderColor = '#3a3a3a'}
              required
              value={item_description}
              onChange={(e) => setItemDescription(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={styles.label}>Item Price</label>
            <input
              type="number"
              placeholder='Enter the price of item'
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#f5c518'}
              onBlur={(e) => e.target.style.borderColor = '#3a3a3a'}
              required
              value={item_cost}
              onChange={(e) => setItemCost(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={styles.label}>Item Photo</label>
            <input
              type="file"
              style={{ ...styles.input, padding: '10px 16px' }}
              required
              accept='image/*'
              onChange={(e) => setItemPhoto(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            style={styles.submitBtn}
            onMouseOver={(e) => e.target.style.backgroundColor = '#e6b800'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#f5c518'}
          >
            Add Shop Item
          </button>
        </form>

        {/* Back to shop link */}
        <span
          style={styles.backLink}
          onClick={() => navigate("/shop")}
          onMouseOver={(e) => e.target.style.color = '#f5c518'}
          onMouseOut={(e) => e.target.style.color = '#888'}
        >
          ← Back to Shop
        </span>

      </div>
    </div>
  )
}

export default Additem;