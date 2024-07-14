import express from "express";
import {
    createHoroscope,
    getHoroscopes,
    getHoroscopeById,
    updateHoroscope,
    deleteHoroscope,
} from "../controllers/horoscopeController.js";

// import middleware

import adminMiddleware from "../middleware/adminMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getHoroscopes); // Get all horoscopes
router.get("/:id", getHoroscopeById); // Get a horoscope by ID
router.post("/create", authMiddleware, adminMiddleware, createHoroscope); // Create a new horoscope
router.patch("/update/:id",authMiddleware, adminMiddleware, updateHoroscope); // Update a horoscope
router.delete("/delete/:id",authMiddleware, adminMiddleware, deleteHoroscope); // Delete a horoscope

export default router;