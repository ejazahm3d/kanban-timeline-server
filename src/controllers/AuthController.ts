import { Request, Response } from "express";
// import bcryptjs from "bcryptjs";

// @route       POST   api/auth
// @description Authenticate User and get token
// @access      Public

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, hash } = req.body;

    return res.json({ message: "Success. User Registered" });
  } catch (error) {
    return res.json({ Error: error.message });
  }
};
