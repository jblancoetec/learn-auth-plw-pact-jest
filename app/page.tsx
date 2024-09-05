import { Box, Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box component={"main"} style={{ backgroundColor: "black" }}>
      <Container maxWidth={"sm"}>
        <Typography variant="h1" color={"white"}>
          Bienvenido!!!
        </Typography>
      </Container>
    </Box>
  );
}
