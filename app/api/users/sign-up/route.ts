import { signUpUserIfRequestIsValid } from "./controller";
import { statusCode } from "./utils";

const POST = (req: Request) => {
  const result = signUpUserIfRequestIsValid(req.body);
  const code = statusCode.get(result.state);
  return Response.json(result, { status: code });
};

export { POST };
