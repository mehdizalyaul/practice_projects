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
export const add = (title) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO tasks (title, completed) VALUES (?, ?)",
      [title, false],
      (err, results) => {
        if (err) return reject(err);
        resolve({ id: results.insertId, title, completed: false });
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
