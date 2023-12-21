import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  DateCalendar,
  DatePicker,
  LocalizationProvider,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { UserContext } from "@/context/userContext";
import moment from "moment/moment";
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  makeStyles,
} from "@mui/material";
import { createBooking } from "@/api/booking";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalForm({
  open,
  handleClose,
  selectedBranch,
  setBranches,
}) {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [disable, setDisable] = React.useState(false);

  const [message, setMessage] = React.useState("");

  const { user } = React.useContext(UserContext);

  const handleSubmit = async () => {
    setLoading(true);
    const input = {
      date: moment(selectedDate).format("DD/MM/YYYY"),
      userId: user.id,
      branchId: selectedBranch.id,
    };
    try {
      const res = await createBooking(input);
      setBranches((prevState) =>
        prevState.map((branch) => {
          if (branch.id === selectedBranch.id) {
            return {
              ...branch,
              bookings: [...branch.bookings, res],
            };
          }
          return branch;
        })
      );
      setDisable(true);
      setMessage("La reserva se generó con exito");
    } catch (error) {
      setMessage(error.message || "Error al crear la reserva");
    }

    setLoading(false);

    setTimeout(() => {
      setDisable(false);
      setMessage("");
      handleClose();
    }, 2500);
  };

  const disabledDates = (date) => {
    return selectedBranch.bookings
      .map((booking) => booking.date)
      .includes(moment(date).format("DD/MM/YYYY"));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {message !== "" && <Alert severity="success">{message}</Alert>}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Selecciona la fecha de tu reserva
          </Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateCalendar
              onChange={(date) => setSelectedDate(date)}
              disablePast
              disabled={disable}
              value={selectedDate}
              shouldDisableDate={disabledDates}
              defaultValue={moment()}
            />
          </LocalizationProvider>
          <Stack direction={"row"} justifyContent={"space-around"}>
            <Button color="error" variant="contained" onClose={handleClose}>
              Cancelar
            </Button>
            <Button
              color="info"
              variant="contained"
              onClick={handleSubmit}
              disabled={disable}
            >
              {loading ? (
                <CircularProgress color="secondary" size={25} />
              ) : (
                "Reservar"
              )}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
2;
