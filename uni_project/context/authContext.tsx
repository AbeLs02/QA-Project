"use client"
import { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import { useRouter } from "next/navigation";
import { getUserById, loginUser, refreshToken, registerUser } from "../lib/api";

type User = {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    profile: string,
    career: string,
    date_joined: string
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username:string, email:string, password:string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (access) {
      const fetch = async () => {
        setIsLoggedIn(true)
        const decoded: any = jwtDecode(access);
        const user_id = decoded.user_id
        const user = await getUserById(user_id)
        setUser({
          id: user_id,
          username: user.username || "",
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          email: user.email,
          phone: user.phone,
          profile: user.profile,
          career: user.career,
          date_joined: user.date_joined,
      });
      }
      fetch()
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const data = await loginUser(username, password);

    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    setIsLoggedIn(true)
    const decoded: any = jwtDecode(data.access);
    const user_id = decoded.user_id
    const user = await getUserById(user_id)
    setUser({
          id: user_id,
          username: user.username || "",
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          email: user.email,
          phone: user.phone,
          profile: user.profile,
          career: user.career,
          date_joined: user.date_joined,
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false)
    router.push("/home");
  };
  const register = async (username:string, email:string, password:string) => {
    try {
      const user = await registerUser(username, email, password)
      console.log(user)
      router.push("/login")
    } catch (err) {
      console.log(err)
    }
    
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;