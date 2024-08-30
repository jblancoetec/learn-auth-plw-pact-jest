import { signInUserIfRequestIsValid } from "./controller";
import { reply } from "./response";

const GET = async (req: Request): Promise<Response> => {
  const result = await signInUserIfRequestIsValid(req.body);
  return reply(result);
};

export { GET };
