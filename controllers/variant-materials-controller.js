const { prisma } = require("../database/db_connect");


const getAllVariantMaterials = async (req, res) => {
    try {
        const variantMaterials = await prisma.vARIANT_MATERIALS.findMany({
            include: {
                variant: true, // Includes the linked SHOPIFY_VARIANTS
                rawMaterial: true // Includes the linked RAW_MATERIALS
            },
        });
        return res.status(200).json(variantMaterials);
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ message: "Error in fetching variant materials" });
    }
};


const getVariantMaterialById = async (req, res) => {
    const { variantId, rawMaterialId } = req.params;
    try {
        const variantMaterial = await prisma.vARIANT_MATERIALS.findUnique({
            where: {
                variantId_rawMaterialId: {
                    variantId: parseInt(variantId),
                    rawMaterialId: parseInt(rawMaterialId),
                },
            },
            include: {
                variant: true,
                rawMaterial: true,
            },
        });
        if (!variantMaterial) {
            return res.status(404).json({ message: "Variant material not found" });
        }
        res.status(200).json(variantMaterial);
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ message: "Error in fetching variant material by ID" });
    }
};

// Add a new variant material
const addVariantMaterial = async (req, res) => {
    const { variantId, rawMaterialId, avgQuantity } = req.body;
    try {
        const variantMaterial = await prisma.vARIANT_MATERIALS.create({
            data: {
                variantId: parseInt(variantId),
                rawMaterialId: parseInt(rawMaterialId),
                avgQuantity: parseFloat(avgQuantity),
            },
        });
        res.status(201).json(variantMaterial);
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ message: "Error in adding variant material" });
    }
};

// Update a variant material by composite key
const updateVariantMaterial = async (req, res) => {
    const { variantId, rawMaterialId } = req.params;
    const { avgQuantity } = req.body;
    try {
        const variantMaterial = await prisma.vARIANT_MATERIALS.update({
            where: {
                variantId_rawMaterialId: {
                    variantId: parseInt(variantId),
                    rawMaterialId: parseInt(rawMaterialId),
                },
            },
            data: {
                avgQuantity: parseFloat(avgQuantity),
            },
        });
        res.status(200).json(variantMaterial);
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ message: "Error in updating variant material" });
    }
};

// Delete a variant material by composite key
const deleteVariantMaterial = async (req, res) => {
    const { variantId, rawMaterialId } = req.params;
    try {
        await prisma.vARIANT_MATERIALS.delete({
            where: {
                variantId_rawMaterialId: {
                    variantId: parseInt(variantId),
                    rawMaterialId: parseInt(rawMaterialId),
                },
            },
        });
        res.status(200).json({ message: "Variant material deleted successfully" });
    } catch (e) {
        console.error(e.message);
        res.status(400).json({ message: "Error in deleting variant material" });
    }
};

module.exports = {
    getAllVariantMaterials,
    getVariantMaterialById,
    addVariantMaterial,
    updateVariantMaterial,
    deleteVariantMaterial,
};
