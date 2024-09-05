import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export const GET = async (req: Request): Promise<Response> => {
  const store = cookies();
  const token = store.get("session");
  if (!token) {
    return Response.redirect("/users/sign-in");
  }
  const secret = process.env.JWT_SECRET ?? "secret";
  const data = verify(token.value, secret);
  return Response.json(
    { data },
    {
      headers: { "content-type": "application/json" },
    },
  );
};
