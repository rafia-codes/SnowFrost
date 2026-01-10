import 'dotenv/config';
import handler from '../util/errorHandler.js';
import jwt from 'jsonwebtoken';

const verify = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token)
      return res.status(401).json({ message: 'Unauthorized' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: payload.userId,
      role: payload.role
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default handler(verify);
