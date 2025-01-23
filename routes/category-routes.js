const { Router } = require('express');
const {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/category-controller');

const CategoryRoutes = Router();

CategoryRoutes.get('/getAll', getAllCategories);
CategoryRoutes.get('/get/:id', getCategoryById);
CategoryRoutes.post('/add', addCategory);
CategoryRoutes.put('/update/:id', updateCategory);
CategoryRoutes.delete('/delete/:id', deleteCategory);

module.exports = CategoryRoutes;
