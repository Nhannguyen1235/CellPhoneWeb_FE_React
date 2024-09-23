import React from 'react';
import { FaFacebook, FaTwitter, FaInstagramSquare } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer w-100 bg-dark text-white py-4">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>At our shop, we are passionate about industry. Since our founding in 2003, we have been committed to brief description of what you do or offer. Our mission is to state your mission, and we strive to describe how you achieve this mission.</p>
          </div>
          <div className="col-md-4">
            <h5>Contact</h5>
            <p>Email: contact@example.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <button 
              type="button" 
              className="btn btn-link text-white me-3"
              onClick={() => window.location.href='https://www.facebook.com'}
            >
              <i><FaFacebook /></i>
            </button>
            <button 
              type="button" 
              className="btn btn-link text-white me-3"
              onClick={() => window.location.href='https://www.twitter.com'}
            >
              <i><FaTwitter /></i>
            </button>
            <button 
              type="button" 
              className="btn btn-link text-white"
              onClick={() => window.location.href='https://www.instagram.com'}
            >
              <i><FaInstagramSquare /></i>
            </button>
          </div>
        </div>
        <div className="mt-3">
          <p>&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
