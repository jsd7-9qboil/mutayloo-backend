import express from "express";
import {
  addAddress,
  getAllAddress,
  getAddressByID,
  getAddressByCustomer,
  updateAddress,
  deleteAddress
} from "../controllers/addressController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addAddress", authMiddleware, addAddress);
router.get("/getAllAddress", getAllAddress);
//TODO ยังทำงานไม่ได้ router.get("/:id", authMiddleware, getAddressByCustomer);
router.get("/:id", authMiddleware, getAddressByID);
router.patch("/:id", authMiddleware, updateAddress);
router.delete("/:id", authMiddleware, deleteAddress);

export default router;
