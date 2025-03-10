import React from "react";
import "./About.css"; // Import CSS for styling

export default function About() {
  return (
    <div className="about-container">
      <h1>About AfghanPoshak</h1>
      <p>
        Welcome to <strong>AfghanPoshak</strong>, your trusted platform for buying and selling second-hand clothing in Afghanistan.
        Our mission is to provide an affordable and sustainable shopping experience while promoting the reuse of high-quality fashion.
      </p>

      <h2>Our Goals</h2>
      <ul>
        <li><strong>Affordability:</strong> Make fashion accessible to everyone by offering budget-friendly second-hand clothing.</li>
        <li><strong>Sustainability:</strong> Reduce textile waste and promote eco-friendly fashion choices.</li>
        <li><strong>Community Support:</strong> Connect buyers and sellers within the Afghan community to encourage ethical shopping.</li>
      </ul>

      <h2>Why Choose Us?</h2>
      <p>
        AfghanPoshak is not just an online store; it’s a movement towards responsible fashion. 
        Every item sold here gets a second life, saving resources and making a difference in our environment.
      </p>

      <h2>Get Involved</h2>
      <p>
        Whether you want to buy, sell, or support sustainable fashion, AfghanPoshak welcomes you! 
        Join us in making a positive impact.
      </p>

      <p className="contact-text">For more details, visit our <a href="/help">Help Center</a> or <a href="/contact">Contact Us</a>.</p>
    </div>
  );
}
