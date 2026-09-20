const express = require("express");

const {
  signup,
  login,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
//public routes
router.post("/signup", signup);

router.post("/login", login);

router.get("/me" ,authMiddleware , (req ,res)=>{
  res.json({
    message:"you are authenticated",
    user:req.user,
  })
})

module.exports = router;