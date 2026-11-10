import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { MdLocalMovies } from "react-icons/md";
import { LuLoaderCircle } from "react-icons/lu";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Animes from "./pages/Animes";
import Lists from "./pages/Lists";
import { useAuth } from "./hooks/useAuth";
import { useAccount } from "./hooks/useAccount";
import {
  accountContext,
  loginContext,
  type AccountContext,
  type LoginContext,
} from "./types/context";

function Splash() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-5">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-crimson-500 to-crimson-800 text-white shadow-[0_18px_48px_-16px_rgba(225,29,72,0.9)]">
        <MdLocalMovies size={26} />
      </span>
      <div className="flex items-center gap-2 text-sm font-medium text-lead-400">
        <LuLoaderCircle size={16} className="animate-spin text-crimson-500" />
        Restaurando sessão...
      </div>
    </div>
  );
}

function ProtectedLayout({ loggedIn, ready }: { loggedIn: boolean; ready: boolean }) {
  if (!ready) return <Splash />;
  if (!loggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-[1500px] flex-1 px-4 py-6 pb-24 md:px-8 md:py-8 md:pb-12">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountId, setAccountId] = useState<string>(
    () => localStorage.getItem("AccountId") ?? "",
  );

  const { account, fetchAccount } = useAccount(accountId);
  const { check, clearSession } = useAuth();

  const bootstrapSession = useCallback(async () => {
    const token = localStorage.getItem("AccountToken");
    const storedId = localStorage.getItem("AccountId");

    if (!token || !storedId) {
      clearSession();
      setAccountId("");
      setLoggedIn(false);
      setReady(true);
      return;
    }

    const valid = await check();

    if (!valid) {
      clearSession();
      setAccountId("");
      setLoggedIn(false);
      setReady(true);
      return;
    }

    setAccountId(storedId);
    setLoggedIn(true);
    setReady(true);
  }, [check, clearSession]);

  useEffect(() => {
    // Restaura a sessão a partir de uma fonte externa (localStorage + API).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void bootstrapSession();
  }, [bootstrapSession]);

  useEffect(() => {
    if (accountId) void fetchAccount();
  }, [accountId, fetchAccount]);

  useEffect(() => {
    const handleUnauthorized = () => {
      setLoggedIn(false);
      setAccountId("");
      toast.info("Sua sessão expirou. Entre novamente.");
    };

    window.addEventListener("animelist:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("animelist:unauthorized", handleUnauthorized);
  }, []);

  const storeId = useCallback((id: string) => {
    setAccountId(id);
    localStorage.setItem("AccountId", id);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setAccountId("");
    setLoggedIn(false);
  }, [clearSession]);

  const loginContextValue = useMemo<LoginContext>(
    () => ({
      isLoggedIn: setLoggedIn,
      storeId,
    }),
    [storeId],
  );

  const accountContextValue = useMemo<AccountContext>(
    () => ({
      account,
      accountId,
      logout,
      refreshAccount: () => void fetchAccount(),
    }),
    [account, accountId, logout, fetchAccount],
  );

  return (
    <loginContext.Provider value={loginContextValue}>
      <accountContext.Provider value={accountContextValue}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={ready && loggedIn ? <Navigate to="/home" replace /> : <Login />}
            />
            <Route
              path="/register"
              element={ready && loggedIn ? <Navigate to="/home" replace /> : <Register />}
            />

            <Route element={<ProtectedLayout loggedIn={loggedIn} ready={ready} />}>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/anime" element={<Animes />} />
              <Route path="/list" element={<Lists />} />
            </Route>

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
