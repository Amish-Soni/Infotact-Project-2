import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../api/axios";
import "./ChefMealList.css";

const ChefMealList = ({ refreshKey, onEdit }) => {
  const [meals, setMeals] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState({});
  const intervalRef = useRef(null);

  const fetchMeals = async () => {
    const res = await axiosInstance.get("/menu/chef");
    setMeals(res.data.menus);

    // Initialize carousel index
    const initialIndex = {};
    res.data.menus.forEach((meal) => {
      initialIndex[meal._id] = 0;
    });
    setCarouselIndex(initialIndex);
  };

  useEffect(() => {
    fetchMeals();
  }, [refreshKey]);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this meal?"
    );
    if (!confirm) return;

    try {
      await axiosInstance.delete(`/menu/${id}`);
      fetchMeals();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Autoplay logic
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCarouselIndex((prev) => {
        const updated = { ...prev };
        meals.forEach((meal) => {
          if (meal.images.length > 1) {
            const current = prev[meal._id] || 0;
            updated[meal._id] = (current + 1) % meal.images.length;
          }
        });
        return updated;
      });
    }, 3000); // 3 seconds

    return () => clearInterval(intervalRef.current);
  }, [meals]);

  const handleNext = (mealId, imagesLength) => {
    setCarouselIndex((prev) => ({
      ...prev,
      [mealId]: (prev[mealId] + 1) % imagesLength,
    }));
  };

  const handlePrev = (mealId, imagesLength) => {
    setCarouselIndex((prev) => ({
      ...prev,
      [mealId]: (prev[mealId] - 1 + imagesLength) % imagesLength,
    }));
  };

  return (
    <div className="chef-meal-list-container">
      <h3>Your Meals</h3>
      <div className="meal-grid">
        {meals.map((meal) => {
          const currentIndex = carouselIndex[meal._id] || 0;
          const currentImage = meal.images[currentIndex];

          return (
            <div key={meal._id} className="meal-card">
              <div className="carousel-container">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${currentImage}`}
                  alt={`Meal ${currentIndex + 1}`}
                  className="carousel-image"
                />

                {meal.images.length > 1 && (
                  <>
                    <button
                      className="carousel-button left"
                      onClick={() => handlePrev(meal._id, meal.images.length)}
                    >
                      ‹
                    </button>
                    <button
                      className="carousel-button right"
                      onClick={() => handleNext(meal._id, meal.images.length)}
                    >
                      ›
                    </button>
                    <div className="carousel-dots">
                      {meal.images.map((_, idx) => (
                        <span
                          key={idx}
                          className={`dot ${
                            idx === currentIndex ? "active" : ""
                          }`}
                        ></span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <h4>{meal.title}</h4>
              <p>₹{meal.price}</p>
              <small>{meal.description}</small>

              <div className="meal-actions">
                <button className="edit-meal-btn" onClick={() => onEdit(meal)}>
                  ✏️ Edit
                </button>
                <button
                  className="delete-meal-btn"
                  onClick={() => handleDelete(meal._id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChefMealList;
