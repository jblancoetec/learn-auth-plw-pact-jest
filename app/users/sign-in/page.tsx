"use client";

import FeedbackError from "../components/FeedbackError";
import FeedbackInProgress from "../components/FeedbackInProgress";
import SignInForm from "./components/SignInForm";
import { useSignInProcess } from "./hooks";

const Page = () => {
  const { isError, isLoading, getInformation, signIn } = useSignInProcess();
  return (
    <>
      <FeedbackInProgress isLoading={isLoading()} />
      <FeedbackError hasAProblem={isError()} problem={getInformation()} />
      <SignInForm onCompleted={signIn} />;
    </>
  );
};

export default Page;
