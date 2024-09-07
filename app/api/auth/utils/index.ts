import jose from "jose";
import { InternalServerError } from "@/app/api/errors";

const secret = process.env.JWT_SECRET ?? "secret";

export const encryptID = async (id: string): Promise<string> => {
  try {
    const key = await jose.generateSecret(secret);
    const token = new jose.SignJWT({ id });
    token.setProtectedHeader({ alg: "HS256" });
    token.setExpirationTime("1h");
    return await token.sign(key);
  } catch (error) {
    throw new InternalServerError("Error al autenticar el usuario");
  }
};

export const decryptID = async (token: string): Promise<string> => {
  try {
    const key = await jose.generateSecret(secret);
    const session = await jose.jwtVerify<{ id: string }>(token, key);
    return session.payload?.id;
  } catch (error) {
    throw new InternalServerError("Error al autenticar el usuario");
  }
};
