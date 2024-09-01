import { useRouter } from "next/navigation";

export const useBrowser = () => {
  const router = useRouter();
  const toSignUpPage = () => router.push("/users/auth/sign-up");
  const toSignInPage = () => router.push("/users/auth/sign-in");
  return { toSignInPage, toSignUpPage } as const;
};
