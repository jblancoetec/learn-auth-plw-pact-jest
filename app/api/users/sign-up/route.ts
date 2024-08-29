import { createUserIfRequestIsValid } from "./controller";
import { statusCode } from "./utils";

const POST = (req: Request) => {
  const result = createUserIfRequestIsValid(req.body);
  const code = statusCode.get(result.state);
  return Response.json(result, { status: code });
};

export { POST };
