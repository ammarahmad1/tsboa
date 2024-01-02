import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  console.log('Executing verifyToken middleware');
  const token = req.cookies.access_token;
  console.log(token)
  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Log the error to the terminal
      console.error('JWT Verification Error:', err);
      return next(errorHandler(403, 'Forbidden'));
    }

    // Log the decoded user information to the terminal
    console.log('Decoded User Information:', user);

    // Attach the user information to the request object
    req.user = user;

    // Move to the next middleware
    next();
  });
};
