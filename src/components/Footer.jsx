import React from "react";

export default function Footer() {
  return (
    <footer className="rm-footer mt-5">
      <div className="container-narrow">
        <hr className="footer-divider" />

        <div className="row gy-4 align-items-start py-4">
          {/* Brand + tagline */}
          <div className="col-12 col-md-5">
            <a href="/" className="d-flex align-items-center gap-2 mb-2 text-white text-decoration-none">
              <img src="/logo-riders-chico.png" width="28" height="28" alt="Riders Miami" />
              <strong>Riders Miami</strong>
            </a>
            <p className="text-white-50 m-0">
              Premium motorcycles & electric rides. Finance with Affirm.
            </p>
          </div>

          {/* Links */}
          <div className="col-6 col-md-3">
            <h6 className="text-white-50 mb-2">Explore</h6>
            <ul className="list-unstyled d-grid gap-2 m-0">
              <li><a className="footer-link" href="/">Home</a></li>
              <li><a className="footer-link" href="/catalog">Catalog</a></li>
              <li><a className="footer-link" href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-6 col-md-4">
            <h6 className="text-white-50 mb-2">Contact</h6>
            <ul className="list-unstyled d-grid gap-2 m-0">
              <li><a className="footer-link" href="mailto:support@ridersmiami.test">support@ridersmiami.test</a></li>
              <li className="d-flex align-items-center gap-2">
                {/* Instagram icon (inline SVG, sin librerías) */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="rgba(255,255,255,.6)"/>
                  <circle cx="12" cy="12" r="4.5" stroke="rgba(255,255,255,.6)"/>
                  <circle cx="17.5" cy="6.5" r="1.2" fill="rgba(255,255,255,.6)"/>
                </svg>
                <a className="footer-link" target="_blank" rel="noreferrer" href="https://instagram.com/ridersmiami">
                  @ridersmiami
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center py-3 small text-white-50">
          <span>© {new Date().getFullYear()} Riders Miami</span>
          <span>Built with React + Vite</span>
        </div>
      </div>
    </footer>
  );
}
