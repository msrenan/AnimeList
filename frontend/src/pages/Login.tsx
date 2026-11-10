import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import {
  FiAlertCircle,
  FiEye,
  FiEyeOff,
  FiLock,
  FiLogIn,
  FiUser,
} from "react-icons/fi";
import { LuLoaderCircle } from "react-icons/lu";
import { MdLocalMovies } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";
import { loginContext } from "../types/context";
import { getApiErrorMessage, getApiFieldErrors } from "../api/axios";
import AuthLayout from "../components/AuthLayout";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isLoggedIn, storeId } = useContext(loginContext);

  const [loginCred, setLoginCred] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setFieldErrors({});

    if (!loginCred.trim() || !pass) {
      setError("Preencha o e-mail/usuário e a senha para continuar.");
      return;
    }

    setLoading(true);
    try {
      const response = await login(loginCred, pass);
      storeId(response.accountId);
      isLoggedIn(true);
      navigate("/home");
    } catch (loginError) {
      setError(getApiErrorMessage(loginError));
      setFieldErrors(getApiFieldErrors(loginError) ?? {});
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mx-auto flex h-full w-full max-w-sm flex-col justify-center">
        <div className="mb-8 flex items-center gap-3 lg:hidden">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-crimson-500 to-crimson-800 text-white">
            <MdLocalMovies size={20} />
          </span>
          <span className="font-display text-lg font-bold text-white">
            Anime<span className="text-crimson-400">List</span>
          </span>
        </div>

        <p className="text-xs font-semibold tracking-[0.2em] text-crimson-400 uppercase">
          Bem-vindo de volta
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white">
          Entre na sua conta
        </h2>
        <p className="mt-2 text-sm text-lead-300">
          Continue de onde parou e acompanhe seus animes.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
          <div>
            <label htmlFor="login" className="field-label">
              E-mail ou nickname
            </label>
            <div className="relative">
              <FiUser
                size={17}
                className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-lead-400"
              />
              <input
                id="login"
                value={loginCred}
                onChange={(event) => setLoginCred(event.target.value)}
                placeholder="seu@email.com"
                autoComplete="username"
                autoFocus
                className={`input h-12 pl-11 ${
                  fieldErrors.login ? "border-red-500/70" : ""
                }`}
              />
            </div>
            {fieldErrors.login && (
              <p className="mt-1.5 text-xs text-red-300">{fieldErrors.login}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="field-label">
              Senha
            </label>
            <div className="relative">
              <FiLock
                size={17}
                className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-lead-400"
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={pass}
                onChange={(event) => setPass(event.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className={`input h-12 pr-11 pl-11 ${
                  fieldErrors.password ? "border-red-500/70" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute top-1/2 right-2.5 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-lead-400 transition-colors hover:bg-lead-700 hover:text-white"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="mt-1.5 text-xs text-red-300">{fieldErrors.password}</p>
            )}
          </div>

          {error && (
            <div className="flex items-start gap-2.5 rounded-xl border border-red-500/25 bg-red-500/10 px-3.5 py-3 text-sm text-red-200">
              <FiAlertCircle size={17} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary h-12 w-full text-sm">
            {loading ? (
              <>
                <LuLoaderCircle size={18} className="animate-spin" />
                Entrando...
              </>
            ) : (
              <>
                <FiLogIn size={17} />
                Entrar
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-lead-400">
          Ainda não tem uma conta?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="cursor-pointer font-semibold text-crimson-400 transition-colors hover:text-crimson-300"
          >
            Criar conta
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
