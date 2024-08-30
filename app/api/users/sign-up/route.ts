import { signUpUserIfRequestIsValid } from "./controller";
import { reply } from "./response";

const POST = (req: Request) => {
  const result = signUpUserIfRequestIsValid(req.body);
  return reply(result);
};

export { POST };
