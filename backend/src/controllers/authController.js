
const { success, error } = require("../utils/response");
const asyncHandler = require("../utils/asyncHandler");
const dbQuery = require("../utils/dbQuery");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Fungsi untuk register user baru
// 1. Validasi input
// 2. Cek apakah email sudah terdaftar
// 3. Hash password
// 4. Simpan user ke database
// 5. Response sukses
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return error(res, "All fields are required", 400);
  }
  const results = await dbQuery("SELECT email FROM users WHERE email = ?", [email]);
  if (results.length > 0) {
    return error(res, "Email already registered", 409);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await dbQuery("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
  return success(res, "User registered successfully", null, 201);
});

// Fungsi untuk login user
// 1. Validasi input
// 2. Cari user berdasarkan email
// 3. Cek password
// 4. Generate accessToken & refreshToken
// 5. Simpan refreshToken di cookie
// 6. Response accessToken
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return error(res, "Email and password required", 400);
  }
  const results = await dbQuery("SELECT * FROM users WHERE email = ?", [email]);
  if (results.length === 0) {
    return error(res, "Invalid email or password", 401);
  }
  const user = results[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return error(res, "Invalid email or password", 401);
  }
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    path: "/",
  });
  return success(res, "Login successful", { accessToken });
});

// Fungsi untuk refresh accessToken menggunakan refreshToken dari cookie
// 1. Ambil refreshToken dari cookie
// 2. Verifikasi refreshToken
// 3. Generate accessToken baru
// 4. Response accessToken
exports.refresh = asyncHandler((req, res, next) => {
  const token = req.cookies.refreshToken;
  if (!token) return error(res, "No refresh token", 401);
  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return error(res, "Invalid refresh token", 403);
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    return success(res, "Token refreshed", { accessToken });
  });
});

// Fungsi untuk logout user
// 1. Hapus cookie refreshToken
// 2. Response sukses
exports.logout = asyncHandler((req, res, next) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    path: "/"
  });
  return success(res, "Logout successful");
});


