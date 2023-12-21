import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Neverland from "@/../public/neverland.svg";
import Onda from "@/../public/ondaLogin.svg";
import Image from "next/image";
import { userRegister } from "@/api/user";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import { CircularProgress, useMediaQuery } from "@mui/material";
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

export default function RegisterForm() {
  const [loading, setLoading] = React.useState(false);
  const isDekstop = useMediaQuery("(min-width:600px)");
  const router = useRouter();
  const handleSubmit = async (values) => {
    setLoading(true);
    const input = {
      ...values,
      role: router.pathname.includes("admin") ? "admin" : "user",
    };
    try {
      const res = await userRegister(input);
      if (res) {
        router.push("/login");
      } else {
        throw new Error("Error al enviar");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const validationSchema = Yup.object({
    name: Yup.string("Ingresa tu nombre")
      .min(2, "Nombre muy corto")
      .required("Nombre es requerido"),
    lastName: Yup.string("Ingresa tu apellido")
      .min(2, "Apellido muy corto")
      .required("Apellido es requerido"),
    email: Yup.string("Ingresa tu email")
      .min(10, "Email no valido")
      .required("Email es requerido"),
    password: Yup.string("Ingresa tu contraseña")
      .min(6, "Contraseña no valida")
      .required("La contraseña es requerida"),
    birthday: Yup.string("Ingresa tu fecha de nacimiento")
      .max(new Date())
      .required("La fecha de nacimiento es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      birthday: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <>
      {!isDekstop && (
        <Image
          src={Onda}
          alt="onda"
          width={"100%"}
          style={{ width: "100%", height: "auto" }}
        />
      )}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image src={Neverland} alt="neverland" width={200} height={200} />
          <Typography component="h1" variant="h5">
            Registrarse
          </Typography>

          <Box
            noValidate
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Nombre"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  autoComplete="family-name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="birthday"
                  label="Fecha de nacimiento"
                  type="date"
                  id="birthday"
                  autoComplete="new-birthday"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.birthday}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.birthday && Boolean(formik.errors.birthday)
                  }
                  helperText={formik.touched.birthday && formik.errors.birthday}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress color="secondary" /> : "Registrarse"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2" color="#853AB6">
                  ¿Ya tenes una cuenta? Ingresá
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
}
