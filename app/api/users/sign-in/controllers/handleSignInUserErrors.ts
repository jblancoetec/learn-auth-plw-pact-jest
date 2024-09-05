import { HttpError } from "@/app/api/errors";

export const handleSignInUserErrors = (error: unknown): Response => {
  const isHttpError = error instanceof HttpError;
  if (isHttpError) {
    return Response.json({ error: error.message }, { status: error.status });
  }
  return Response.json({ error: "Error interno desconocido" }, { status: 500 });
};
