import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-auto">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-12 text-center">
            {/* Home Icon */}
            <a href="/" className="me-3 text-dark">
              <i className="bi bi-house-door fs-4"></i>
              <span className="ms-2">Home</span>
            </a>

            {/* About Us Icon */}
            <a href="/about" className="me-3 text-dark">
              <i className="bi bi-info-circle fs-4"></i>
              <span className="ms-2">About Us</span>
            </a>

            {/* Contact Icon */}
            <a href="/contact" className="me-3 text-dark">
              <i className="bi bi-envelope fs-4"></i>
              <span className="ms-2">Contact</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center p-3 bg-dark text-white">
        © 2025 Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;