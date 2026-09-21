const express = require("express");

const {
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
  assignComplaint,
} = require("../controllers/complaintController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Every route below requires admin
router.use(authMiddleware, adminMiddleware);

//admin complaints routes

router.get("/complaints", getAllComplaints);

router.get(
  "/complaints/:id",
  getComplaintById
);

router.patch(
  "/complaints/:id/status",
  updateComplaintStatus
);

router.patch(
  "/complaints/:id/assign",
  assignComplaint
);

module.exports = router;