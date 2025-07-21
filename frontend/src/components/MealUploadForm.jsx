import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../api/axios";
import "./MealUploadForm.css";

const MealUploadForm = ({ onUpload, editMeal, clearEdit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    images: [],
  });

  const [categories, setCategories] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    axiosInstance.get("/menu/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    if (editMeal) {
      setFormData({
        title: editMeal.title,
        description: editMeal.description,
        price: editMeal.price,
        category: editMeal.category._id || editMeal.category,
        images: [],
      });
      setImagePreviews(editMeal.images.map((img) => `${img}`));
    }
  }, [editMeal]);

  const handleImageChange = (e) => {
    const files = [...e.target.files];
    setFormData({ ...formData, images: files });
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formData.images];
    const updatedPreviews = [...imagePreviews];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      formData.images.forEach((img) => data.append("images", img));

      if (editMeal) {
        data.append("existingImages", JSON.stringify(editMeal.images));
        await axiosInstance.put(`/menu/${editMeal._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Meal updated!");
        clearEdit();
      } else {
        await axiosInstance.post("/menu/add", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Meal uploaded!");
      }

      onUpload();
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        images: [],
      });
      setImagePreviews([]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <form className="meal-upload-form" onSubmit={handleSubmit}>
      <h2>{editMeal ? "Edit Meal" : "Upload New Meal"}</h2>

      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        required
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <textarea
        placeholder="Description"
        value={formData.description}
        required
        rows={3}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      ></textarea>

      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        required
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      />

      <select
        required
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      >
        <option value="">Select Category</option>
        {categories?.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        required={!editMeal}
      />

      {imagePreviews.length > 0 && (
        <div className="image-preview-container">
          {imagePreviews.map((src, idx) => (
            <div key={idx} className="preview-wrapper">
              <img
                src={
                  editMeal ? `${import.meta.env.VITE_BACKEND_URL}${src}` : src
                }
                alt={`preview-${idx}`}
                className="preview-img"
              />
              <button
                type="button"
                className="remove-preview-btn"
                onClick={() => handleRemoveImage(idx)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      <button type="submit">{editMeal ? "Update Meal" : "Upload Meal"}</button>
    </form>
  );
};

export default MealUploadForm;
