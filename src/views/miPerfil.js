import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { UserContext } from "@/context/userContext";
import { Container, Divider, Typography } from "@mui/material";
import moment from "moment";

export default function MiPerfil() {
  const { user } = React.useContext(UserContext);

  return (
    <React.Fragment>
      <Container sx={{ pt: 4 }}>
        <Typography>Tus datos</Typography>
        <Table size="medium" sx={{ padding: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Fecha de nacimiento</TableCell>
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
        <Divider />
        <Typography>Tus reservas</Typography>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Sucursal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.Bookings?.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{booking.Branches?.[0]?.adress}</TableCell>
                {/*  */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </React.Fragment>
  );
}
