import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { useCart } from './CartContext';
import Chatbot from './Chatbot';

const Shop = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const { addToCart } = useCart();

  const navigate = useNavigate();
  const img_url = "https://vanessawambui.alwaysdata.net/static/images/";

  const fetchItems = async () => {
    try {
      setLoading(true);
      // ✅ Changed URL to get_item endpoint
      const response = await axios.get("https://vanessawambui.alwaysdata.net/api/get_item");
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const styles = {
    pageBg: { backgroundColor: '#0d0d0d', minHeight: '100vh' },
    container: { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' },
    heading: { color: '#fff', fontSize: '32px', fontWeight: '700', marginBottom: '10px' },
    subheading: { color: '#888', fontSize: '16px', fontWeight: '400', marginBottom: '30px' },
    error: { color: '#ff4d4d', textAlign: 'center' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' },
    card: { backgroundColor: '#1a1a1a', borderRadius: '16px', overflow: 'hidden', border: '1px solid #2a2a2a', transition: 'transform 0.4s ease, box-shadow 0.4s ease', display: 'flex', flexDirection: 'column' },
    imgWrapper: { position: 'relative', width: '100%', height: '320px', overflow: 'hidden' },
    img: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' },
    gradient: { position: 'absolute', bottom: '0', left: '0', right: '0', height: '60%', background: 'linear-gradient(to top, #1a1a1a 0%, rgba(26,26,26,0.8) 40%, transparent 100%)', pointerEvents: 'none' },
    cardBody: { padding: '20px 24px 24px', marginTop: '-40px', position: 'relative', zIndex: '2', flex: '1', display: 'flex', flexDirection: 'column' },
    title: { color: '#fff', fontSize: '20px', fontWeight: '700', margin: '0 0 8px 0', lineHeight: '1.3' },
    desc: { color: '#888', fontSize: '14px', lineHeight: '1.5', margin: '0 0 20px 0', flex: '1' },
    bottomRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    price: { color: '#f5c518', fontSize: '22px', fontWeight: '800', margin: '0' },
    btnGroup: { display: 'flex', gap: '10px' },
    btnPrimary: { backgroundColor: '#f5c518', color: '#000', border: 'none', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', letterSpacing: '0.5px' },
    btnSecondary: { backgroundColor: 'transparent', color: '#f5c518', border: '1px solid #f5c518', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', letterSpacing: '0.5px' },
    badge: { backgroundColor: 'rgba(245,197,24,0.15)', color: '#f5c518', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px', letterSpacing: '0.5px' },
    emptyState: { textAlign: 'center', padding: '80px 20px' },
    emptyIcon: { fontSize: '64px', marginBottom: '20px' },
    emptyText: { color: '#888', fontSize: '18px', marginBottom: '8px' },
    emptySub: { color: '#555', fontSize: '14px' },
    floatingBtn: {
      position: 'fixed', bottom: '24px', left: '24px',
      width: '58px', height: '58px', borderRadius: '50%',
      background: 'linear-gradient(135deg, #F5C518, #D4A017)',
      border: 'none', cursor: 'pointer',
      boxShadow: '0 4px 20px rgba(245,197,24,0.5), 0 2px 8px rgba(0,0,0,0.4)',
      zIndex: 9998, display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontSize: '26px',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    pulseRing: {
      position: 'fixed', bottom: '24px', left: '24px',
      width: '58px', height: '58px', borderRadius: '50%',
      background: 'rgba(245,197,24,0.25)', zIndex: 9997,
      animation: 'pulseRing 2s ease-out infinite', pointerEvents: 'none',
    },
  };

  return (
    <div style={styles.pageBg}>
      <div style={styles.container}>
        
        {/* ─── Page Header ─── */}
        <h2 style={styles.heading}>🎟️ goTicket Shop</h2>
        <p style={styles.subheading}>Exclusive merchandise, accessories & more</p>

        {loading && <Loader />}
        <h4 style={styles.error}>{error}</h4>

        {/* ─── Empty State ─── */}
        {!loading && !error && items.length === 0 && (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🏪</div>
            <p style={styles.emptyText}>No items in the shop yet</p>
            <p style={styles.emptySub}>Check back soon for new arrivals!</p>
          </div>
        )}

        {/* ─── Items Grid ─── */}
        <div style={styles.grid}>
          {items.map((item) => (
            <div style={styles.card} key={item.item_id}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(245, 197, 24, 0.15)';
                e.currentTarget.querySelector('img').style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.querySelector('img').style.transform = 'scale(1)';
              }}>
              <div style={styles.imgWrapper}>
                <img src={img_url + item.item_photo} alt={item.item_name} style={styles.img} />
                <div style={styles.gradient}></div>
              </div>
              <div style={styles.cardBody}>
                <span style={styles.badge}>SHOP ITEM</span>
                <h5 style={styles.title}>{item.item_name}</h5>
                <p style={styles.desc}>
                  {item.item_description 
                    ? (item.item_description.length > 100 
                        ? item.item_description.slice(0, 100) + '...' 
                        : item.item_description)
                    : 'No description available'}
                </p>
                <div style={styles.bottomRow}>
                  <h4 style={styles.price}>KES {item.item_cost}</h4>
                  <div style={styles.btnGroup}>
                    <button style={styles.btnSecondary} onClick={() => addToCart(item)}>Add to Cart</button>
                    <button style={styles.btnPrimary} onClick={() => navigate("/makeorderpayment", { state: { item } })}>
  Buy Now
</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />

      {/* ─── Chatbot ─── */}
      {chatOpen && <Chatbot onClose={() => setChatOpen(false)} />}

      {/* ─── Floating Chat Button ─── */}
      <button
        onClick={() => setChatOpen((prev) => !prev)}
        title="Chat with goTicket Assistant"
        style={styles.floatingBtn}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(245,197,24,0.7), 0 2px 8px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(245,197,24,0.5), 0 2px 8px rgba(0,0,0,0.4)';
        }}
      >
        {chatOpen ? '✕' : '🎟️'}
      </button>

      {/* ─── Pulse ring (only when chat is closed) ─── */}
      {!chatOpen && <span style={styles.pulseRing} />}

      <style>{`
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(1.7); opacity: 0;   }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  );
};

export default Shop;