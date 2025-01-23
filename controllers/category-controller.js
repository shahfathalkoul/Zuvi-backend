const { prisma } = require("../database/db_connect");

const getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.cATEGORIES.findMany();
        return res.status(200).json(categories);
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ message: "Error in getting all categories" });
    }
};

const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await prisma.cATEGORIES.findUnique({
            where: { id: parseInt(id) },
        });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ message: "Error in getting category by ID" });
    }
};

const addCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = await prisma.cATEGORIES.create({
            data: {
                name,
            },
        });
        res.status(201).json(category);
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ message: "Error in adding category" });
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const category = await prisma.cATEGORIES.update({
            where: { id: parseInt(id) },
            data: {
                name,
            },
        });
        res.status(200).json(category);
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ message: "Error in updating category" });
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.cATEGORIES.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ message: "Error in deleting category" });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
};


