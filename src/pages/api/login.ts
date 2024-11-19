import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { password } = req.body;

  if (password === process.env.AUTH_PASSWORD) {
    res.status(200).json({ authenticated: true });
  } else {
    console.log(process.env.AUTH_PASSWORD);
    console.log(password);
    res.status(401).json({ authenticated: false });
  }
}
