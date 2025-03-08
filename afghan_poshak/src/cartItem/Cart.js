import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userToken = localStorage.getItem("userToken");

  const fetchCartItems = async () => {
    if (!userToken) {
      alert("Please log in to view your cart.");
      navigate("/login");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/cart/cart/list/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch cart items");
      const data = await response.json();

      const updatedCartItems = await Promise.all(
        data.map(async (item) => {
          const productResponse = await fetch(
            `http://127.0.0.1:8000/products/products/${item.product}/`
          );
          if (!productResponse.ok) throw new Error("Failed to fetch product details");
          const productData = await productResponse.json();
          return { ...item, product: productData };
        })
      );

      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Fixed removeFromCart function
  const removeFromCart = async (itemId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/cart/cart/remove/${itemId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) throw new Error("Failed to remove item from cart");
      fetchCartItems(); // Refresh cart after removing item
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Fixed updateQuantity function
  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Prevents setting quantity to zero

    try {
      const response = await fetch(`http://127.0.0.1:8000/cart/cart/update/${itemId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) throw new Error("Failed to update quantity");
      fetchCartItems(); // Refresh cart after updating quantity
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <ul className="cart-items">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <img
              src={item.product.image || "/placeholder.svg"}
              alt={item.product.name}
              className="cart-item-image"
            />
            <div className="cart-item-info">
              <h2>{item.product.name}</h2>
              <p>Price: AF {item.product.price}</p>
              <div className="quantity-control">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <button className="checkout-button" onClick={() => navigate("/checkout")}>
        Proceed to Checkout
      </button>
    </div>
  );
}
