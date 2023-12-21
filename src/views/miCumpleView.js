import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BranchsMap } from "@/components/branchsMap";
import { getAllBranches } from "@/api/branch";
import { UserContext } from "@/context/userContext";
import { CircularProgress } from "@mui/material";

const defaultTheme = createTheme();

export function MiCumpleView() {
  const { user } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);
  const [branches, setBranches] = React.useState([]);

  async function handleGetBranches() {
    setLoading(true);
    const res = await getAllBranches();
    if (res) {
      setBranches(res.branches);
    }
    setLoading(false);
  }

  React.useEffect(() => {
    handleGetBranches();
  }, [user.id]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 4,
            pb: 4,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h5"
              variant="h5"
              align="center"
              color="text.primary"
              gutterBottom
            >
              ¡Festejá tu cumple con nosotros!
            </Typography>
            <Typography
              variant="subtitle2"
              align="center"
              color="text.secondary"
              paragraph
            >
              Elegí una sucursal, selecciona el dia y el horario, y ¡asegurate
              el cumple mas divertido!
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Stack justifyContent={"center"} alignContent={"center"}>
            {!loading ? (
              <BranchsMap branches={branches} setBranches={setBranches} />
            ) : (
              <Stack
                direction={"row"}
                justifyContent={"center"}
                alignContent={"center"}
              >
                <CircularProgress size={180} />
              </Stack>
            )}
          </Stack>
        </Container>
      </main>
    </ThemeProvider>
  );
}
