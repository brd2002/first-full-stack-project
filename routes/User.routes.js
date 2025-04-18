import express from "express";
import  {registerUser ,  verifyUser , loginUser}  from "../controller/User.controller.js";
const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token" ,  verifyUser); 
router.post("/login" , loginUser)
export default router;
