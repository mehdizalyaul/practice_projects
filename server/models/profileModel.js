import db from "../db.js";

export const getAllProfiles = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM profiles", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const addProfile = (name) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO profiles (name) VALUES ( ? )",
      [name],
      (err, results) => {
        if (err) return reject(err);
        resolve({ id: results.insertId, name });
      }
    );
  });
};

export const deleteProfile = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM profiles WHERE id = ?", [id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
