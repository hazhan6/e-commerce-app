import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
    firstname: "",
    lastname: "",
    city: "",
    street: "",
    number: "",
    zipcode: "",
    phone: "",
  });

  const handleSetData = ({ name, value }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "phone" || name === "zipcode") {
      const numericInputRegex = /^[0-9\b]+$/;
      if (!value || numericInputRegex.test(value)) {
        handleSetData({ name, value });
      }
    } else {
      handleSetData({ name, value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.repeatPassword) {
      alert(`${t("Warnings.unmatchPassword")}`);
    } else {
      // TODO
    }
  };

  const handleCityChange = (event) => {
    //const cityValue = event.target.value;
  };

  return (
    <div className="min-h-screen flex items-center my-32 justify-center">
      <div className="p-8 rounded shadow-custom shadow-gray-500 w-full md:w-1/2">
        <h2 className="text-2xl font-semibold text-center mb-8">
          {" "}
          {t("Header.signup")}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-1/2 md:pr-2 mb-4">
              <label htmlFor="email" className="block font-medium mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500"
                required
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-2">
              <label htmlFor="username" className="block font-medium mb-1">
                {t("Profile.username")}:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-1/2 md:pr-2 mb-4">
              <label htmlFor="password" className="block font-medium mb-1">
                {t("Profile.password")}:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500"
                required
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-2">
              <label
                htmlFor="repeatPassword"
                className="block font-medium mb-1"
              >
                {t("Profile.passwordRepeat")}:
              </label>
              <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-1/2 md:pr-2 mb-4">
              <label htmlFor="firstName" className="block font-medium mb-1">
                {t("Profile.firstName")}:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500"
                required
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-2">
              <label htmlFor="lastName" className="block font-medium mb-1">
                {t("Profile.lastName")}:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-1/2 md:pr-2">
              <label htmlFor="phone" className="block font-medium mb-1">
                {t("Profile.phoneNumber")}:
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500"
                required
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">
              {t("Checkout.address")}:
            </label>
            <div className="p-5">
              <div className="flex flex-wrap mb-4">
                <div className="w-full md:w-1/2 md:pr-2 mb-4">
                  <label htmlFor="city" className="block font-medium mb-1">
                    {t("Profile.city")}:
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={(e) => {
                      handleInputChange(e);
                      handleCityChange(e);
                    }}
                    className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500"
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 md:pl-2">
                  <label htmlFor="street" className="block font-medium mb-1">
                    {t("Profile.street")}:
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap mb-4">
                <div className="w-full md:w-1/2 md:pr-2 mb-4">
                  <label htmlFor="number" className="block font-medium mb-1">
                    {t("Profile.number")}:
                  </label>
                  <input
                    type="text"
                    id="number"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500"
                    required
                  />
                </div>
                <div className="w-full md:w-1/2 md:pl-2">
                  <label htmlFor="zipcode" className="block font-medium mb-1">
                    {t("Checkout.zipcode")}:
                  </label>
                  <input
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500"
                    required
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 mt-4 bg-gray-600 hover:bg-gray-700 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-700 font-semibold rounded"
          >
            {t("Header.signup")}
          </button>
          <Link
            to="/login"
            className="block text-center mt-4 underline text-gray-500"
          >
            {t("Warnings.haveAccount")}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
