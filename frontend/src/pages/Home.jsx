import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext"; // Import the useCart hook
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [meals, setMeals] = useState([]);

  const { addToCart } = useCart(); // Get the addToCart function
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (meal) => {
    if (!auth.user) {
      toast.error("Please login to add items to the cart.");
      navigate("/login");
      return;
    }
    addToCart(meal._id); // Call the function from context
  };

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const { data } = await axiosInstance.get("/menu/all");
        setMeals(data.menus);
      } catch (error) {
        toast.error("Could not fetch meals.");
        console.error(error);
      }
    };
    fetchMeals();
  }, []);

  return (
    <div className="home-container">
      <h2>Today's Homemade Meals</h2>
      <div className="meal-display-grid">
        {meals.map((meal) => (
          <div key={meal._id} className="user-meal-card">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${meal.images[0]}`}
              alt={meal.title}
              className="user-meal-img"
            />
            <div className="user-meal-info">
              <h3>{meal.title}</h3>
              <p className="chef-name">by Chef {meal.chef.name}</p>
              <p className="meal-desc">{meal.description}</p>
              <div className="price-add-row">
                <p className="meal-price">₹{meal.price}</p>
                <button
                  onClick={() => handleAddToCart(meal)}
                  className="add-to-cart-btn"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
