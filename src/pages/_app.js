import Pagetemplate from "@/components/PageTemplate";
import { UserProvider } from "@/context/userContext";
import "@/styles/globals.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useRouter } from "next/router";
const noLayoutPages = ["/login", "/register", "/register/admin"];
const defaultTheme = createTheme();

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <UserProvider>
        {noLayoutPages.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <Pagetemplate>
            <Component {...pageProps} />
          </Pagetemplate>
        )}
      </UserProvider>
    </ThemeProvider>
  );
}
