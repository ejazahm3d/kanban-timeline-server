import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";

import { Account } from "../entity/User";
import config from "config";

class AuthController {
  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).send();
    }

    //Get user from database
    const userRepository = getRepository(Account);
    let user: Account;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    //Check if encrypted password match
    try {
      const isMatch = await user.checkIfUnencryptedPasswordIsValid(password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }
    } catch (error) {}

    //Sing JWT, valid for 1 hour
    const payload = {
      user: {
        id: user.id
      }
    };

    //Send the jwt in the response
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) console.log(err);
        res.json({ token });
      }
    );
  };
}
export default AuthController;
