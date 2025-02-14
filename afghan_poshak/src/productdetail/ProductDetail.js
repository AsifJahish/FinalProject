// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./ProductDetail.css";

// export default function ProductDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [ratings, setRatings] = useState([]);
//   const [newReview, setNewReview] = useState("");
//   const [userRating, setUserRating] = useState(null);
//   const navigate = useNavigate();

//   // Get the stored user token for authentication
//   const userToken = localStorage.getItem("userToken");

//   useEffect(() => {
//     async function fetchProduct() {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/products/products/${id}/`);
//         if (!response.ok) throw new Error("Failed to fetch product");
//         const data = await response.json();
//         setProduct(data);
//         setReviews(data.reviews || []);
//         setRatings(data.ratings || []);
//         if (data.user_rating) setUserRating(data.user_rating);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     }
//     fetchProduct();
//   }, [id]);

//   // Submit Rating
//   const submitRating = async (rating) => {
//     if (!userToken) {
//       alert("Please log in to rate this product.");
//       return;
//     }

//     setUserRating(rating);
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/rating/ratings/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`, // Send token
//         },
//         body: JSON.stringify({ product: id, rating }),
//       });

//       if (!response.ok) throw new Error(`Failed to submit rating (Status: ${response.status})`);
//       const data = await response.json();
//       setRatings([...ratings, data]); // Update UI
//     } catch (error) {
//       console.error("Error submitting rating:", error);
//     }
//   };

//   // Submit Review
//   const submitReview = async () => {
//     if (!userToken) {
//       alert("Please log in to leave a review.");
//       return;
//     }
//     if (!newReview.trim()) return;

//     try {
//       const response = await fetch(`http://127.0.0.1:8000/reviews/reviews/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userToken}`, // Send token
//         },
//         body: JSON.stringify({ product: id, comment: newReview }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(`Failed to submit review (Status: ${response.status})`);

//       setReviews([data, ...reviews]); // Update UI
//       setNewReview(""); // Clear input
//     } catch (error) {
//       console.error("Error submitting review:", error);
//     }
//   };

//   if (!product) return <p>Loading...</p>;

//   return (
//     <div className="product-detail">
//       <button onClick={() => navigate(-1)} className="back-button">← Back</button>
//       <div className="product-content">
//         <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image-large" />
//         <div className="product-info">
//           <h1>{product.name}</h1>
//           <p className="product-price">AF {product.price}</p>
//           <p className="product-description">{product.description}</p>
//           <button className="btn">Add to Cart</button>

//           <div className="ratings">
//             <h3>Ratings:</h3>
//             <p>⭐ {ratings.length > 0 ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1) : "No ratings yet"}</p>
//           </div>

//           <div className="add-rating">
//             <h4>Rate this product:</h4>
//             <div className="star-rating">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <span 
//                   key={star} 
//                   className={`star ${userRating >= star ? "filled" : ""}`}
//                   onClick={() => submitRating(star)}
//                 >
//                   ⭐
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div className="reviews">
//             <h3>Reviews:</h3>
//             {reviews.length > 0 ? (
//               reviews.map((review, index) => (
//                 <div key={index} className="review">
//                   <p><strong>{review.user}</strong>: {review.comment}</p>
//                 </div>
//               ))
//             ) : (
//               <p>No reviews yet.</p>
//             )}
//           </div>

//           <div className="add-review">
//             <h4>Leave a review:</h4>
//             <textarea value={newReview} onChange={(e) => setNewReview(e.target.value)}></textarea>
//             <button className="btn" onClick={submitReview}>Submit Review</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


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

  // Get the stored user token from localStorage
  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/products/products/${id}/`);
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
        setReviews(data.reviews || []);
        setRatings(data.ratings || []);
        if (data.user_rating) setUserRating(data.user_rating);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    fetchProduct();
  }, [id]);

  // Submit Rating
  const submitRating = async (rating) => {
    if (!userToken) {
      alert("Please log in to rate this product.");
      return;
    }

    setUserRating(rating);
    try {
      const response = await fetch(`http://127.0.0.1:8000/rating/ratings/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`, // Send token
        },
        body: JSON.stringify({ product: id, rating }),
      });

      if (!response.ok) throw new Error(`Failed to submit rating (Status: ${response.status})`);
      const data = await response.json();
      setRatings([...ratings, data]); // Update UI
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  // Submit Review
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
          Authorization: `Bearer ${userToken}`, // Send token
        },
        body: JSON.stringify({ product: id, comment: newReview }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(`Failed to submit review (Status: ${response.status})`);

      setReviews([data, ...reviews]); // Update UI
      setNewReview(""); // Clear input
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>
      <div className="product-content">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image-large" />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="product-price">AF {product.price}</p>
          <p className="product-description">{product.description}</p>
          <button className="btn">Add to Cart</button>

          <div className="ratings">
            <h3>Ratings:</h3>
            <p>⭐ {ratings.length > 0 ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1) : "No ratings yet"}</p>
          </div>

          <div className="add-rating">
            <h4>Rate this product:</h4>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  className={`star ${userRating >= star ? "filled" : ""}`}
                  onClick={() => submitRating(star)}
                >
                  ⭐
                </span>
              ))}
            </div>
          </div>

          <div className="reviews">
            <h3>Reviews:</h3>
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
            <button className="btn" onClick={submitReview}>Submit Review</button>
          </div>
        </div>
      </div>
    </div>
  );
}
