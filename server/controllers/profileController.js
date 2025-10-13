import {
  getAllProfiles,
  addProfile,
  deleteProfile,
} from "../models/profileModel.js";

export const fetchProfiles = async (req, res) => {
  try {
    const profiles = await getAllProfiles();
    res.json(profiles);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const profile = await addProfile(name);
    res.json(profile);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const removeProfile = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProfile(id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
