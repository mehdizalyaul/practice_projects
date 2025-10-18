import db from "../db.js";

export const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM profiles", (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

export const create = (name) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO profiles (name) VALUES ( ? )",
      [name],
      (error, results) => {
        if (error) {
          return reject(error);
        }

        resolve({ id: results.insertId, name });
      }
    );
  });
};

export const deleteOne = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM profiles WHERE id = ?", [id], (error, results) => {
      if (error) {
        return reject(error);
      }

      resolve(results);
    });
  });
};
