import express from "express";
import {
  fetchProfiles,
  createProfile,
  removeProfile,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/", fetchProfiles);
router.post("/", createProfile);
router.delete("/:id", removeProfile);

export default router;
