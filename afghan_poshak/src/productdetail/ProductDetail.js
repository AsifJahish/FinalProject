import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [userRating, setUserRating] = useState(null);
  const navigate = useNavigate();

  // Get stored user token
  const userToken = localStorage.getItem("userToken");

  // Function to get CSRF token from cookies
  const getCSRFToken = () => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "csrftoken") {
        return value;
      }
    }
    return "";
  };

  // Fetch product data
  const fetchProductData = async () => {
    try {
      const productResponse = await fetch(`http://127.0.0.1:8000/products/products/${id}/`);
      if (!productResponse.ok) throw new Error("Failed to fetch product data");
      const productData = await productResponse.json();
      setProduct(productData);

      const reviewsResponse = await fetch(`http://127.0.0.1:8000/reviews/reviews/?product=${id}`);
      if (!reviewsResponse.ok) throw new Error("Failed to fetch reviews");
      setReviews(await reviewsResponse.json());

      const ratingsResponse = await fetch(`http://127.0.0.1:8000/rating/ratings/?product=${id}`);
      if (!ratingsResponse.ok) throw new Error("Failed to fetch ratings");
      const ratingsData = await ratingsResponse.json();
      setRatings(ratingsData);

      const userRatingData = ratingsData.find(rating => rating.user === userToken);
      setUserRating(userRatingData ? userRatingData.rating : null);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [id]);

  // Function to submit rating
  const submitRating = async (rating) => {
    if (!userToken) {
      alert("Please log in to rate this product.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/rating/ratings/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ product: id, rating }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to submit rating:", errorData);
        throw new Error(`Error ${response.status}: ${errorData.detail || "Unknown error"}`);
      }

      fetchProductData();
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  // Function to submit review
  const submitReview = async () => {
    if (!userToken) {
      alert("Please log in to leave a review.");
      return;
    }
    if (!newReview.trim()) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/reviews/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ product: id, comment: newReview }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to submit review:", errorData);
        throw new Error(`Error ${response.status}: ${errorData.detail || "Unknown error"}`);
      }

      fetchProductData();
      setNewReview("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };




  const addToCart = async (productId) => {
    if (!userToken) {
      alert("Please log in to add items to your cart.");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8000/cart/cart/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ product: productId, quantity: 1 }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/cart"); // Use the existing navigate function
      } else {
        alert(data.error || "Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  
  


  // after this 

  if (!product) return <p>Loading...</p>;

  // Calculate the average rating dynamically
  const averageRating = ratings.length > 0
    ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
    : "No ratings yet";

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>
      <div className="product-layout">
        <div className="product-content">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image-large" />
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="product-price">AF {product.price}</p>
            <p className="product-description">{product.description}</p>
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
          </div>
        </div>

        <div className="ratings-reviews">
          <div className="ratings">
            <h3>Average Rating:</h3>
            <p>⭐ {averageRating}</p>
            <h4>Rate this product:</h4>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  className={`star ${userRating && userRating >= star ? "filled" : ""}`}
                  onClick={() => submitRating(star)}
                >
                  ⭐
                </span>
              ))}
            </div>
          </div>

          <div className="reviews">
            <h3>All Reviews:</h3>
            <div className="reviews-container">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="review">
                    <p><strong>{review.user}</strong>: {review.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
            <div className="add-review">
              <h4>Leave a review:</h4>
              <textarea value={newReview} onChange={(e) => setNewReview(e.target.value)}></textarea>
              <button onClick={submitReview}>Submit Review</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
