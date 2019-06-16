import db from "../config/db";
import { Request, Response } from "express";

export const getValues = async (req: Request, res: Response) => {
  const response = await db.query("SELECT * FROM values");
  return res.json(response.rows);
};

export const getValueById = async (req: Request, res: Response) => {
  const response = await db.query('SELECT * FROM values where "id" = $1 ', [
    req.params.id
  ]);
  return res.json(response.rows);
};
