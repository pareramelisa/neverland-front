import Pagetemplate from "@/components/PageTemplate";
import { UserProvider } from "@/context/userContext";
import "@/styles/globals.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
const noLayoutPages = ["/login", "/register", "/register/admin"];


export default function App({ Component, pageProps }) {
  const router = useRouter();

  const theme = createTheme({
    palette: {},
    typography: {
      fontFamily: ['Nunito', 'sans-serif'].join(",")
    }

  })

  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </Head>
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
