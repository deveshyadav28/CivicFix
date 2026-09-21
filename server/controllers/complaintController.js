const Complaint = require("../models/Complaint");

// Create Complaint--  improvement krna hai 
const createComplaint = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      image,
    } = req.body;

    if (!title || !description || !category || !location) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const complaint = await Complaint.create({
      title,
      description,
      category,
      location,
      image: image || "",
      user: req.user.userId,
    });

    res.status(201).json({
      message: "Complaint created successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get My Complaints
const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//admin logic start -improvement..

// Get all Complaints

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get single Complaint

const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(
      req.params.id
    ).populate("user", "name email");

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// Update Complaint Status

const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = [
      "Pending",
      "Assigned",
      "In Progress",
      "Resolved",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const complaint = await Complaint.findById(
      req.params.id
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    complaint.status = status;

    await complaint.save();

    res.status(200).json({
      message: "Complaint status updated",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Assign Complaint to someon....

const assignComplaint = async (req, res) => {
  try {
    const { assignedTo } = req.body;

    if (!assignedTo) {
      return res.status(400).json({
        message: "Department/person is required",
      });
    }

    const complaint = await Complaint.findById(
      req.params.id
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    complaint.assignedTo = assignedTo;

    // Automatically change status
    if (complaint.status === "Pending") {
      complaint.status = "Assigned";
    }

    await complaint.save();

    res.status(200).json({
      message: "Complaint assigned successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
  assignComplaint,
};