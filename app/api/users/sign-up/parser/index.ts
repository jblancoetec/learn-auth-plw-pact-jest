import z from "zod";
import { ParseRequestResult } from "./types";

const Request = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(255),
  lastname: z.string().min(2).max(255),
  email: z.string().email(),
  password: z.string().min(8),
  confirm: z.string().min(8),
});

export const parseRequest = (request: any): ParseRequestResult => {
  const user = Request.safeParse(request);
  if (user.error) {
    return { parsed: false, message: user.error.message };
  }
  if (user.data.password !== user.data.confirm) {
    return { parsed: false, message: "Passwords do not match" };
  }
  return {
    parsed: true,
    message: "Props are valid",
    data: user.data,
  };
};
