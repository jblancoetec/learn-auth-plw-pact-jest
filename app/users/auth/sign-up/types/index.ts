import type { User } from "@/app/types";

export type SignUpUserProps = Readonly<OnCompleteSignUpFormEvent>;

export type OnCompleteSignUpFormProps =
  | User
  | Readonly<{
      password: string;
      passwordToConfirm: string;
    }>;

export type OnCompleteSignUpFormEvent = (
  props: OnCompleteSignUpFormProps,
) => void;
