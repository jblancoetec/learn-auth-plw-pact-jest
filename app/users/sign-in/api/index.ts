import axios from "axios";
import { SignInProps } from "../types";

export type PostActions = {
  initPost: () => void;
  endPostWithSuccess: () => void;
  endPostWithProblems: (error: string) => void;
};

export type PostUserProps = SignInProps;

export const post = async (user: PostUserProps, actions: PostActions) => {
  const { initPost, endPostWithSuccess, endPostWithProblems } = actions;

  initPost();
  try {
    const response = await axios.post("/api/users/sign-in", user, {
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: (status) => status < 500,
    });
    switch (response.status) {
      case 202: {
        endPostWithSuccess();
        break;
      }
      default: {
        endPostWithProblems(response.data.message);
        break;
      }
    }
  } catch (error: any) {
    if (error.response) {
      endPostWithProblems(error.response.data.message);
    } else if (error.request) {
      endPostWithProblems("Tal parece que el servidor no responde");
    } else {
      endPostWithProblems("Parece que no hay internet");
    }
  }
};
