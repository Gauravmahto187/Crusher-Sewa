import { Router } from "express";
import { requireAuth, authorizeRoles } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";
import {
  getMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from "../controllers/materialController.js";

const router = Router();

// GET /api/materials - Accessible to all authenticated users
router.get("/", requireAuth, getMaterials);

// POST /api/materials - ADMIN/MANAGER only (with image upload)
router.post(
  "/",
  requireAuth,
  authorizeRoles("ADMIN", "MANAGER"),
  upload.single("image"),
  createMaterial
);

// PATCH /api/materials/:id - ADMIN/MANAGER only (optional image update)
router.patch(
  "/:id",
  requireAuth,
  authorizeRoles("ADMIN", "MANAGER"),
  upload.single("image"),
  updateMaterial
);

// DELETE /api/materials/:id - ADMIN only
router.delete(
  "/:id",
  requireAuth,
  authorizeRoles("ADMIN"),
  deleteMaterial
);

export default router;
