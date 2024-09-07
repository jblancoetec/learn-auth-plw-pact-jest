import { User } from "@/app/api/types";
import { encryptID } from "./utils";

type SessionResult = {
  token: string;
};

export const session = async (user: User): Promise<SessionResult> => {
  const token = await encryptID(user.id);
  return {
    token,
  };
};
