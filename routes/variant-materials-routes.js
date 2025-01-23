const { Router } = require("express");
const { getAllVariantMaterials, getVariantMaterialById, addVariantMaterial, updateVariantMaterial, deleteVariantMaterial } = require("../controllers/variant-materials-controller");


const variantMaterialsRoutes = Router();
variantMaterialsRoutes.get("/", getAllVariantMaterials);
variantMaterialsRoutes.get("/:variantId", getVariantMaterialById);
variantMaterialsRoutes.post("/add", addVariantMaterial);
variantMaterialsRoutes.put("/:variantId/:rawMaterialId", updateVariantMaterial);
variantMaterialsRoutes.delete("/:variantId/:rawMaterialId", deleteVariantMaterial);

module.exports = variantMaterialsRoutes;
