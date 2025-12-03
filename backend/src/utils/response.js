// Fungsi helper untuk response sukses
// 1. Kirim response dengan status 200, data, dan pesan
const success = (res, message = "Success", data = null, status = 200) => {
    return res.status(status).json({
        success: true,
        message,
        data
    });
}

// Fungsi helper untuk response error
// 1. Kirim response dengan status error, pesan, dan detail error
const error = (res, message = "Error", status = 500, errors = null) => {
    return res.status(status).json({
        success: false,
        message,
        errors
    });
}

module.exports = {
    success,
    error
};