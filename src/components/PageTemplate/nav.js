import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Neverland from "@/../public/neverlandNav.svg";
import BackgroundDrawer from "@/../public/BackgroundDrawer.svg";
import AvatarNav from "@/../public/Avatar.jpg";
import Image from "next/image";
import { UserContext } from "@/context/userContext";
import Link from "next/link";
import { Hidden, ListItemIcon, Stack } from "@mui/material";
import { useRouter } from "next/router";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';

const drawerWidth = 240;
const navItems = [
  { text: "Inicio", link: "/", icon: <PersonOutlineIcon/>},
  { text: "Mi perfil", link: "/perfil", icon: <HomeOutlinedIcon/> },
  { text: "Mi Cumple", link: "/mi-cumple", icon: <CakeOutlinedIcon/> },
  { text: "Mis tarjetas", link: "/", icon: <CreditCardOutlinedIcon/> },
  { text: "Saldo y crédito", link: "/", icon: <PaidOutlinedIcon/> },
  { text: "Métodos de pago", link: "/", icon: <PaymentsOutlinedIcon/> },
  { text: "Cerrar sesión", link: "/login", icon: <LoginOutlinedIcon/>},
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
      <Stack direction="row" alignItems="center" position="relative">
        <Image
          src={BackgroundDrawer}
          alt="BackgroundDrawer"
          component="div"
          sx={{
            width: "100%",
            height: "200px",
            margin: "auto",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "1%",
              left: "55%",
              transform: "translate(-80%, -80%)",
              color: "white",
              textAlign: "center",
            }}
          >
            <Avatar
              alt="AvatarNav"
              src={AvatarNav}
              sx={{ width: 60, height: 60, marginBottom: 2 }}
            />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography
              variant="h6"
              sx={{
                whiteSpace: "nowrap",
                fontSize: "1.2rem",
                textAlign: "left",
              }}
            >
              {user.user.name} {user.user.lastName}
            </Typography>
            <Typography
              variant="h7"
              sx={{
                whiteSpace: "nowrap",
                fontSize: "0.8rem",
                textAlign: "left",
              }}
            >
              {user.user.email}
            </Typography>
          </Box>
        </Box>
      </Stack>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.text}
            sx={{ width: "100%", textAlign: "left", marginBottom: 0 }}
          >
            {item.text === "Cerrar Sesión" ? (
              <Button
                fullWidth
                onClick={() => {
                  localStorage.removeItem("userId");
                  router.push("/");
                }}
                sx={{ textAlign: "left", padding: "0px", minWidth: "unset" }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: mobileOpen ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    color: "black",
                    fontSize: "0.9rem",
                    textTransform: "capitalize",
                    textAlign: "left",
                  }}
                />
              </Button>
            ) : (
              <Link href={item.link} passHref style={{ width: "100%" }}>
                <Button
                  fullWidth
                  sx={{ textAlign: "left", padding: "1px", minWidth: "unset" }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: mobileOpen ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      color: "black",
                      fontSize: "0.9rem",
                      textTransform: "capitalize",
                      textAlign: "left",
                    }}
                  />
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
      <AppBar component="nav" sx={{ backgroundColor: "white", boxShadow: 0 }}>
        <Toolbar>
          <IconButton
            color="black"
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
            alignItems="center"
            width={"100%"}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <Image
                src={Neverland}
                alt="neverland"
                component="div"
                sx={{
                  width: "80%",
                  maxWidth: "400px",
                  height: "auto",
                  margin: "auto",
                  display: { xs: "none", sm: "block" },
                }}
              />
            </Box>
            <Hidden mdUp>
              <IconButton color="black" sx={{ mr: 2, display: { sm: "none" } }}>
                <NotificationsNoneIcon />
              </IconButton>
            </Hidden>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Link href={item.link} key={item.text} passHref>
                  <Button key={item.text} sx={{ color: "black", textTransform: "capitalize" }}>
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
