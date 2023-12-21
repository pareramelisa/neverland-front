import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUserById } from "@/api/user";

export const UserContext = createContext(null);
const noPermissionsPages = ["/login", "/register", "/register/admin"];

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const router = useRouter();

  async function checkIfLogged(storedUserId) {
    const res = await getUserById(storedUserId);
    console.log(res)
    if (res) {
      setUser(res);
    } else {
      router.push("/login");
    }
  }

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!noPermissionsPages.includes(router.pathname)) {
      if (storedUserId) {
        checkIfLogged(storedUserId);
      } else {
        router.push("/login");
      }
    }
  }, [router.pathname]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
