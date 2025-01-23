const { prisma } = require("../database/db_connect");

const getAllVariants = async (req, res) => {
    try {
        const variants = await prisma.sHOPIFY_VARIANTS.findMany();
        res.status(200).json(variants);
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ message: "Error in getting all variants" });
    }
};

const getVariantById = async (req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({ message: "Please provide ID" });
    }

    try {
        const variant = await prisma.sHOPIFY_VARIANTS.findUnique({
            where: { id: parseInt(id) },
        });
        if (!variant) {
            return res.status(404).json({ message: "Variant not found" });
        }
        res.status(200).json(variant);
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ message: "Error in getting variant by ID" });
    }
};

const addVariant = async (req, res) => {
    const { productId, name, img } = req.body;

    if(!productId || !name || !img) {
        return res.status(400).json({ message: "Please provide all details" });
    }

    try {
        const variant = await prisma.sHOPIFY_VARIANTS.create({
            data: {
                productId,
                name,
                img,
            },
        });
        res.status(201).json(variant);
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ message: "Error in adding variant" });
    }
};

const updateVariant = async (req, res) => {
    const { id } = req.params;
    const { productId, name, img } = req.body;
    try {
        const variant = await prisma.sHOPIFY_VARIANTS.update({
            where: { id: parseInt(id) },
            data: {
                productId,
                name,
                img,
            },
        });
        res.status(200).json(variant);
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ message: "Error in updating variant" });
    }
};

const deleteVariant = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.sHOPIFY_VARIANTS.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: "Variant deleted successfully" });
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ message: "Error in deleting variant" });
    }
};

module.exports = {
    getAllVariants,
    getVariantById,
    addVariant,
    updateVariant,
    deleteVariant,
};
