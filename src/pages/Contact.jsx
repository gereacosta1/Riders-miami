// src/pages/Contact.jsx
import React from 'react'

export default function Contact() {
  return (
    <>
      <section className="container-narrow my-5">
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-end justify-content-between gap-3 mb-4">
          <div>
            <h1 className="fw-bold mb-2">Contact</h1>
            <p className="text-white-50 mb-2" style={{ maxWidth: 720, lineHeight: 1.6 }}>
              We’d love to hear from you, whether you have questions about our rides, want help choosing the right option, or just want to say hi.
            </p>
            <div className="text-white-50 small">
              Open Monday – Friday, 9AM – 6PM
            </div>
          </div>

          <div className="text-white-50 small">
            Typical response time: under 24h
          </div>
        </div>

        <div className="row g-4">
          {/* Contact Info */}
          <div className="col-12 col-md-5">
            <div className="card-dark p-4 h-100 hover-raise">
              <h4 className="mb-3">Get in touch</h4>

              <div className="d-grid gap-3">
                <div>
                  <div className="text-white-50 small mb-1">Email</div>
                  <a
                    href="mailto:support@ridersmiami.test"
                    className="text-light text-decoration-underline"
                    style={{ textUnderlineOffset: 3 }}
                  >
                    support@ridersmiami.test
                  </a>
                </div>

                <div>
                  <div className="text-white-50 small mb-1">Phone</div>
                  <div className="text-white-50">+1 (305) 000-0000</div>
                </div>

                <div>
                  <div className="text-white-50 small mb-1">Instagram</div>
                  <a
                    href="https://instagram.com/ridersmiami"
                    target="_blank"
                    rel="noreferrer"
                    className="text-light text-decoration-underline"
                    style={{ textUnderlineOffset: 3 }}
                  >
                    instagram.com/ridersmiami
                  </a>
                </div>

                <div>
                  <div className="text-white-50 small mb-1">Location</div>
                  <div className="text-white-50">Miami, Florida</div>
                </div>
              </div>

              <div className="mt-4 text-white-50 small" style={{ lineHeight: 1.6 }}>
                If you’re contacting us about an order, include your name, email, and the items you’re looking at so we can help faster.
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-12 col-md-7">
            <div className="card-dark p-4 h-100 hover-raise">
              <h4 className="mb-3">Send us a message</h4>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  alert('Message sent ✅')
                }}
              >
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="name" className="form-label text-white-50">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-control checkout-input"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="email" className="form-label text-white-50">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control checkout-input"
                      placeholder="you@email.com"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="message" className="form-label text-white-50">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="5"
                      className="form-control checkout-input"
                      placeholder="Tell us what you’re looking for"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-accent w-100" style={{ paddingBlock: 12, fontWeight: 600 }}>
                      Send Message
                    </button>
                    <div className="text-white-50 small mt-2" style={{ lineHeight: 1.5 }}>
                      By sending this message, you agree we can reply using the contact details you provided.
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="container-narrow mb-5">
        <div className="card-dark p-4 text-center hover-raise">
          <h5 className="fw-semibold mb-2">Visit Us</h5>
          <p className="text-white-50 m-0">123 Demo Street, Miami, FL 33101</p>
          <p className="text-white-50 m-0">Open Monday – Friday, 9AM – 6PM</p>
        </div>
      </section>
    </>
  )
}
