import { SignUpUserProps } from "../types";
import { useProcessStatus } from "@/app/hooks";
import { useBrowser } from "@/app/hooks";
import { post } from "../api";

export const useSignUpProcess = () => {
  const process = useProcessStatus();
  const browser = useBrowser();

  const signUp = (user: SignUpUserProps) => {
    post(user, {
      initPost() {
        process.setLoading();
      },
      endPostWithSuccess() {
        process.setSuccess();
        browser.toSignInPage();
      },
      endPostWithProblems(error) {
        process.setError(error);
      },
    });
  };

  const { isError, isLoading, getInformation } = process;
  return { signUp, isError, isLoading, getInformation } as const;
};
