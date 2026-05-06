import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import Footer from './Footer';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const img_url = "https://vanessawambui.alwaysdata.net/static/images/";

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product_cost * item.quantity), 0);

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
    payBtn: { backgroundColor: '#f5c518', color: '#000', border: 'none', borderRadius: '8px', padding: '16px', width: '100%', fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginTop: '30px' },
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

          {/* RIGHT: Summary */}
          <div style={styles.summaryCard}>
            <h3 style={styles.summaryTitle}>Summary</h3>
            <div style={styles.summaryRow}>
              <p style={styles.summaryLabel}>Subtotal ({cartItems.length} items)</p>
              <p style={styles.summaryValue}>KES {subtotal.toLocaleString()}</p>
            </div>
            <div style={styles.totalRow}>
              <p style={styles.summaryLabel} className='fw-bold'>Total</p>
              <p style={styles.totalValue}>KES {subtotal.toLocaleString()}</p>
            </div>
            
            <button 
              style={styles.payBtn}
              onMouseOver={(e) => e.target.style.backgroundColor = '#e6b800'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#f5c518'}
              // Note: If paying for multiple items at once, you'll need to adjust your backend API to accept an array of products. 
              // For now, this links back to the single M-Pesa payment flow.
              onClick={() => alert("To pay for all items, your backend API needs to accept a cart array. For now, buy items individually.")}
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