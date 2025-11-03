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
export const add = (newTask, userId) => {
  const { title, description, status, priority, dueDate } = newTask;

  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO tasks (title,description, status, priority,dueDate,user_id ) VALUES (? ,? ,? ,? ,? ,? )",
      [title, description, status, priority, dueDate, userId],
      (err, results) => {
        if (err) return reject(err);
        resolve({
          id: results.insertId,
          title,
          description,
          status,
          priority,
          dueDate,
        });
      }
    );
  });
};

// Update
export const update = (newTask) => {
  const { id, title, description, status, priority, dueDate } = newTask;
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE tasks SET title = ? , description = ? , status = ? , priority = ? , dueDate = ? WHERE id = ?",
      [title, description, status, priority, dueDate, id],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

// Update Status
export const updateStatus = (id, status) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE tasks SET status = ? WHERE id = ?",
      [status, id],
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
