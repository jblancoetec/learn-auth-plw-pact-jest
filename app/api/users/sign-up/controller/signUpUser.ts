import { parse } from "../parser";
import { create } from "../repo";
import { reply } from "../response";

export const signUpUser = async (request: Request): Promise<Response> => {
  const data = parse(await request.json());
  const user = await create(data);
  return reply(user);
};
