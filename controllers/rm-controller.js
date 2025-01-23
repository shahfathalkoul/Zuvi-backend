const { prisma } = require("../database/db_connect");


const getAllRM = async (req, res) => {
    try {
        const rawMaterials = await prisma.rAW_MATERIALS.findMany();
        res.status(200).json(rawMaterials);
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ message: "Error in getting all raw materials" });
    }
};


const getRMById = async (req, res) => {
    const { id } = req.params;
    try {
        const rawMaterial = await prisma.rAW_MATERIALS.findUnique({
            where: { id: parseInt(id) },
        });
        if (!rawMaterial) {
            return res.status(404).json({ message: "Raw material not found" });
        }
        res.status(200).json(rawMaterial);
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ message: "Error in getting raw material by ID" });
    }
};


const addRM = async (req, res) => {
    const {
        name,
        SKU,
        quantity,
        price,
        image,
        description,
        expiry_date,
        quality_status,
        storage_location,
    } = req.body;
    try {
        const rawMaterial = await prisma.rAW_MATERIALS.create({
            data: {
                name,
                SKU,
                quantity,
                price: parseFloat(price),
                image,
                description,
                expiry_date: new Date(expiry_date),
                quality_status,
                storage_location,
            },
        });
        res.status(201).json(rawMaterial);
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ message: "Error in adding raw material" });
    }
};


const updateRM = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        SKU,
        quantity,
        price,
        image,
        description,
        expiry_date,
        quality_status,
        storage_location,
    } = req.body;
    try {
        const rawMaterial = await prisma.rAW_MATERIALS.update({
            where: { id: parseInt(id) },
            data: {
                name,
                SKU,
                quantity,
                price: parseFloat(price),
                image,
                description,
                expiry_date: new Date(expiry_date),
                quality_status,
                storage_location,
            },
        });
        res.status(200).json(rawMaterial);
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ message: "Error in updating raw material" });
    }
};


const deleteRM = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.rAW_MATERIALS.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: "Raw material deleted successfully" });
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ message: "Error in deleting raw material" });
    }
};

module.exports = {
    getAllRM,
    getRMById,
    addRM,
    updateRM,
    deleteRM,
};
