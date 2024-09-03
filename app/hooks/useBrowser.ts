import { useRouter } from "next/navigation";

export const useBrowser = () => {
  const router = useRouter();
  const toSignUpPage = () => router.push("/users/sign-up");
  const toSignInPage = () => router.push("/users/sign-in");
  const toHomePage = () => router.push("/");
  return { toSignInPage, toSignUpPage, toHomePage } as const;
};
