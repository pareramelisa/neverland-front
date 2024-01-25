import { CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CardRed from "@/../public/CardRed.svg";
import CardYellow from "@/../public/CardYellow.svg";
import Image from "next/image";

export default function MyCards() {
  const [loading, setLoading] = useState(false);

  return (
    <Paper
      elevation={12}
      sx={{
        height: "auto",
        width: "90%",
        p: 4,
        boxShadow: 0,
        borderRadius: 5
      }}
      variant="elevation"
    >
      {loading ? (
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ color: "red" }}
        >
          <CircularProgress />
        </Stack>
      ) : (
        <Stack direction={"column"} alignItems="center">
          <Typography variant="h5" color={"black"} sx={{ marginBottom: 2, textAlign: "left" }}>
            Mis tarjetas
          </Typography>
          <Stack direction={"row"} gap={2} alignItems="center">
            <Image
              src={CardRed}
              alt="card red"
              component="div"
              sx={{
                width: "200px",
                height: "200px",
                margin: "auto",
                borderRadius: 5,
                overflow: "hidden",
                display: "block",
              }}
            />

            <Image
              src={CardYellow}
              alt="card yellow"
              component="div"
              sx={{
                width: "200px",
                height: "200px",
                margin: "auto",
                borderRadius: 5,
                overflow: "hidden",
                display: "block",
              }}
            />
          </Stack>
        </Stack>
      )}
    </Paper>
  );
}
