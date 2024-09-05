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
import { SignUpProps } from "../types";

export type OnCompleteSignUpFormProps = SignUpProps;

export type OnCompleteSignUpFormEvent = (
  props: OnCompleteSignUpFormProps,
) => void;

const SignUpForm = ({
  onCompleted,
}: {
  onCompleted: OnCompleteSignUpFormEvent;
}) => {
  const { register, handleSubmit, watch } =
    useForm<OnCompleteSignUpFormProps>();

  return (
    <Container maxWidth="xs">
      <Stack marginTop={"10vh"} spacing={"24px"}>
        <Typography
          variant="h5"
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
            color: "white",
          }}
        >
          registrate
        </Typography>
        <Box component={"form"} onSubmit={handleSubmit(onCompleted)}>
          <Stack spacing={"16px"}>
            <TextField
              type="text"
              variant="outlined"
              id="name-field"
              placeholder="Nombre"
              required
              {...register("name", { required: true })}
            />
            <TextField
              type="text"
              variant="outlined"
              id="lastname-field"
              placeholder="Apellido"
              required
              {...register("lastname", { required: true })}
            />
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
            <TextField
              type="password"
              variant="outlined"
              id="password-to-confirm-field"
              placeholder="Repetir contraseña"
              required
              error={watch("password") !== watch("confirm")}
              helperText={
                watch("password") !== watch("confirm")
                  ? "Las contraseñas no coinciden"
                  : ""
              }
              {...register("confirm", { required: true })}
            />
            <Button variant="contained" type="submit">
              continuar
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default SignUpForm;
