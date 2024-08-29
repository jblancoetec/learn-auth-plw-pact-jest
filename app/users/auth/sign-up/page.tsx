"use client";

import {
  SignUpForm,
  SignUpProcessError,
  SignUpProcessProgress,
} from "./components";
import { useSignUpProcess } from "./hooks";

const Page = () => {
  const { isError, isLoading, getInformation, signUp } = useSignUpProcess();

  return (
    <>
      <SignUpProcessProgress isLoading={isLoading()} />
      <SignUpProcessError hasAProblem={isError()} problem={getInformation()} />
      <SignUpForm onCompleted={signUp} />
    </>
  );
};

export default Page;
