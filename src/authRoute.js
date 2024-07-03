import express from "express";

const router = express.Router();

// API-10 : Register
router.post("/register", (req, res) => {
	res.send("POST /api/auth/register");
});

// API-11 : Login
router.post("/login", (req, res) => {
	res.send("POST api/auth/profile");
});
// API-12 : Get User
router.post("/profile", (req, res) => {
	res.send("POST api/auth/profile");
});
// API-13 : Update User Profile
router.patch("/profile", (req, res) => {
	res.send("PATCH api/auth/profile");
});
// API-14 : Delete User Profile
router.delete("/profile", (req, res) => {
	res.send("DELETE api/auth/profile");
});

export default router;
