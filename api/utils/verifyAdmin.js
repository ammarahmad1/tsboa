// utils/verifyAdmin.js
import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

const ADMIN_ID = '658eb5cf48d721a2cf795fad';

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Decoded Token:', decoded);

    if (decoded.id === ADMIN_ID) {
      // Check if the decoded user ID matches the admin ID
      req.user = decoded;
      next();
    } else {
      return next(errorHandler(403, 'Forbidden'));
    }
  } catch (error) {
    next(errorHandler(401, 'Unauthorized'));
  }
};
