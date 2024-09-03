import { useProcessStatus } from "@/app/hooks";
import { useBrowser } from "@/app/hooks";
import { post } from "../api";
import { SignInProps } from "../types";

export const useSignInProcess = () => {
  const process = useProcessStatus();
  const browser = useBrowser();

  const signIn = (user: SignInProps) => {
    post(user, {
      initPost() {
        process.setLoading();
      },
      endPostWithSuccess() {
        process.setSuccess();
        browser.toHomePage();
      },
      endPostWithProblems(error) {
        process.setError(error);
      },
    });
  };

  const { isError, isLoading, getInformation } = process;
  return { signIn, isError, isLoading, getInformation } as const;
};
