import { signUpUserIfRequestIsValid } from "./controller";
import { reply } from "./response";

const POST = async (req: Request): Promise<Response> => {
  const result = await signUpUserIfRequestIsValid(req.body);
  return reply(result);
};

export { POST };
