import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Mycarousel from './Mycarousel';
import { useCart } from './CartContext'; // <-- IMPORT CONTEXT

const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addToCart } = useCart(); // <-- HOOK INTO CART

  const navigate = useNavigate();
  const img_url = "https://vanessawambui.alwaysdata.net/static/images/";

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://vanessawambui.alwaysdata.net/api/getproducts");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const styles = {
    pageBg: { backgroundColor: '#0d0d0d', minHeight: '100vh' },
    container: { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' },
    heading: { color: '#fff', fontSize: '32px', fontWeight: '700', marginBottom: '30px' },
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
    btnSecondary: { backgroundColor: 'transparent', color: '#f5c518', border: '1px solid #f5c518', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', letterSpacing: '0.5px' }
  };

  return (
    <div style={styles.pageBg}>
      <Mycarousel />
      <div style={styles.container}>
        <h3 style={styles.heading}>Available Products</h3>
        {loading && <Loader />}
        <h4 style={styles.error}>{error}</h4>

        <div style={styles.grid}>
          {products.map((product) => (
            <div style={styles.card} key={product.id}
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
                <img src={img_url + product.product_photo} alt={product.product_name} style={styles.img} />
                <div style={styles.gradient}></div>
              </div>
              <div style={styles.cardBody}>
                <h5 style={styles.title}>{product.product_name}</h5>
                <p style={styles.desc}>{product.product_description.slice(0, 100)}...</p>
                <div style={styles.bottomRow}>
                  <h4 style={styles.price}>KES {product.product_cost}</h4>
                  <div style={styles.btnGroup}>
                    {/* NEW ADD TO CART BUTTON */}
                    <button style={styles.btnSecondary} onClick={() => addToCart(product)}>Add to Cart</button>
                    
                    <button style={styles.btnPrimary} onClick={() => navigate("/makepayment", { state: { product } })}>
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
    </div>
  );
};

export default Getproducts;