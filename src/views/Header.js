import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BsSun, BsMoon, BsTranslate, BsPerson } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal } from "../redux/cart";
import { logout } from "../redux/auth";
import { useSnackbar } from "notistack";
import withReactContent from "sweetalert2-react-content";
import { default as SweetAlert } from "sweetalert2";
import { saveToLocalStorage } from "../utils";

const Swal = withReactContent(SweetAlert);

const Header = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { cart } = useSelector((state) => state.cart);
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const [isLanguageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(getCartTotal());
  }, []);

  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (savedDarkMode) {
      setDarkMode(savedDarkMode);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    document.addEventListener("click", handleDropdownOutsideClick);

    return () => {
      document.removeEventListener("click", handleDropdownOutsideClick);
    };
  }, []);

  const handleMenuClick = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleDropdownOutsideClick = (event) => {
    if (event.target.closest(".language-options-dropdown") === null) {
      setLanguageMenuOpen(false);
    }
    if (event.target.closest(".user-dropdown") === null) {
      setUserMenuOpen(false);
    }
  };

  const handleDarkModeToggle = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: `${t("Warnings.sureForLogout")}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `${t("Warnings.sure")}`,
      cancelButtonText: `${t("Warnings.cancel")}`,
      customClass: {
        confirmButton:
          "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-5",
        cancelButton:
          "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
      },
      buttonsStyling: false,
    });
    if (result.value !== null && result.value === true) {
      try {
        dispatch(logout());
        enqueueSnackbar(`${t("Warnings.logoutSuccess")}`, {
          variant: "success",
          preventDuplicate: true,
        });
        navigate(`/`);
      } catch (error) {
        enqueueSnackbar(`${t("Warnings.logoutFail")}`, {
          variant: "error",
          preventDuplicate: true,
        });
      }
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguageMenuOpen(false);
  };

  const LanguageOptions = () => {
    const languages = ["tr", "en"];

    return (
      <div className="language-options-dropdown relative inline-block">
        <button
          onClick={() => setLanguageMenuOpen((prev) => !prev)}
          className="flex items-center gap-2  rounded px-3 py-2"
        >
          <BsTranslate size={20} className="text-red" />
        </button>
        {isLanguageMenuOpen && (
          <ul className="absolute z-10 mt-2 shadow-xl bg-white dark:bg-gray-700 rounded">
            {languages.map((lang) => (
              <li
                key={lang}
                onClick={() => {
                  changeLanguage(lang);
                }}
                className="flex gap-3 px-4 py-2  cursor-pointer hover:bg-gray-200 hover:dark:text-gray-700"
              >
                {lang.toUpperCase()}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const renderDarkModeToggle = () => {
    return (
      <div className="flex items-center gap-2">
        <button onClick={handleDarkModeToggle}>
          {isDarkMode ? (
            <BsSun size={20} className="text-yellow-300" />
          ) : (
            <BsMoon size={20} />
          )}
        </button>
      </div>
    );
  };

  const LanguageOptionsOnMd = () => {
    return (
      <>
        <li
          onClick={() => changeLanguage("tr")}
          className="flex gap-3 cursor-pointer"
        >
          Türkçe
        </li>
        <li
          onClick={() => changeLanguage("en")}
          className="flex gap-3 cursor-pointer"
        >
          English
        </li>
      </>
    );
  };

  const UserDropdown = () => {
    return (
      <div className="user-dropdown relative inline-block">
        <button
          onClick={() => setUserMenuOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded px-3 py-2"
        >
          <BsPerson size={23} />
        </button>
        {isUserMenuOpen && (
          <ul className="absolute z-10 mt-2 shadow-xl dark:bg-gray-700 bg-white rounded">
            <Link
              to="/profile"
              className="flex gap-3 px-4 py-2 cursor-pointer hover:bg-gray-200 hover:dark:text-gray-700"
            >
              {t("Header.profile")}
            </Link>
            <li
              onClick={handleLogout}
              className="flex gap-3 px-4 py-2 cursor-pointer hover:bg-gray-200 hover:dark:text-gray-700"
            >
              {t("Header.logout")}
            </li>
          </ul>
        )}
      </div>
    );
  };

  const renderCart = () => {
    return (
      <Link
        to="/cart"
        className="hover:bg-gray-700 hover:text-white py-2 rounded"
      >
        {cart?.length > 0 && (
          <span className="absolute ml-12 -mt-1 h-4 w-4 flex items-center justify-center bg-gray-600 dark:bg-gray-300 dark:text-gray-900 text-white rounded-full text-xs">
            {cart.length}
          </span>
        )}
        <div className="flex items-center gap-2">
          <p>{t("Cart.myCart")}</p>
        </div>
      </Link>
    );
  };

  const renderNavItems = () => {
    return (
      <nav className="hidden md:flex gap-4">
        <LanguageOptions />
        {renderDarkModeToggle()}
        {!isUserLoggedIn ? (
          <Link
            to="/login"
            className="hover:bg-gray-700 hover:text-white px-2 py-2 rounded"
          >
            {t("Header.login")}
          </Link>
        ) : (
          <UserDropdown />
        )}
        {renderCart()}
      </nav>
    );
  };

  const HamburgerMenuIcon = () => {
    return (
      <button
        onClick={handleMenuClick}
        className="md:hidden text-3xl focus:outline-none"
      >
        <FaBars />
      </button>
    );
  };

  const renderUserNotLoggedIn = () => {
    return (
      <>
        <Link
          to="/profile"
          className="block hover:bg-gray-600 hover:dark:bg-gray-300 hover:text-white hover:dark:text-gray-700 py-2"
        >
          {t("Header.profile")}
        </Link>
        <Link
          onClick={handleLogout}
          className="block hover:bg-gray-600 hover:dark:bg-gray-300 hover:text-white hover:dark:text-gray-700 py-2"
        >
          {t("Header.logout")}
        </Link>
      </>
    );
  };

  const renderHamburgerMenuOpen = () => {
    return (
      <div className="md:hidden p-4 rounded-lg">
        <Link
          to="/cart"
          className="block hover:bg-gray-600 hover:dark:bg-gray-300 hover:text-white hover:dark:text-gray-700 py-2"
        >
          {t("Cart.cart")}
        </Link>
        {!isUserLoggedIn ? (
          <Link
            to="/login"
            className="block hover:bg-gray-600 hover:dark:bg-gray-300 hover:text-white hover:dark:text-gray-700 py-2"
          >
            {t("Header.login")}
          </Link>
        ) : (
          renderUserNotLoggedIn()
        )}
        <div className="flex items-center gap-4 py-2 cursor-default">
          {t("Header.language")}:
          <LanguageOptionsOnMd />
        </div>
        <div className="flex items-center gap-4 py-2 cursor-default">
          {t("Header.theme")}:
          <button onClick={handleDarkModeToggle}>
            {isDarkMode ? (
              <div className="flex gap-2">
                {t("Header.lightMode")}
                <BsSun size={20} className="text-yellow-300" />
              </div>
            ) : (
              <div className="flex gap-2">
                {t("Header.darkMode")}
                <BsMoon size={20} className="text-gray-700" />
              </div>
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <header className="mb-2 md:my-8 md:mx-8 md:rounded-md shadow-custom">
      <div className="flex items-center justify-between p-3 md:p-5">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl md:text-3xl font-bold">
            E-Commerce App
          </Link>
        </div>
        {renderNavItems()}
        <HamburgerMenuIcon />
      </div>
      {isMenuOpen && renderHamburgerMenuOpen()}
    </header>
  );
};

export default Header;
