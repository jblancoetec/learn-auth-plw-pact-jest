import { Users } from "@prisma/client";

type User = Users;

export const reply = (user: User): Response => {
  return Response.json(
    { name: user.name, lastname: user.lastname, email: user.email },
    { status: 201 },
  );
};
