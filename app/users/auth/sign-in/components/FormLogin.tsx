"use client";

import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useRef } from "react";

export type FormLoginCompletedEventProps = Readonly<{
  email: string;
  password: string;
}>;

export type FormLoginCompletedEvent = (
  event: FormLoginCompletedEventProps
) => void;

const FormLogin = ({
  onCompleted,
}: {
  onCompleted: FormLoginCompletedEvent;
}) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleSubmit = () => {
    onCompleted({
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    });
  };

  return (
    <Container maxWidth="xs">
      <Stack marginTop={"20vh"} spacing={"24px"}>
        <Typography
          variant="h5"
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
          }}
        >
          iniciar sesión
        </Typography>
        <Stack spacing={"16px"}>
          <TextField
            type="email"
            variant="outlined"
            id="email-field"
            placeholder="Email"
            inputRef={emailRef}
          />
          <TextField
            type="password"
            variant="outlined"
            id="password-field"
            placeholder="Contraseña"
            inputRef={passwordRef}
          />
          <Button variant="contained" onClick={handleSubmit}>
            continuar
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default FormLogin;
