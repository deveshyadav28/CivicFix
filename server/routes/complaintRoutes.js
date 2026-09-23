const express = require("express");

const {
  createComplaint,
  getMyComplaints,
  getMyComplaintById,
} = require("../controllers/complaintController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
//logic are written in complaintController.js 
// Create complaint
router.post(
  "/",
  authMiddleware,
  createComplaint
);

// Get logged user's complaints
router.get(
  "/my",
  authMiddleware,
  getMyComplaints
);

//sigle complaint

router.get(
  "/:id",
  authMiddleware,
  getMyComplaintById,
);

module.exports = router;