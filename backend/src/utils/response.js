const success = (res, message = "Success", data = null, status = 200) => {
    return res.status(status).json({
        success: true,
        message,
        data
    });
}

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