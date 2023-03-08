import {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
type AuthContext = {
  token: string;
  login: (token: string) => void;
  logout: (onLogOut: VoidFunction) => void;
};

const AuthContext = createContext<AuthContext>(
  undefined as unknown as AuthContext
);

export default function AuthContextProvider({
  children,
}: {
  children: ReactElement[];
}) {
  const [token, setToken] = useLocalStorage<string>("token", "");

  const login = (token: string) => setToken(token);

  const logout = (onLogOut: VoidFunction) => {
    setToken("");
    onLogOut();
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const authContext = useContext(AuthContext);
  if (authContext === undefined)
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  return authContext;
}
