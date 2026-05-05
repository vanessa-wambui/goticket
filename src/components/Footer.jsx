import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: '#111',
      color: '#fff',
      padding: '60px 0 30px',
      marginTop: '50px'
    },
    logo: {
      fontSize: '26px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#f5c518',
      letterSpacing: '1px'
    },
    tagline: {
      color: '#aaa',
      marginBottom: '0',
      maxWidth: '300px',
      fontSize: '13px',
      lineHeight: '1.7'
    },
    heading: {
      marginBottom: '16px',
      fontWeight: '600',
      fontSize: '15px',
      color: '#f5c518',
      letterSpacing: '0.5px'
    },
    contactRow: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
      marginBottom: '14px',
      color: '#ccc',
      fontSize: '14px',
      lineHeight: '1.5'
    },
    contactIcon: {
      color: '#f5c518',
      flexShrink: 0,
      marginTop: '2px'
    },
    contactLink: {
      color: '#ccc',
      textDecoration: 'none',
      transition: 'color 0.3s ease'
    },
    socialIcon: {
      color: '#fff',
      fontSize: '20px',
      marginRight: '20px',
      textDecoration: 'none',
      transition: 'color 0.3s ease'
    },
    copyright: {
      color: '#888',
      fontSize: '14px'
    },
    divider: {
      width: '36px',
      height: '2px',
      background: '#f5c518',
      marginBottom: '16px',
      borderRadius: '2px'
    }
  }

  return (
    <footer style={styles.footer}>
      <div className="container">
        <div className="row">

          {/* Logo + Company Profile */}
          <div className="col-md-4 mb-4">
            <h5 style={styles.logo}>GoTicket</h5>
            <div style={styles.divider} />
            <p style={styles.tagline}>
              GoTicket is Kenya's premier event ticketing platform, connecting people to the moments that matter most. From concerts and sports to movies and travel, we make booking seamless, secure, and instant — so you never miss out on what's happening around you.
            </p>
          </div>

          {/* Contact Details */}
          <div className="col-md-4 mb-4">
            <h6 style={styles.heading}>Contact Us</h6>
            <div style={styles.divider} />

            {/* Email */}
            <div style={styles.contactRow}>
              <span style={styles.contactIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </span>
              <a href="mailto:goticket@gmail.com" style={styles.contactLink}
                onMouseEnter={e => e.currentTarget.style.color = '#f5c518'}
                onMouseLeave={e => e.currentTarget.style.color = '#ccc'}>
                goticket@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div style={styles.contactRow}>
              <span style={styles.contactIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"/>
                </svg>
              </span>
              <a href="tel:+25468159179" style={styles.contactLink}
                onMouseEnter={e => e.currentTarget.style.color = '#f5c518'}
                onMouseLeave={e => e.currentTarget.style.color = '#ccc'}>
                +254 681 59179
              </a>
            </div>

            {/* Location */}
            <div style={styles.contactRow}>
              <span style={styles.contactIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/>
                </svg>
              </span>
              <span>Westlands, Nairobi, Kenya</span>
            </div>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-4">
            <h6 style={styles.heading}>Connect With Us</h6>
            <div style={styles.divider} />
            <p style={{ color: '#aaa', fontSize: '13px', marginBottom: '20px' }}>
              Stay updated with the latest events, offers and announcements on our social media pages.
            </p>
            <div>

              {/* Twitter / X */}
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialIcon}
                title="Follow us on Twitter"
                onMouseEnter={e => e.currentTarget.style.color = '#1DA1F2'}
                onMouseLeave={e => e.currentTarget.style.color = '#fff'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialIcon}
                title="Follow us on Instagram"
                onMouseEnter={e => e.currentTarget.style.color = '#E1306C'}
                onMouseLeave={e => e.currentTarget.style.color = '#fff'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialIcon}
                title="Follow us on Facebook"
                onMouseEnter={e => e.currentTarget.style.color = '#1877F2'}
                onMouseLeave={e => e.currentTarget.style.color = '#fff'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

            </div>
          </div>

        </div>

        <hr style={{ borderColor: '#2a2a2a', marginTop: '40px', marginBottom: '20px' }} />

        <p className="text-center mb-0" style={styles.copyright}>
          © {new Date().getFullYear()} GoTicket. All rights reserved. | Westlands, Nairobi, Kenya
        </p>
      </div>
    </footer>
  )
}

export default Footer;