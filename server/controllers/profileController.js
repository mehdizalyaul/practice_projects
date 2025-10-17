import {
  getAllProfiles,
  addProfile,
  deleteProfile,
} from "../models/profileModel.js";

export const fetchProfiles = async (req, res, next) => {
  try {
    const profiles = await getAllProfiles();
    res.status(200).json(profiles);
  } catch (error) {
    next(error);
  }
};

export const createProfile = async (req, res, next) => {
  try {
    const { name } = req.body;
    const profile = await addProfile(name);
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const removeProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteProfile(id);
    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    next(error);
  }
};
