import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import jwt from "jsonwebtoken";
import { Account } from "../entity/User";
import config = require("config");

export class UserController {
  static newUser = async (req: Request, res: Response): Promise<Response> => {
    const {
      username,
      password,
      email
    }: { username: string; password: string; email: string } = req.body;
    const user = new Account();
    user.username = username;
    user.password = password;
    user.email = email;

    // Validate the params
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    // Hash the password
    user.hashPassword();
    // Try to save if it fails, the username is already in use
    const userRepository = getRepository(Account);
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send("username already in use");
      return;
    }
    // Json Web Token
    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 36000 },
      (errors: Error, token: string): void => {
        if (errors) throw errors;
        res.json({ token });
      }
    );
  };
}
