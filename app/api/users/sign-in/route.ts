import { handleSignInUserErrors } from "./controllers/handleSignInUserErrors";
import { signInUser } from "./controllers/signInUser";

export const POST = async (req: Request): Promise<Response> => {
  try {
    return await signInUser(req.json());
  } catch (error) {
    return handleSignInUserErrors(error);
  }
};
