import { body, param } from "express-validator";

export const validateTask = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .matches(/[a-zA-Z]/)
    .withMessage("Title must contain at least one letter"),
];

export const validateId = [
  param("id").isInt().withMessage("Task ID must be an integer"),
];
