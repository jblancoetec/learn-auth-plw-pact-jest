import { signUpUserIfRequestIsValid } from "./controller";
import { reply } from "./response";

const POST = async (req: Request): Promise<Response> => {
  const data = await req.json();
  const result = await signUpUserIfRequestIsValid(data);
  return reply(result);
};

export { POST };
