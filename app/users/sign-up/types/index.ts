import { User } from "@/app/users/types";

export type SignUpProps = User &
  Readonly<{ password: string; confirm: string }>;
