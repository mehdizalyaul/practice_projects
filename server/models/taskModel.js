import db from "../db.js";

// Get all tasks
export const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM tasks", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Add new task
export const add = (title, description, userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO tasks (title,description, user_id) VALUES (?, ? , ?)",
      [title, description, userId],
      (err, results) => {
        if (err) return reject(err);
        resolve({
          id: results.insertId,
          title,
          description,
          status: "todo",
          userId,
        });
      }
    );
  });
};

// Update (toggle completed)
export const toggle = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE tasks SET completed = NOT completed WHERE id = ?",
      [id],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

// Delete task
export const deleteOne = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM tasks WHERE id = ?", [id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// GET A USER BY ID
export const getTasksById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tasks WHERE user_id = ? ";
    db.query(sql, [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};
