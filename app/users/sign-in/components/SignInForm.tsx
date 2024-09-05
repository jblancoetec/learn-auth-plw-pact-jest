"use client";

import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { SignInProps } from "../types";

export type OnCompleteSignInFormProps = SignInProps;

export type OnCompleteSignInFormEvent = (
  event: OnCompleteSignInFormProps,
) => void;

const SignInForm = ({
  onCompleted,
}: {
  onCompleted: OnCompleteSignInFormEvent;
}) => {
  const { register, handleSubmit } = useForm<OnCompleteSignInFormProps>();
  return (
    <Container maxWidth="xs">
      <Stack marginTop={"20vh"} spacing={"24px"}>
        <Typography
          variant="h5"
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
            color: "white",
          }}
        >
          iniciar sesión
        </Typography>
        <Box component={"form"} onSubmit={handleSubmit(onCompleted)}>
          <Stack spacing={"16px"}>
            <TextField
              type="email"
              variant="outlined"
              id="email-field"
              placeholder="Email"
              required
              {...register("email", { required: true })}
            />
            <TextField
              type="password"
              variant="outlined"
              id="password-field"
              placeholder="Contraseña"
              required
              {...register("password", { required: true })}
            />
            <Button variant="contained" type={"submit"}>
              continuar
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default SignInForm;
