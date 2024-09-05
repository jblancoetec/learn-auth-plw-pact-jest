import { HttpError } from "@/app/api/errors";
import { Prisma } from "@prisma/client";

export const handleSignInUserErrors = (error: unknown): Response => {
  const isPrismaError =
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientUnknownRequestError;
  if (isPrismaError) {
    return Response.json(
      { error: "Error en la base de datos" },
      { status: 500 },
    );
  }
  const isHttpError = error instanceof HttpError;
  if (isHttpError) {
    return Response.json({ error: error.message }, { status: error.status });
  }
  return Response.json({ error: "Error interno desconocido" }, { status: 500 });
};
