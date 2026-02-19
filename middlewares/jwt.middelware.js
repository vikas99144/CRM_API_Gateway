import jwt from 'jsonwebtoken';
import fs from 'fs';

const publicKey = fs.readFileSync('./keys/public.pem');

export const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, publicKey, {
      algorithms: ['RS256']
    });

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
