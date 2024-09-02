import axios from "axios";
import { SignUpProps } from "../types";

export type PostActions = {
  initPost: () => void;
  endPostWithSuccess: () => void;
  endPostWithProblems: (error: string) => void;
};

export type PostUserProps = SignUpProps;

export const post = async (user: PostUserProps, actions: PostActions) => {
  const { initPost, endPostWithSuccess, endPostWithProblems } = actions;

  initPost();
  try {
    const response = await axios.post("/api/users/sign-up", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    switch (response.status) {
      case 201: {
        endPostWithSuccess();
        break;
      }
      default: {
        endPostWithProblems(response.data.message);
        break;
      }
    }
  } catch (error) {
    endPostWithProblems("Parece que no hay internet");
  }
};
