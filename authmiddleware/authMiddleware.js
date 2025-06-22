const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');

// Your secret keys (keep them safe, use env vars in real apps)
const JWT_SECRET = 'process.env.JWT_SECRET';
const CRYPTO_SECRET = 'process.env.SECRET_KEY';

// Middleware to verify JWT token encrypted with CryptoJS
const authMiddleware = (req, res, next) => {
  try {
    // 1. Get token from Authorization header
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization header missing or malformed' });
    }

    // 2. Extract encrypted token string after 'Bearer '
    const encryptedToken = authHeader.split(' ')[1];

    if (!encryptedToken) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    // 3. Decrypt the token using CryptoJS
    let bytes;
    try {
      bytes = CryptoJS.AES.decrypt(encryptedToken, CRYPTO_SECRET);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid token encryption' });
    }

    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedToken) {
      return res.status(400).json({ error: 'Failed to decrypt token' });
    }

    // 4. Verify JWT token
    jwt.verify(decryptedToken, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
      }

      // 5. Attach decoded info to request and call next()
      req.user = decoded;
      next();
    });
  } catch (err) {
    // Catch any unexpected errors
    console.error('Auth middleware error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied: insufficient role' });
    }
    next();
  };
};


module.exports = {authMiddleware, authorizeRoles};