import React, { memo } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const SLIDES = [
  {
    id: 0,
    label: 'Live Tonight',
    heading: 'Concerts & Festivals',
    sub: "Front-row passes to Africa's biggest stages.",
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400&q=80',
    alt: 'Concert stage with lights',
  },
  {
    id: 1,
    label: 'Game Day',
    heading: 'Sports & Derby',
    sub: 'Catch every kick, every roar, every moment live.',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1400&q=80',
    alt: 'Sports stadium packed with fans',
  },
  {
    id: 2,
    label: 'Now Showing',
    heading: 'Movies & Premieres',
    sub: 'IMAX. Dolby. Opening night. Book your seat now.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1400&q=80',
    alt: 'Cinema interior with large screen',
  },
  {
    id: 3,
    label: 'Escape Awaits',
    heading: 'Travel & Getaways',
    sub: 'Coastal retreats and safari adventures — sorted.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80',
    alt: 'Scenic mountain travel destination',
  },
]

const Mycarousel = memo(() => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500&display=swap');

      .gt-carousel {
        position: relative;
        width: 100%;
        overflow: hidden;
        background: #0b0f1a;
      }

      .gt-carousel .carousel-item {
        height: 560px;
      }

      .gt-carousel .carousel-item img {
        width: 100%;
        height: 560px;
        object-fit: cover;
        object-position: center;
        display: block;
        filter: brightness(0.45);
      }

      /* Dark gradient over image */
      .gt-carousel .carousel-item::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to right,
          rgba(11, 15, 26, 0.85) 0%,
          rgba(11, 15, 26, 0.4) 55%,
          transparent 100%
        );
        pointer-events: none;
      }

      /* Caption */
      .gt-caption {
        position: absolute;
        bottom: 0;
        left: 0;
        top: 0;
        width: 55%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 4rem;
        z-index: 10;
      }

      .gt-label {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.7rem;
        font-weight: 500;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        color: #d4af37;
        margin-bottom: 1rem;
      }

      .gt-heading {
        font-family: 'Playfair Display', serif;
        font-size: clamp(2.2rem, 5vw, 3.8rem);
        font-weight: 900;
        color: #ffffff;
        line-height: 1.1;
        margin-bottom: 1rem;
      }

      .gt-sub {
        font-family: 'DM Sans', sans-serif;
        font-size: 1rem;
        color: rgba(240, 236, 226, 0.75);
        margin-bottom: 2rem;
        max-width: 420px;
      }

      .gt-btns {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }

      .gt-btn-primary {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.9rem;
        font-weight: 500;
        padding: 0.65rem 1.75rem;
        background: #facc15;
        color: #0b0f1a;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.2s, transform 0.15s;
      }
      .gt-btn-primary:hover { background: #eab308; transform: translateY(-1px); }

      .gt-btn-secondary {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.9rem;
        font-weight: 500;
        padding: 0.65rem 1.75rem;
        background: transparent;
        color: #ffffff;
        border: 1.5px solid rgba(255,255,255,0.5);
        border-radius: 6px;
        cursor: pointer;
        transition: border-color 0.2s, transform 0.15s;
      }
      .gt-btn-secondary:hover { border-color: #ffffff; transform: translateY(-1px); }

      /* Indicators */
      .gt-carousel .carousel-indicators {
        bottom: 1.5rem;
        gap: 6px;
        margin: 0;
        justify-content: center;
      }

      .gt-carousel .carousel-indicators button {
        width: 28px;
        height: 4px;
        border-radius: 2px;
        background: rgba(255,255,255,0.35);
        border: none;
        padding: 0;
        margin: 0;
        transition: background 0.3s, width 0.3s;
      }

      .gt-carousel .carousel-indicators button.active {
        background: #facc15;
        width: 40px;
      }

      /* Controls */
      .gt-carousel .carousel-control-prev,
      .gt-carousel .carousel-control-next {
        width: 48px;
        height: 48px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255,255,255,0.1);
        border-radius: 50%;
        border: 1px solid rgba(255,255,255,0.2);
        opacity: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;
      }
      .gt-carousel .carousel-control-prev { left: 1.5rem; }
      .gt-carousel .carousel-control-next { right: 1.5rem; }
      .gt-carousel .carousel-control-prev:hover,
      .gt-carousel .carousel-control-next:hover {
        background: rgba(255,255,255,0.2);
      }

      .gt-carousel .carousel-control-prev-icon,
      .gt-carousel .carousel-control-next-icon {
        width: 18px;
        height: 18px;
      }

      @media (max-width: 767px) {
        .gt-carousel .carousel-item,
        .gt-carousel .carousel-item img { height: 420px; }
        .gt-caption { width: 100%; padding: 0 1.5rem 3rem; justify-content: flex-end; }
        .gt-heading { font-size: 2rem; }
      }
    `}</style>

    <div
      id="gtCarousel"
      className="carousel slide gt-carousel"
      data-bs-ride="carousel"
      data-bs-interval="5000"
    >
      {/* Indicators */}
      <div className="carousel-indicators">
        {SLIDES.map((s) => (
          <button
            key={s.id}
            type="button"
            data-bs-target="#gtCarousel"
            data-bs-slide-to={s.id}
            className={s.id === 0 ? 'active' : ''}
            aria-label={s.heading}
          />
        ))}
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        {SLIDES.map((s) => (
          <div key={s.id} className={`carousel-item${s.id === 0 ? ' active' : ''}`}>
            <img src={s.image} alt={s.alt} />
            <div className="gt-caption">
              <p className="gt-label">{s.label}</p>
              <h2 className="gt-heading">{s.heading}</h2>
              <p className="gt-sub">{s.sub}</p>
              <div className="gt-btns">
                <button className="gt-btn-primary">Book Tickets</button>
                <button className="gt-btn-secondary">Explore Events</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#gtCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#gtCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </>
))

export default Mycarousel;