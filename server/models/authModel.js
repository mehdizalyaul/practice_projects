import db from "../db.js";

export const create = (name, email, passwordHash, role) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (username, email, password_hash,role) VALUES ( ? , ? , ? , ? )",
      [name, email, passwordHash, role],
      (err, results) => {
        if (err) return reject(err);
        resolve(results.insertId);
      }
    );
  });
};

export const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};
