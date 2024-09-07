import { authenticate } from "@/app/api/auth/authenticate";
import { parse } from "../parser";
import { reply } from "../response";
import { session } from "@/app/api/auth/session";

export const signInUser = async (request: Request): Promise<Response> => {
  const data = parse(await request.json());
  const user = await authenticate(data);
  const token = await session(user);
  return reply(token);
};
