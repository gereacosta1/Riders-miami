// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="rm-footer mt-5">
      <div className="container-narrow">
        <hr className="footer-divider" />

        <div className="row gy-4 align-items-start py-4">
          {/* Brand + tagline */}
          <div className="col-12 col-md-5">
            <a
              href="/"
              className="d-flex align-items-center gap-2 mb-2 text-white text-decoration-none"
              aria-label="Riders Miami home"
            >
              <img
                src="/logo-riders-chico.png"
                width="28"
                height="28"
                alt="Riders Miami"
                loading="lazy"
                style={{ borderRadius: 6 }}
              />
              <strong>Riders Miami</strong>
            </a>
            <p className="text-white-50 m-0">
              Premium motorcycles & electric rides. Finance with Affirm.
            </p>

            {/* ✅ Affirm Compliance (compact, non-intrusive) */}
            <div className="rm-affirm rm-affirm--footer mt-3">
              <p className="rm-affirm-text mb-2">
                Rates from 0–36% APR. Payment options through Affirm are subject to an eligibility check and are provided by these lending partners:{" "}
                <a href="https://www.affirm.com/lenders" target="_blank" rel="noreferrer">
                  affirm.com/lenders
                </a>
                . Options depend on your purchase amount, and a down payment may be required. CA residents: Loans by Affirm Loan Services, LLC are made or arranged pursuant to a California Financing Law license. For licenses and disclosures, see{" "}
                <a href="https://www.affirm.com/licenses" target="_blank" rel="noreferrer">
                  affirm.com/licenses
                </a>
                .
              </p>

              <p className="rm-affirm-text mb-0">
                For example, a $800 purchase could be split into 12 monthly payments of $72.21 at 15% APR, or 4 interest-free payments of $200 every 2 weeks. Full terms:{" "}
                <a href="https://www.affirm.com/disclosures" target="_blank" rel="noreferrer">
                  affirm.com/disclosures
                </a>
                .
              </p>
            </div>
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
              <li>
                <a className="footer-link" href="mailto:support@ridersmiami.test">
                  support@ridersmiami.test
                </a>
              </li>

              <li className="d-flex align-items-center gap-2">
                {/* Instagram icon (inline SVG, sin librerías) */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="rgba(255,255,255,.6)"/>
                  <circle cx="12" cy="12" r="4.5" stroke="rgba(255,255,255,.6)"/>
                  <circle cx="17.5" cy="6.5" r="1.2" fill="rgba(255,255,255,.6)"/>
                </svg>
                <a
                  className="footer-link"
                  target="_blank"
                  rel="noreferrer"
                  href="https://instagram.com/ridersmiami"
                >
                  @ridersmiami
                </a>
              </li>

              {/* Link rápido a disclosures (por si el usuario llega al footer) */}
              <li>
                <a className="footer-link" target="_blank" rel="noreferrer" href="https://www.affirm.com/disclosures">
                  Affirm disclosures
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 py-3 small text-white-50">
          <span>© {new Date().getFullYear()} Riders Miami</span>
          <span>Built with React + Vite</span>
        </div>
      </div>
    </footer>
  );
}
