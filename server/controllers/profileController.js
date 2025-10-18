import * as Profile from "../models/profileModel.js";

export const fetchProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.getAll();
    res.status(200).json(profiles);
  } catch (error) {
    next(error);
  }
};

export const createProfile = async (req, res, next) => {
  try {
    const { name } = req.body;
    const profile = await Profile.create(name);
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const removeProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Profile.deleteOne(id);
    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    next(error);
  }
};
