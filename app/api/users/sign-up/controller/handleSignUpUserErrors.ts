import { HttpError } from "@/app/api/errors";

export const handleSignUpUserErrors = (error: unknown): Response => {
  const isHttpError = error instanceof HttpError;
  if (isHttpError) {
    return Response.json({ error: error.message }, { status: error.status });
  }
  return Response.json(
    { error: "Algo inesperado ocurrio con el servicio" },
    { status: 500 }
  );
};
