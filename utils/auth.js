require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_before_production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Hash a password using bcrypt
async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Compare a plain text password with a hashed password
async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

// Generate a JWT token for a user
function generateToken(userId, opts = {}) {
  const payload = { userId };
  const signOptions = {
    expiresIn: opts.expiresIn || JWT_EXPIRES_IN,
    // you can add issuer/audience if desired:
    // issuer: process.env.JWT_ISSUER,
    // audience: process.env.JWT_AUDIENCE
  };
  return jwt.sign(payload, JWT_SECRET, signOptions);
}

// Verify a JWT token (throws on invalid)
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // Re-throw a clearer error so calling code can return 401
    const error = new Error('Invalid or expired token');
    error.original = err;
    throw error;
  }
}

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken
};
