import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/auth";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login({ username, password }))
      .then((response) => {
        if (response.error) {
          enqueueSnackbar(`${t("Warnings.loginFail")}`, {
            variant: "error",
            preventDuplicate: true,
          });
        } else {
          enqueueSnackbar(`${t("Warnings.loginSuccess")}`, {
            variant: "success",
            preventDuplicate: true,
          });
          navigate(`/`);
        }
      })
      .catch((error) => {
        enqueueSnackbar(error.message, {
          variant: "error",
          preventDuplicate: true,
        });
      });
  };

  return (
    <div className="min-h-screen flex mt-32 justify-center">
      <div className="p-8 rounded shadow-custom shadow-gray-500 w-96 h-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {t("Header.login")}
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-medium mb-1">
              {t("Profile.username")}:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-1">
              {t("Profile.password")}:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 mt-4 bg-gray-600 hover:bg-gray-700 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-700 font-semibold rounded"
          >
            {t("Header.login")}
          </button>
          <Link
            to="/signup"
            className="block text-center mt-4 underline text-gray-500"
          >
            {t("Warnings.dontHaveAccount")}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
