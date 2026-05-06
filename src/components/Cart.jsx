import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import Footer from './Footer';
import axios from 'axios';
import Loader from './Loader';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const img_url = "https://vanessawambui.alwaysdata.net/static/images/";

  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product_cost * item.quantity), 0);

  const handlePayment = async () => {
    if (!number) {
      setError("Please enter your M-Pesa number.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setError("Please log in to complete your purchase.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Step 1: Trigger M-Pesa payment for total amount
      const formdata = new FormData();
      formdata.append("phone", number);
      formdata.append("amount", subtotal);

      const response = await axios.post(
        "https://vanessawambui.alwaysdata.net/api/mpesa_payment",
        formdata
      );

      // Step 2: Book a ticket for each cart item
      for (const item of cartItems) {
        const ticketData = new FormData();
        ticketData.append("user_id", user.user_id);
        ticketData.append("product_id", item.product_id);
        ticketData.append("product_name", item.product_name);
        ticketData.append("product_date", item.product_date || "");
        ticketData.append("amount_paid", item.product_cost * item.quantity);
        ticketData.append("phone", number);
        ticketData.append("quantity", item.quantity);

        await axios.post(
          "https://vanessawambui.alwaysdata.net/api/book_ticket",
          ticketData
        );
      }

      setLoading(false);
      setSuccess(response.data.message);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const styles = {
    pageBg: { backgroundColor: '#0d0d0d', minHeight: '100vh', padding: '40px 20px' },
    container: { maxWidth: '900px', margin: '0 auto' },
    header: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' },
    backBtn: { backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', color: '#fff', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '20px' },
    title: { color: '#fff', fontSize: '32px', fontWeight: '700', margin: '0' },
    grid: { display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px', alignItems: 'start' },
    card: { backgroundColor: '#1a1a1a', borderRadius: '16px', border: '1px solid #2a2a2a', padding: '24px', marginBottom: '20px' },
    itemFlex: { display: 'flex', gap: '20px' },
    img: { width: '120px', height: '100px', objectFit: 'cover', borderRadius: '8px' },
    itemDetails: { flex: '1' },
    itemTitle: { color: '#fff', fontSize: '18px', fontWeight: '600', margin: '0 0 8px 0' },
    itemBasePrice: { color: '#888', fontSize: '14px', margin: '0 0 15px 0' },
    counterContainer: { display: 'flex', alignItems: 'center', gap: '15px' },
    counterBtn: { backgroundColor: '#2a2a2a', border: '1px solid #333', color: '#fff', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px' },
    countText: { color: '#fff', fontSize: '16px', fontWeight: '600', minWidth: '20px', textAlign: 'center' },
    deleteBtn: { background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '14px', marginTop: '10px' },
    summaryCard: { backgroundColor: '#1a1a1a', borderRadius: '16px', border: '1px solid #2a2a2a', padding: '30px', position: 'sticky', top: '100px' },
    summaryTitle: { color: '#fff', fontSize: '20px', fontWeight: '600', margin: '0 0 30px 0', paddingBottom: '15px', borderBottom: '1px solid #2a2a2a' },
    summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px' },
    summaryLabel: { color: '#888', fontSize: '15px', margin: '0' },
    summaryValue: { color: '#fff', fontSize: '15px', fontWeight: '600', margin: '0' },
    totalRow: { display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #2a2a2a' },
    totalValue: { color: '#f5c518', fontSize: '24px', fontWeight: '800', margin: '0' },
    inputLabel: { color: '#888', fontSize: '12px', fontWeight: '600', letterSpacing: '1px', display: 'block', marginBottom: '8px', marginTop: '24px' },
    input: { backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a', color: '#fff', borderRadius: '8px', padding: '14px 16px', width: '100%', fontSize: '16px', outline: 'none', boxSizing: 'border-box' },
    payBtn: { backgroundColor: '#f5c518', color: '#000', border: 'none', borderRadius: '8px', padding: '16px', width: '100%', fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginTop: '20px' },
    successMsg: { color: '#4caf50', fontSize: '14px', textAlign: 'center', marginTop: '15px', marginBottom: '0' },
    errorMsg: { color: '#f44336', fontSize: '14px', textAlign: 'center', marginTop: '15px', marginBottom: '0' },
    emptyMsg: { color: '#888', textAlign: 'center', marginTop: '50px', fontSize: '18px' }
  };

  if (cartItems.length === 0) {
    return (
      <div style={styles.pageBg}>
        <div style={styles.container}>
          <div style={styles.header}>
            <button style={styles.backBtn} onClick={() => navigate("/")}>←</button>
            <h1 style={styles.title}>Your Cart</h1>
          </div>
          <p style={styles.emptyMsg}>Your cart is currently empty.</p>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageBg}>
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backBtn} onClick={() => navigate("/")}>←</button>
          <h1 style={styles.title}>Your Cart</h1>
        </div>

        {loading && <Loader />}

        <div style={styles.grid}>
          {/* LEFT: Cart Items */}
          <div>
            {cartItems.map((item) => (
              <div style={styles.card} key={item.uniqueId}>
                <div style={styles.itemFlex}>
                  <img src={img_url + item.product_photo} alt={item.product_name} style={styles.img} />
                  <div style={styles.itemDetails}>
                    <h3 style={styles.itemTitle}>{item.product_name}</h3>
                    <p style={styles.itemBasePrice}>KES {item.product_cost} / ticket</p>
                    <div style={styles.counterContainer}>
                      <button style={styles.counterBtn} onClick={() => updateQuantity(item.uniqueId, item.quantity - 1)}>-</button>
                      <span style={styles.countText}>{item.quantity}</span>
                      <button style={styles.counterBtn} onClick={() => updateQuantity(item.uniqueId, item.quantity + 1)}>+</button>
                    </div>
                    <button style={styles.deleteBtn} onClick={() => removeFromCart(item.uniqueId)}>Remove Item</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Summary + Payment */}
          <div style={styles.summaryCard}>
            <h3 style={styles.summaryTitle}>Summary</h3>

            <div style={styles.summaryRow}>
              <p style={styles.summaryLabel}>Subtotal ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})</p>
              <p style={styles.summaryValue}>KES {subtotal.toLocaleString()}</p>
            </div>

            <div style={styles.totalRow}>
              <p style={styles.summaryLabel} className='fw-bold'>Total</p>
              <p style={styles.totalValue}>KES {subtotal.toLocaleString()}</p>
            </div>

            {/* M-Pesa Input */}
            <label style={styles.inputLabel}>M-PESA NUMBER</label>
            <input
              type="tel"
              placeholder="0712 345 678"
              style={styles.input}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#f5c518'}
              onBlur={(e) => e.target.style.borderColor = '#3a3a3a'}
            />

            {success && <p style={styles.successMsg}>{success}</p>}
            {error && <p style={styles.errorMsg}>{error}</p>}

            <button
              style={styles.payBtn}
              onMouseOver={(e) => e.target.style.backgroundColor = '#e6b800'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#f5c518'}
              onClick={handlePayment}
            >
              Pay with M-Pesa
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;