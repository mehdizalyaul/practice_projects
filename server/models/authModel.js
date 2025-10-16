import db from "../db.js";

export const createUser = (name, email, passwordHash) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (username, email, password_hash) VALUES ( ? , ? , ? )",
      [name, email, passwordHash],
      (err, results) => {
        if (err) return reject(err);
        resolve(results.insertId);
      }
    );
  });
};

export const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};
