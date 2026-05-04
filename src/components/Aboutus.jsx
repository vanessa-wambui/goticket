import React, { memo } from "react";

const SECTIONS = [
  {
    id: "story",
    label: "Our story",
    heading: "Born in Nairobi, built for East Africa",
    body: "GoTicket started with a simple frustration — buying tickets in East Africa meant long queues, shady resellers, and zero guarantees. We set out to fix that. Founded in 2021, we built a platform that puts verified, instant tickets directly in your pocket. From Nairobi to Kampala, Dar es Salaam to Kigali — we're your front-row pass to every experience worth showing up for.",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80",
    alt: "Crowd at a live event in Nairobi",
    reverse: false,
  },
  {
    id: "mission",
    label: "Our mission",
    heading: "Every booking should feel like the start of something",
    body: "We believe the excitement of an event should begin the moment you decide to go — not when you finally get through the gate. That's why we obsess over seamless M‑Pesa checkout, instant QR tickets, and zero-queue entry. Trusted by over 50,000 fans, travellers, and cinephiles, GoTicket is the ticketing partner that gets out of the way and lets the experience speak.",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    alt: "Concert audience enjoying a performance",
    reverse: true,
  },
  {
    id: "venues",
    label: "Our partners",
    heading: "120+ venues that trust us to deliver",
    body: "From IMAX cinemas and rooftop concert halls to coastal resorts and football stadiums — our partner network spans every category of live experience. We work directly with venues to guarantee real-time availability, accurate pricing, and zero hidden fees. When a venue partners with GoTicket, their fans get the experience they deserve.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    alt: "Stadium full of fans",
    reverse: false,
  },
];

const Section = memo(({ section }) => {
  const { label, heading, body, image, alt, reverse } = section;

  return (
    <div
      className={`row align-items-center g-0 section-row ${reverse ? "flex-row-reverse" : ""}`}
    >
      {/* Image column */}
      <div className="col-md-6 image-col">
        <div className="image-wrap">
          <img src={image} alt={alt} loading="lazy" />
          <div className="image-overlay" />
        </div>
      </div>

      {/* Text column */}
      <div className="col-md-6 text-col">
        <div className={`text-inner ${reverse ? "text-inner--right" : "text-inner--left"}`}>
          <span className="eyebrow">{label}</span>
          <h2 className="section-heading">{heading}</h2>
          <p className="section-body">{body}</p>
          <div className="accent-line" />
        </div>
      </div>
    </div>
  );
});

const AboutUs = memo(() => (
  <section className="about-us">
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500&display=swap');

      .about-us {
        background: #0b0f1a;
        color: #f0ece2;
        font-family: 'DM Sans', sans-serif;
        overflow: hidden;
      }

      .about-us .section-row {
        min-height: 520px;
      }

      /* Image column */
      .about-us .image-col {
        padding: 0;
        position: relative;
      }

      .about-us .image-wrap {
        position: relative;
        width: 100%;
        height: 520px;
        overflow: hidden;
      }

      .about-us .image-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.6s ease;
      }

      .about-us .image-wrap:hover img {
        transform: scale(1.04);
      }

      .about-us .image-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(11,15,26,0.35) 0%, transparent 60%);
        pointer-events: none;
      }

      /* Text column */
      .about-us .text-col {
        padding: 0;
        display: flex;
        align-items: center;
      }

      .about-us .text-inner {
        padding: 4rem 3.5rem;
        max-width: 520px;
      }

      .about-us .text-inner--left {
        margin-left: auto;
        padding-left: 4rem;
        padding-right: 3rem;
      }

      .about-us .text-inner--right {
        margin-right: auto;
        padding-right: 4rem;
        padding-left: 3rem;
      }

      .about-us .eyebrow {
        display: inline-block;
        font-size: 0.7rem;
        font-weight: 500;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #d4af37;
        margin-bottom: 1.1rem;
      }

      .about-us .section-heading {
        font-family: 'Playfair Display', serif;
        font-size: clamp(1.8rem, 3vw, 2.5rem);
        font-weight: 900;
        line-height: 1.2;
        color: #f0ece2;
        margin-bottom: 1.25rem;
      }

      .about-us .section-body {
        font-size: 1rem;
        line-height: 1.85;
        color: #9ca3af;
        margin-bottom: 2rem;
      }

      .about-us .accent-line {
        width: 48px;
        height: 3px;
        background: #facc15;
        border-radius: 2px;
      }

      /* Divider between sections */
      .about-us .section-row + .section-row {
        border-top: 1px solid rgba(255,255,255,0.06);
      }

      /* Mobile */
      @media (max-width: 767px) {
        .about-us .image-wrap {
          height: 280px;
        }

        .about-us .text-inner,
        .about-us .text-inner--left,
        .about-us .text-inner--right {
          padding: 2.5rem 1.5rem;
          margin: 0;
          max-width: 100%;
        }
      }
    `}</style>

    <div className="container-fluid">
      {SECTIONS.map((section) => (
        <Section key={section.id} section={section} />
      ))}
    </div>
  </section>
));

export default AboutUs;