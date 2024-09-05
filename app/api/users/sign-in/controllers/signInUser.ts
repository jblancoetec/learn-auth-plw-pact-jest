import { parse } from "../parser";
import { find } from "../repo";
import { reply } from "../response";
import { signIn } from "../session";

export const signInUser = async (request: any): Promise<Response> => {
  const data = parse(request);
  const user = await find(data);
  const session = signIn(user);
  return reply(session);
};
