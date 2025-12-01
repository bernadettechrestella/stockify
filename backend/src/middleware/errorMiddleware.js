const { error } = require("../utils/response");

const errorMiddleware = (err, req, res, next) => {
    console.error("ERROR:", err);

    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return error(res, message, status, err.errors || null);
};

module.exports = errorMiddleware;