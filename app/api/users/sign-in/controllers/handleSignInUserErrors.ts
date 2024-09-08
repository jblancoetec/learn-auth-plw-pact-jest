import { HttpError } from "@/app/api/errors";

export const handleSignInUserErrors = (error: unknown): Response => {
  const isHttpError = error instanceof HttpError;
  if (isHttpError) {
    return Response.json({ message: error.message }, { status: error.status });
  }
  return Response.json(
    { message: "Algo inesperado ocurrio con el servicio" },
    { status: 500 }
  );
};
