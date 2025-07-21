import React, { useState } from "react";
import MealUploadForm from "../components/MealUploadForm";
import ChefMealList from "../components/ChefMealList";

const ChefDashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingMeal, setEditingMeal] = useState(null);

  const reload = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="chef-dashboard">
      <MealUploadForm
        onUpload={reload}
        editMeal={editingMeal}
        clearEdit={() => setEditingMeal(null)}
      />
      <ChefMealList refreshKey={refreshKey} onEdit={setEditingMeal} />
    </div>
  );
};

export default ChefDashboard;
