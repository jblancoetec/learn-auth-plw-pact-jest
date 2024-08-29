"use client";

import FormLogin, { FormLoginCompletedEvent } from "./components/FormLogin";

const Page = () => {
  const handleCompleted: FormLoginCompletedEvent = (event) => {
    console.log(event);

    return;
  };
  return <FormLogin onCompleted={handleCompleted} />;
};

export default Page;
