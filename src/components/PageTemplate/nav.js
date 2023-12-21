import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Neverland from "@/../public/neverlandNav.svg";
import Image from "next/image";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";

const drawerWidth = 240;
const navItems = [
  { text: "Inicio", link: "/" },
  { text: "Perfil", link: "/perfil" },
  { text: "Mi Cumple", link: "/mi-cumple" },
  { text: "Salir", link: "/login" },
];

export function Nav(props) {
  const user = React.useContext(UserContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {user.user.name}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} sx={{ width: "100%" }}>
            {item.text === "Salir" ? (
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => {
                  localStorage.removeItem("userId");
                  router.push("/");
                }}
              >
                <ListItemText primary={item.text} />
              </Button>
            ) : (
              <Link href={item.link} passHref style={{ width: "100%" }}>
                <Button variant="outlined" color="secondary" fullWidth>
                  <ListItemText primary={item.text} />
                </Button>
              </Link>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <AppBar component="nav" sx={{ backgroundColor: "#853AB6" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Image
              src={Neverland}
              alt="neverland"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" }, mr: 2 }}
            />
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Link href={item.link} key={item.text} passHref>
                  <Button key={item.text} sx={{ color: "#fff" }}>
                    {item.text}
                  </Button>
                </Link>
              ))}
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Toolbar />
    </Box>
  );
}

Nav.propTypes = {
  window: PropTypes.func,
};
