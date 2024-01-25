import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Neverland from "@/../public/neverland.svg";
import Onda from "@/../public/ondaLogin.svg";
import Image from "next/image";
import { userLogin } from "@/api/user";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/router";
import { CircularProgress, useMediaQuery } from "@mui/material";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Neverland
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function LoginForm() {
  const { setUser } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const router = useRouter();
  const isDekstop = useMediaQuery("(min-width:600px)");

  const handleSubmit = async (values) => {
    setLoading(true);
    setError(null);
    const input = {
      ...values,
    };
    try {
      const res = await userLogin(input);
      if (res && res.message === "¡Inicio de sesión exitoso!") {
        setUser(res.user);
        const userId = res.user.id;
        localStorage.setItem("userId", userId);
        router.push("/");
      } else {
        throw new Error("Credenciales inválidas");
      }
    } catch (error) {
      setError(error.message || "Error al iniciar sesión");
    }
    setLoading(false);
  };

  const validationSchema = Yup.object({
    email: Yup.string("Ingresa tu email")
      .min(10, "Email no valido")
      .required("Email es requerido"),
    password: Yup.string("Ingresa tu contraseña")
      .min(6, "Contraseña no valida")
      .required("La contraseña es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <Box component="main" maxWidth="lg">
      {!isDekstop && (
        <Image
          src={Onda}
          alt="onda"
          width={"100%"}
          style={{ width: "100%", height: "auto" }}
        />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100vw",
        }}
      >
        <Image src={Neverland} alt="neverland" width={200} height={200} />
        <Typography component="h1" variant="h5">
          Inicia sesión
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Constraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: 5, boxShadow: 10, background: "linear-gradient(135deg, #DD4EAE, #8360AA)" }}
          >
            {loading ? <CircularProgress color="secondary" /> : "Ingresar"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" color="#853AB6">
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="#853AB6">
                ¿No estas registrado?
              </Typography>
              <Link href="/register" variant="body2" color="#853AB6">
                {"Crear una cuenta"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Box>
  );
}
