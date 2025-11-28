const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // 1. Ambil token dari header Authorization
  const authHeader = req.headers["authorization"];

  // Jika tidak ada header
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // 2. Format header biasanya: "Bearer token123"
  const token = authHeader.split(" ")[1];

  // Jika tidak ada token setelah Bearer
  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  // 3. Verifikasi token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(403).json({ message: "Token expired" });
      }
      return res.status(403).json({ message: "Invalid token" });
    }

    // 4. Token valid → simpan data user ke req.user
    req.user = user;

    // 5. Lanjut ke controller berikutnya
    next();
  });
};

module.exports = authMiddleware;
