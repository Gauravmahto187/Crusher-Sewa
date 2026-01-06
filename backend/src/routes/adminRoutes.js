import { Router } from "express";
import { requireAuth, authorizeRoles } from "../middleware/authMiddleware.js";
import {
  createUser,
  createManager,
  listUsers,
  updateUserStatus,
} from "../controllers/adminController.js";

const router = Router();

// All admin routes require authentication and ADMIN role
router.use(requireAuth);
router.use(authorizeRoles("ADMIN"));

router.post("/users/create", createUser);
router.post("/users/create-manager", createManager); // Backward compatibility
router.get("/users", listUsers);
router.patch("/users/:id/status", updateUserStatus);

export default router;

