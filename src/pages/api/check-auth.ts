import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const auth = req.cookies.auth;
  res.json({ authenticated: auth === "true" });
}
