"use client";

import FeedbackError from "../components/FeedbackError";
import FeedbackInProgress from "../components/FeedbackInProgress";
import { SignUpForm } from "./components";
import { useSignUpProcess } from "./hooks";

const Page = () => {
  const { isError, isLoading, getInformation, signUp } = useSignUpProcess();

  return (
    <>
      <FeedbackInProgress isLoading={isLoading()} />
      <FeedbackError hasAProblem={isError()} problem={getInformation()} />
      <SignUpForm onCompleted={signUp} />
    </>
  );
};

export default Page;
