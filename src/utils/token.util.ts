import { IToken } from "@/interfaces/token.interface";
import { getById } from "@/services/user.service";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as IToken;
    const _user = await getById(decoded.userId);
    if (!_user) return null;
    const user = {
      id: _user?.id,
      email: _user?.email,
      name: _user?.name,
      lastName: _user?.lastName,
      createdAt: _user?.createdAt,
      role: _user?.role,
    };
    return user;
  } catch (error) {
    throw new Error("Token no valido");
  }
}

export const generateResetToken = (userId: number) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
