import db from "../db.js"; // your MySQL connection

// Get all tasks
export const getAllTasks = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM tasks", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Add new task
export const addTask = (title) => {
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
export const toggleTask = (id) => {
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
export const deleteTask = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM tasks WHERE id = ?", [id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
