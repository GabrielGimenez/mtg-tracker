import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { password } = req.body;

  if (password === process.env.AUTH_PASSWORD) {
    // Set HTTP-only cookie
    res.setHeader(
      "Set-Cookie",
      serialize("auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      }),
    );

    return res.status(200).json({ authenticated: true });
  }

  return res.status(401).json({ authenticated: false });
}
