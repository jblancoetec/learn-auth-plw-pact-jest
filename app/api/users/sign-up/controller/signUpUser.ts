import { parse } from "../parser";
import { create } from "../repo";
import { reply } from "../response";

export const signUpUser = async (request: any): Promise<Response> => {
  const data = parse(request);
  const user = await create(data);
  return reply(user);
};
