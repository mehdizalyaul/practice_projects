import { body, param } from "express-validator";

export const validateProfile = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name required")
    .matches(/[a-zA-Z]/)
    .withMessage("Name must contain at least one letter"),
];

export const validateId = [
  param("id").isInt().withMessage("Profile ID must be an integer"),
];
