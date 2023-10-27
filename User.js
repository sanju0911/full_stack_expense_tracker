const db = require("../db");

class User {
  static loginUser(name, password) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM customers WHERE name =? AND password =?";
      db.query(query, [name, password], (err, results) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
  static listAllReviews() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM customers";
      db.query(query, (err, results) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static createUser(name, email, phone, password) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO customers (name, email, phone, password) VALUES (?, ?, ?, ?)",
        [name, email, phone, password],
        (err, results) => {
          if (err) {
            reject(err); // Add error handling here
          } else {
            resolve(results.insertId);
          }
        }
      );
    });
  }
}

module.exports = User;
