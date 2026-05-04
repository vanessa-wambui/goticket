import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from './Loader'
import axios from 'axios'

const Makepayment = () => {

  const { product } = useLocation().state || {}
  const navigate = useNavigate()
  const img_url = "https://vanessawambui.alwaysdata.net/static/images/"

  // Original Hooks
  const [number, setNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  // New Hook for Ticket Count
  const [ticketCount, setTicketCount] = useState(1)
  
  // Calculate total cost dynamically
  const totalCost = ticketCount * product.product_cost

  const handlesubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formdata = new FormData()
      formdata.append("phone", number)
      // Send the dynamically calculated total cost instead of the base price
      formdata.append("amount", totalCost) 

      const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/mpesa_payment", formdata)

      setLoading(false)
      setSuccess(response.data.message)
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  // --- CINEMATIC THEME STYLES ---
  const styles = {
    pageBg: {
      backgroundColor: '#0d0d0d',
      minHeight: '100vh',
      padding: '40px 20px'
    },
    container: {
      maxWidth: '900px',
      margin: '0 auto'
    },
    backBtn: {
      backgroundColor: '#1a1a1a',
      border: '1px solid #2a2a2a',
      color: '#fff',
      borderRadius: '50%',
      width: '45px',
      height: '45px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '20px',
      marginBottom: '30px',
      transition: 'border-color 0.3s ease'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 0.8fr',
      gap: '30px',
      alignItems: 'start'
    },
    card: {
      backgroundColor: '#1a1a1a',
      borderRadius: '16px',
      border: '1px solid #2a2a2a',
      padding: '24px'
    },
    img: {
      width: '100%',
      height: '220px',
      objectFit: 'cover',
      borderRadius: '12px',
      marginBottom: '20px'
    },
    productTitle: {
      color: '#fff',
      fontSize: '22px',
      fontWeight: '700',
      margin: '0 0 8px 0'
    },
    productDesc: {
      color: '#888',
      fontSize: '14px',
      margin: '0 0 16px 0'
    },
    basePrice: {
      color: '#aaa',
      fontSize: '16px',
      margin: '0 0 20px 0'
    },
    counterContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      borderTop: '1px solid #2a2a2a',
      paddingTop: '20px'
    },
    counterBtn: {
      backgroundColor: '#2a2a2a',
      border: '1px solid #333',
      color: '#fff',
      width: '36px',
      height: '36px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '18px',
      fontWeight: 'bold'
    },
    countText: {
      color: '#fff',
      fontSize: '18px',
      fontWeight: '600',
      minWidth: '20px',
      textAlign: 'center'
    },
    // Right Side (Summary) Styles
    summaryTitle: {
      color: '#fff',
      fontSize: '20px',
      fontWeight: '600',
      margin: '0 0 30px 0',
      paddingBottom: '15px',
      borderBottom: '1px solid #2a2a2a'
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '15px'
    },
    summaryLabel: {
      color: '#888',
      fontSize: '15px',
      margin: '0'
    },
    summaryValue: {
      color: '#fff',
      fontSize: '15px',
      fontWeight: '600',
      margin: '0'
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
      paddingTop: '20px',
      borderTop: '1px solid #2a2a2a'
    },
    totalValue: {
      color: '#f5c518',
      fontSize: '22px',
      fontWeight: '800',
      margin: '0'
    },
    inputLabel: {
      color: '#888',
      fontSize: '12px',
      fontWeight: '600',
      letterSpacing: '1px',
      display: 'block',
      marginBottom: '8px',
      marginTop: '30px'
    },
    input: {
      backgroundColor: '#2a2a2a',
      border: '1px solid #3a3a3a',
      color: '#fff',
      borderRadius: '8px',
      padding: '14px 16px',
      width: '100%',
      fontSize: '16px',
      outline: 'none'
    },
    payBtn: {
      backgroundColor: '#f5c518',
      color: '#000',
      border: 'none',
      borderRadius: '8px',
      padding: '16px',
      width: '100%',
      fontSize: '16px',
      fontWeight: '700',
      cursor: 'pointer',
      marginTop: '20px',
      letterSpacing: '0.5px'
    },
    successMsg: {
      color: '#4caf50',
      fontSize: '14px',
      textAlign: 'center',
      marginTop: '15px',
      marginBottom: '0'
    },
    errorMsg: {
      color: '#f44336',
      fontSize: '14px',
      textAlign: 'center',
      marginTop: '15px',
      marginBottom: '0'
    }
  }

  return (
    <div style={styles.pageBg}>
      <div style={styles.container}>
        
        {/* Back Button Only */}
        <button 
          style={styles.backBtn}
          onClick={() => navigate("/")}
          onMouseOver={(e) => e.target.style.borderColor = '#f5c518'}
          onMouseOut={(e) => e.target.style.borderColor = '#2a2a2a'}
        >
          ←
        </button>

        {loading && <Loader />}
        {success && <h4 style={styles.successMsg}>{success}</h4>}
        {error && <h4 style={styles.errorMsg}>{error}</h4>}

        <div style={styles.grid}>
          
          {/* LEFT: Product Details & Counter */}
          <div style={styles.card}>
            <img 
              src={img_url + product.product_photo} 
              alt={product.product_name} 
              style={styles.img} 
            />
            <h3 style={styles.productTitle}>{product.product_name}</h3>
            <p style={styles.productDesc}>{product.product_description}</p>
            <p style={styles.basePrice}>KES {product.product_cost} / ticket</p>

            {/* Ticket Counter */}
            <div style={styles.counterContainer}>
              <button 
                style={styles.counterBtn}
                onClick={() => setTicketCount(prev => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span style={styles.countText}>{ticketCount}</span>
              <button 
                style={styles.counterBtn}
                onClick={() => setTicketCount(prev => prev + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* RIGHT: Summary & Payment */}
          <div style={styles.card}>
            <h3 style={styles.summaryTitle}>Summary</h3>
            
            <div style={styles.summaryRow}>
              <p style={styles.summaryLabel}>Subtotal ({ticketCount} items)</p>
              <p style={styles.summaryValue}>KES {totalCost.toLocaleString()}</p>
            </div>
            
            <div style={styles.totalRow}>
              <p style={styles.summaryLabel} className='fw-bold'>Total</p>
              <p style={styles.totalValue}>KES {totalCost.toLocaleString()}</p>
            </div>

            <form onSubmit={handlesubmit}>
              <label style={styles.inputLabel}>M-PESA NUMBER</label>
              <input 
                type="tel"
                placeholder="0712 345 678"
                style={styles.input}
                required
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                onFocus={(e) => e.target.style.borderColor = '#f5c518'}
                onBlur={(e) => e.target.style.borderColor = '#3a3a3a'}
              />

              <button 
                type="submit" 
                style={styles.payBtn}
                onMouseOver={(e) => e.target.style.backgroundColor = '#e6b800'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#f5c518'}
              >
                Pay with M-Pesa
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Makepayment;