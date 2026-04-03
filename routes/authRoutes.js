// ======================
// 🔹 IMPORT EXPRESS
// ======================
const express = require("express");

// ======================
// 🔹 CREATE ROUTER
// ======================
const router = express.Router(); 
// Mini app → routes handle ചെയ്യാൻ

// ======================
// 🔹 IMPORT CONTROLLERS
// ======================
const { registerUser, loginUser } = require("../controllers/authController");
// Logic functions import ചെയ്യുന്നു

// ======================
// 🔹 ROUTES
// ======================

// REGISTER ROUTE
router.post("/register", registerUser);
// POST /api/auth/register → registerUser run ചെയ്യും

// LOGIN ROUTE
router.post("/login", loginUser);
// POST /api/auth/login → loginUser run ചെയ്യും

// ======================
// 🔹 EXPORT ROUTER
// ======================
module.exports = router;