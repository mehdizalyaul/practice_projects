import { body, param } from "express-validator";

export const validateTask = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .matches(/[a-zA-Z]/)
    .withMessage("Title must contain at least one letter"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),

  body("status")
    .optional()
    .isIn(["todo", "in_progress", "review", "done"])
    .withMessage("Invalid status value"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority value"),

  body("dueDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Invalid date format"),

  body("assignee")
    .optional()
    .trim()
    .isString()
    .withMessage("Assignee must be a string"),
];

export const validateId = [
  param("id").isInt().withMessage("Task ID must be an integer"),
];
