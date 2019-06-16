import jwt from "jsonwebtoken";
import config from "config";
import { Request, Response, NextFunction } from "express";

export default function(req: Request, res: Response, next: NextFunction) {
  // Get Token from the header
  const token = req.header("x-auth-token");
  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, Auth Denied" });
  }
  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    res.locals.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token not valid" });
  }
}
