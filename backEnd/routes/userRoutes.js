import express from "express";
const router = express.Router();
const app = express();
import { protect,admin } from "../middleWare/protect.js";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

router.post("/", registerUser);
router.post("/login", authUser);

// router.use(protect);
router.get("/",protect,admin, getUsers);
router.post("/logout", logoutUser);
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile);
router.route("/:id").delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser);
    

export default router;

