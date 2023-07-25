import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoutes } from "./routes";
import Header from "../views/Header";
import Footer from "../views/Footer";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {AppRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
