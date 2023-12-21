import { Box, Typography } from "@mui/material";
import Link from "next/link";

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Neverland
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export function Footer() {
    return(
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
    <Typography
      variant="subtitle1"
      align="center"
      color="text.secondary"
      component="p"
    >
      Experiencia Neverland. Viví momentos mágicos...
    </Typography>
    <Copyright />
  </Box>
)
}