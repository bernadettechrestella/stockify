const db = require("../config/db");
// Fungsi helper untuk query database MySQL dengan Promise
// 1. Menerima query dan parameter
// 2. Eksekusi query ke database
// 3. Jika sukses, resolve hasil
// 4. Jika gagal, reject error
const dbQuery = async (query, params = []) => {
    try {
        const [rows] = await db.query(query, params);
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = dbQuery;