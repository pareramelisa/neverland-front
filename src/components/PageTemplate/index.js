import { Box, Stack, Typography } from "@mui/material";
import { Nav } from "./nav";
import { Footer } from "./footer";

export default function Pagetemplate({ children }) {
  return (
    <Stack direction={"column"}>
      <Nav />
      {children}
      <Footer />
    </Stack>
  );
}
