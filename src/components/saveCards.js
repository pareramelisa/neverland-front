import { UserContext } from "@/context/userContext";
import { Avatar, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import Cards from "@/../public/Cards.svg";
import Image from "next/image";

export default function SaveCards() {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <Paper
      elevation={12}
      sx={{
        height: "auto",
        width: "90%",
        background: "linear-gradient(135deg, #DD4EAE, #8360AA)",
        p: 4,
        borderRadius: 5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      variant="elevation"
    >
      {loading ? (
        <Stack justifyContent={"center"} alignItems={"center"} sx={{ color: "red" }}>
          <CircularProgress />
        </Stack>
      ) : (
        <Stack direction={"row"} alignItems="center">
          <Stack>
            <Avatar alt="Avatar" src={Avatar} sx={{ width: 60, height: 60, marginBottom: 2 }} />
            <Typography variant="h5" color={"white"}>
              ¡Hola, {user.name}!
            </Typography>
            <Typography color={"white"} variant="subtitle1">
              Tenés 3 tarjetas guardadas
            </Typography>
          </Stack>
          <Image
            src={Cards}
            alt="Cards"
            component="div"
            sx={{
              width: "auto",
              height: "200px",
              marginLeft: "auto",
            }}
          />
        </Stack>
      )}
    </Paper>
  );
}
