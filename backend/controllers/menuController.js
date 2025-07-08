import Menu from "../models/menuModel.js";

// Create Menu Item
export const createMenuItem = async (req, res) => {
  try {
    const { title, description, price, availableDate, category } = req.body;
    const images = req.files?.map((file) => `/uploads/${file.filename}`) || [];

    const menu = await Menu.create({
      chef: req.user._id,
      title,
      description,
      price,
      availableDate,
      category,
      images,
    });

    res.status(201).json({ success: true, menu });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get All Menu Items (for users)
export const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find({ isAvailable: true })
      .populate("chef", "name")
      .populate("category", "name");
    res.json({ success: true, menus });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Logged-in Chef’s Menus
export const getChefMenus = async (req, res) => {
  try {
    const menus = await Menu.find({ chef: req.user._id }).populate(
      "category",
      "name"
    );
    res.json({ success: true, menus });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Menu Item
export const updateMenuItem = async (req, res) => {
  try {
    const { title, description, price, availableDate, category } = req.body;
    const images = req.files?.map((file) => `/uploads/${file.filename}`) || [];

    const updated = await Menu.findOneAndUpdate(
      { _id: req.params.id, chef: req.user._id },
      {
        title,
        description,
        price,
        availableDate,
        category,
        ...(images.length > 0 && { images }),
      },
      { new: true }
    );

    if (!updated)
      return res
        .status(404)
        .json({ message: "Menu not found or unauthorized" });

    res.json({ success: true, menu: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Menu Item
export const deleteMenuItem = async (req, res) => {
  try {
    const deleted = await Menu.findOneAndDelete({
      _id: req.params.id,
      chef: req.user._id,
    });
    if (!deleted)
      return res
        .status(404)
        .json({ message: "Menu not found or unauthorized" });

    res.json({ success: true, message: "Menu deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
