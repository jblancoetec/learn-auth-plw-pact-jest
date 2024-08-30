import { signInUserIfRequestIsValid } from "./controller";

const GET = (req: Request) => {
  const result = signInUserIfRequestIsValid(req.body);
  const code = result.found ? 200 : 404;
  return Response.json(result, { status: code });
};

export { GET };
