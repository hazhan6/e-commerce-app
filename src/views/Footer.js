import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="shadow-custom py-4">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} E-Commerce App. {t("footer")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
