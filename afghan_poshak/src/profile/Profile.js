import React, { useEffect, useState } from "react";
import "./Profile.css"; // Import the CSS file

export default function Profile() {
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    profile_image: null,
    bio: "",
    location: "",
  });

  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const userToken = localStorage.getItem("userToken"); // Assuming token is stored in localStorage

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/profile/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch profile");

      const data = await response.json();
      setProfile(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("full_name", profile.full_name);
    formData.append("phone_number", profile.phone_number);
    formData.append("bio", profile.bio);
    formData.append("location", profile.location);
    if (selectedImage) {
      formData.append("profile_image", selectedImage);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/profile/", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedData = await response.json();
      alert("Profile updated successfully!");
      setProfile(updatedData.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="full_name"
            value={profile.full_name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={profile.email} disabled />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone_number"
            value={profile.phone_number}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Bio:</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Profile Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {profile.profile_image && (
            <img
              src={`http://127.0.0.1:8000${profile.profile_image}`}
              alt="Profile"
              className="profile-image"
            />
          )}
        </div>

        <button type="submit" className="update-button">Update Profile</button>
      </form>
    </div>
  );
}
