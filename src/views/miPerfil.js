import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { UserContext } from "@/context/userContext";
import {
  Avatar,
  Container,
  CircularProgress,
  Paper,
  Stack,
  TableContainer,
  Typography,
} from "@mui/material";
import moment from "moment";

export default function MiPerfil() {
  const { user } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);

  return (
    <React.Fragment>
      <Paper
        elevation={12}
        sx={{
          height: "auto",
          width: "90%",
          background: "linear-gradient(135deg, #DD4EAE, #8360AA)",
          p: 3,
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 2,
          marginLeft: "auto",
          marginRight: "auto",
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
          <Stack direction={"row"} alignItems="center">
            <Avatar
              alt="Avatar"
              src={Avatar}
              sx={{ width: 60, height: 60, marginLeft: 4 }}
            />
            <Typography variant="h5" color={"white"} sx={{ marginLeft: 3 }}>
              ¡Hola, {user.name}!
            </Typography>
          </Stack>
        )}
      </Paper>

        <Paper
          elevation={12}
          sx={{
            height: "auto",
            width: "90%",
            p: 4,
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            overflowX: "auto",
            marginTop: 3
          }}
          variant="elevation"
        >
          <Typography variant="h6">Tus datos</Typography>
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: 20 }}>Nombre</TableCell>
                  <TableCell sx={{ fontSize: 20 }}>Apellido</TableCell>
                  <TableCell sx={{ fontSize: 20 }}>E-mail</TableCell>
                  <TableCell sx={{ fontSize: 20 }}>
                    Fecha de nacimiento
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {moment(user.birthday).format("DD/MM/YYYY")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Paper
          elevation={12}
          sx={{
            height: "auto",
            width: "90%",
            p: 4,
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            overflowX: "auto",
            marginTop: 3,
            marginBottom: 3
          }}
          variant="elevation"
        >
          <Typography variant="h6">Tus reservas</Typography>
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: 20 }}>Fecha</TableCell>
                  <TableCell sx={{ fontSize: 20 }}>Sucursal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.Bookings?.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell>{booking.Branches?.[0]?.address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
    </React.Fragment>
  );
}

