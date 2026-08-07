import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import { accountContext, loginContext, type AccountContext, type LoginContext } from "./types/context";
import { useAuth } from "./hooks/useAuth";
import Animes from "./pages/Animes";
import Lists from "./pages/Lists";
import { useAccount } from "./hooks/useAccount";

function ProtectedLayout({ loggedIn }: { loggedIn: boolean }) {
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col shrink-0">
      <Navbar />
      <main className="flex-1 overflow-hidden max-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {

  const [loggedIn, setLoggedIn] = useState<boolean>(true);
  const [accountId, setAccountId] = useState<string>("");

  const { account, fetchAccount } = useAccount(accountId);

  const LoginContextValue: LoginContext = {
    isLoggedIn: (state: boolean) => {
      setLoggedIn(state);
    },
    storeId: (id: string) => {
      setAccountId(id);
      localStorage.setItem("AccountId", id);
    }
  };

  const AccountContextValue: AccountContext = {
    account,
    accountId,
    logout: () => {
      console.log("Logging out!")
      localStorage.clear();
      setLoggedIn(false);
      return;
    },

    accountUpdated: () => {
      window.location.reload();
    },
  }

  const {check} = useAuth();

  useEffect(() => {
    fetchAccount();
  }, [accountId])

  useEffect(() => {
    const setUpSession = async () => {
      const token = localStorage.getItem("AccountToken")
      if (token) {
        console.log(`Token ${token}`)
        const valid = await check();
        console.log(`Valid ${JSON.stringify(valid)}`)
        if (valid){
          console.log("Session restored!")
          const accId = localStorage.getItem("AccountId");

          if (!accId || accId === "") {
            console.log("Session lost!");
            localStorage.clear();
            setLoggedIn(false);
            return;
          }

          console.log(`accId ${accId}`)
          setAccountId(accId);
          setLoggedIn(true);
          return;
        }
      }
      console.log("Session lost!");
      localStorage.clear();
      setLoggedIn(false);
    }

    setUpSession();
  }, [])

  return (
    // O Provider fica por fora de tudo para ser acessível na aplicação inteira
    <loginContext.Provider value={LoginContextValue}>
    <accountContext.Provider value={AccountContextValue}>
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas (Sem Navbar) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas Protegidas (Exigem login + Exibem a Navbar) */}
          <Route element={<ProtectedLayout loggedIn={loggedIn} />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/anime" element={<Animes />} />
            <Route path="/list" element={<Lists />} />
          </Route>

          {/* Rota Curinga: Redireciona qualquer URL desconhecida */}
          <Route
            path="*"
            element={<Navigate to={loggedIn ? "/home" : "/login"} replace />}
          />
        </Routes>
      </BrowserRouter>
    </accountContext.Provider>
    </loginContext.Provider>
  );
}