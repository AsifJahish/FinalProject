import React from "react";
import "./Help.css"; // Import CSS for styling

export default function Help() {
  return (
    <div className="help-container">
      <h1>Help & Support</h1>
      <p>
        Welcome to the <strong>AfghanPoshak Help Center</strong>. Here you’ll find answers to common questions and support options.
      </p>

      <h2>Frequently Asked Questions</h2>

      <div className="faq">
        <h3>🛍️ How do I buy a product?</h3>
        <p>
          Browse our store, select the item you like, and click "Add to Cart". Proceed to checkout to complete your purchase.
        </p>
      </div>

      <div className="faq">
        <h3>📦 How do I sell my clothes?</h3>
        <p>
          Register an account, list your items with clear pictures, and set a price. Once someone buys your product, you'll be notified.
        </p>
      </div>

      <div className="faq">
        <h3>💳 What payment methods do you accept?</h3>
        <p>
          We accept local bank transfers, cash on delivery, and online payment options where available.
        </p>
      </div>

      <div className="faq">
        <h3>🚚 What are the delivery options?</h3>
        <p>
          We offer in-person pickup, local courier services, and standard delivery across Afghanistan.
        </p>
      </div>

      <div className="faq">
        <h3>🔄 Can I return an item?</h3>
        <p>
          Yes, returns are accepted within 7 days if the item is not as described. Contact us for return instructions.
        </p>
      </div>

      <h2>Contact Us</h2>
      <p>
        If you need further assistance, reach out to our support team.
      </p>
      <p className="contact-text">
        📧 Email: <a href="mailto:support@afghanposhak.com">support@afghanposhak.com</a>
      </p>
      <p className="contact-text">
        📞 Phone: +93 123 456 789
      </p>
      <p className="contact-text">
        📍 Address: Kabul, Afghanistan
      </p>
    </div>
  );
}
