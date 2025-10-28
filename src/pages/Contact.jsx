import React from 'react'

export default function Contact() {
  return (
    <>
      <section className="container-narrow my-5">
        <h1 className="fw-bold mb-3">Contact</h1>
       <p className="text-white-50">
        We’d love to hear from you — whether you have questions about our motorcycles,
        want to collaborate, or just want to say hi.
        </p>
        ...
        <p className="text-white-50 m-0">Open Monday – Friday,  9AM  – 6PM</p>


        <div className="row g-4 mt-4">
          {/* Contact Info */}
          <div className="col-12 col-md-6">
            <div className="card-dark p-4 h-100 hover-raise">
              <h4 className="mb-3">Get in touch</h4>
              <p><strong>Email:</strong> <a href="mailto:support@ridersmiami.test" className="text-light text-decoration-underline">support@ridersmiami.test</a></p>
              <p><strong>Phone:</strong> <span className="text-white-50">+1 (305) 000-0000</span></p>
              <p><strong>Instagram:</strong> <a href="https://instagram.com/ridersmiami" target="_blank" rel="noreferrer" className="text-light text-decoration-underline">instagram.com/ridersmiami</a></p>
              <p><strong>Location:</strong> Miami, Florida</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-12 col-md-6">
            <div className="card-dark p-4 h-100 hover-raise">
              <h4 className="mb-3">Send us a message</h4>
              <form onSubmit={(e) => { e.preventDefault(); alert('Message sent ✅'); }}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label text-white-50">Name</label>
                  <input type="text" id="name" className="form-control bg-dark text-light border-secondary" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-white-50">Email</label>
                  <input type="email" id="email" className="form-control bg-dark text-light border-secondary" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label text-white-50">Message</label>
                  <textarea id="message" rows="4" className="form-control bg-dark text-light border-secondary" required></textarea>
                </div>
                <button type="submit" className="btn btn-accent w-100 mt-2">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Optional: Map or Footer Info */}
      <section className="container-narrow my-5">
        <div className="card-dark p-4 text-center">
          <h5 className="fw-semibold mb-2">Visit Us</h5>
          <p className="text-white-50 m-0">123 Demo Street, Miami, FL 33101</p>
          <p className="text-white-50 m-0">Open Monday  Friday, 9AM  6PM</p>
        </div>
      </section>
    </>
  )
}
