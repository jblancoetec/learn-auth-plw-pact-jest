import { handleSignInUserErrors } from "./controllers/handleSignInUserErrors";
import { signInUser } from "./controllers/signInUser";

export const POST = async (req: Request): Promise<Response> => {
  try {
    return await signInUser(await req.json());
  } catch (error) {
    return handleSignInUserErrors(error);
  }
};
