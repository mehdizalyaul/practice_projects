import express from "express";
import {
  fetchProfiles,
  createProfile,
  removeProfile,
} from "../controllers/profileController.js";
import { validateId, validateProfile } from "../validators/validateProfile.js";
import { validate } from "../middleware/validate.js";
const router = express.Router();

router.get("/", fetchProfiles);
router.post("/", validateProfile, validate, createProfile);
router.delete("/:id", validateId, validate, removeProfile);

export default router;
