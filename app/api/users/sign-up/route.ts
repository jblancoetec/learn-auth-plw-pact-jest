import { handleSignUpUserErrors } from "./controller/handleSignUpUserErrors";
import { signUpUser } from "./controller/signUpUser";

const POST = async (req: Request): Promise<Response> => {
  try {
    return await signUpUser(req);
  } catch (error) {
    return handleSignUpUserErrors(error);
  }
};

export { POST };
