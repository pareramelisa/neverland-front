import { getAllBranches } from "@/api/branch";
import { UserContext } from "@/context/userContext";
import { CircularProgress, Paper, Stack, Typography } from "@mui/material";
import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";

export default function NextBooking() {
  const [nextBooking, setNextBooking] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  function handleGetAllBranches() {
    const fechaActual = moment(); // Obtener la fecha actual
    const bookings = user?.Bookings || []; // Verificar si user.Bookings existe y asignarlo a bookings, o asignar un array vacío

    const fechaMasCercana = bookings.reduce((fechaCercana, booking) => {
      const fechaBooking = moment(booking.date); // Convertir la fecha del booking a Moment.js

      const diferenciaActual = Math.abs(
        fechaBooking.diff(fechaActual, "milliseconds")
      );
      const diferenciaCercana = Math.abs(
        moment(fechaCercana.date).diff(fechaActual, "milliseconds")
      );

      return diferenciaActual < diferenciaCercana ? booking : fechaCercana;
    }, bookings[0]); // Inicializar con el primer booking del array o undefined si no hay bookings

    setNextBooking(fechaMasCercana);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    handleGetAllBranches();
  }, [user?.id]);

  if (!nextBooking?.date) {
    return <></>;
  }
  return (
    <Paper
      elevation={12}
      sx={{ height: "auto", width: "90%", backgroundColor: "#853AB6", p: 4 }}
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
        <Stack direction={"rows"} columnGap={19} flexWrap={"wrap"}>
          <Stack>
            <Typography color={"white"} variant="subtitle1">
              Tu proxima reserva
            </Typography>
            <Typography variant="h3" color={"white"}>
              {nextBooking?.date}
            </Typography>
          </Stack>
          <Stack>
            <Typography color={"white"} variant="subtitle1">
              En la sucursal
            </Typography>
            <Typography variant="h5" color={"white"}>
              {nextBooking?.Branches?.[0]?.adress}
            </Typography>
          </Stack>
        </Stack>
      )}
    </Paper>
  );
}
