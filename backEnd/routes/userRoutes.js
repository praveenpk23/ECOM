import express from "express";
const router = express.Router();
const app = express();
import { protect } from "../middleWare/protect.js";
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

router.use(protect);
router.get("/", getUsers);
router.post("/logout", logoutUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.route("/:id").delete(deleteUser).get(getUserById).put(updateUser);
    

export default router;

