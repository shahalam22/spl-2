import * as categoryService from '../services/categoryService.js';

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(parseInt(req.params.id));
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a category by ID
export const updateCategory = async (req, res) => {
  try {
    const category = await categoryService.updateCategory(parseInt(req.params.id), req.body);
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a category by ID
export const deleteCategory = async (req, res) => {
  try {
    await categoryService.deleteCategory(parseInt(req.params.id));
    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
