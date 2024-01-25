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
  open, //
  handleClose,
  selectedBranch, //estado seteado con la sucursal seleccionada
  setBranches, //estado para setear las sucursales todas
}) {
  const [selectedDate, setSelectedDate] = React.useState(null); //estado que guarda y actualiza la fecha seleccionada en el calendario
  const [loading, setLoading] = React.useState(false);
  const [disable, setDisable] = React.useState(false); //estado que indica si algo esta deshabilitado o no y lo actualiza

  const [message, setMessage] = React.useState(""); //estado que muestra un mensaje y lo actualiza

  const { user } = React.useContext(UserContext); //info del usuario que esta logueado en ese momento

  const handleSubmit = async () => {
    setLoading(true);
    const input = { //crea el input a partir del que se va a crear la reserva
      date: moment(selectedDate).format("DD/MM/YYYY"), //en la propiedad date guarda la fecha seleccionada formateada 
      userId: user.id, //en userid guarda el id del usuario logueado sacado del user context
      branchId: selectedBranch.id, //guarda en branch id el id de la rama seleccionada que le llega x props
    };
    try {
      const res = await createBooking(input); //ejecuta el post pasandole el input para que pueda crear la reserva 
      setBranches((prevState) => //actualiza el estado branches con lo que hay en el prev state
        prevState.map((branch) => { //mapea todas las sucursales que habia en el estado hasta entonces
          if (branch.id === selectedBranch.id) { //si el id de la sucursal seleccionada es igual al id de la iteracion
            return {
              ...branch,
              bookings: [...branch.bookings, res],
            };
          }
          return branch; 
        })
      );
      setDisable(true);
      setMessage("La reserva se generó con exito. Podrás verla en tu perfil.");
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

  const disabledDates = (date) => { //funcion para deshabilitar las fechas que ya fueron seleccionadas 
    return selectedBranch.bookings //mapea las reservas que hay en la sucursal seleccionada
      .map((booking) => booking.date) //extrae la fecha de esas reservas
      .includes(moment(date).format("DD/MM/YYYY")); //se fija si esa fecha ya esta repetida
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
          <LocalizationProvider dateAdapter={AdapterMoment}> {/* adaptador que se utiliza para integrar moment con material ui */}
            <DateCalendar
              onChange={(date) => setSelectedDate(date)} //cuando cambia se setea el estado con la fecha seleccionada
              disablePast
              disabled={disable}
              value={selectedDate} //estado que guardo la fecha seleccionada
              shouldDisableDate={disabledDates} //como llega a deshabilitarse?
              defaultValue={moment()} //pone como default la fecha actual
            />
          </LocalizationProvider>
          <Stack direction={"row"} justifyContent={"space-around"}>
            <Button color="error" variant="contained" onClose={handleClose}>
              Cancelar
            </Button>
            <Button
              color="info"
              variant="contained"
              onClick={handleSubmit} //le pasa esta fn para que cuando aprete resrvar s eejecute y se cree la funcion 
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

