const db = require("../config/db");
// Fungsi helper untuk query database MySQL dengan Promise
// 1. Menerima query dan parameter
// 2. Eksekusi query ke database
// 3. Jika sukses, resolve hasil
// 4. Jika gagal, reject error
const dbQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

module.exports = dbQuery;