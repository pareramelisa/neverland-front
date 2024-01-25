
import { Card, CardMedia, Container, Grid, Paper, Typography } from "@mui/material";

export default function Games() {
  const cards = [1, 2, 3, 4, 5, 6];
  const imageUrls = [
    "/sucursal1.png",
    "/sucursal2.png",
    "/sucursal3.png",
    "/sucursal4.png",
    "/sucursal5.png",
    "/sucursal6.png",
  ];

  return (
    <Paper
      elevation={12}
      sx={{
        height: "auto",
        width: "90%",
        p: 1,
        borderRadius: 5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: 0
      }}
      variant="elevation"
    >
      <Container sx={{ py: 2 }} maxWidth="md">
        <Typography variant="h5" align="left" color="text.primary" paragraph sx={{ py: 1 }}>
          Juegos populares
        </Typography>
        <Grid container spacing={2}>
          {cards.map((card, index) => (
            <Grid item key={card} xs={6} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 0
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    pt: "56.25%",
                    boxShadow: 0
                  }}
                  image={imageUrls[index % imageUrls.length]}
                  alt={`Image ${index}`}
                />
                <Typography variant="h7" sx={{ py: 1 }}>Nombre del juego</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Paper>
  );
}
