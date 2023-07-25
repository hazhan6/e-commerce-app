import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../redux/user";
import Loading from "./Loading";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userId);
  const userStore = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    dispatch(getUserDetails({ userId }));
  }, [userId]);

  useEffect(() => {
    setUserDetails(userStore?.user);
  }, [userStore?.user]);

  if (!userDetails?.id) {
    return <Loading />;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "phone" || name === "zipcode") {
      const numericInputRegex = /^[0-9\b]+$/;
      if (!value || numericInputRegex.test(value)) {
        setUserDetails({
          ...userDetails,
          [name]: value,
        });
      }
    } else if (name === "firstname" || name === "lastname") {
      setUserDetails({
        ...userDetails,
        name: {
          ...userDetails.name,
          [name]: value,
        },
      });
    } else if (
      name === "city" ||
      name === "street" ||
      name === "number" ||
      name === "zipcode"
    ) {
      setUserDetails({
        ...userDetails,
        name: {
          ...userDetails.address,
          [name]: value,
        },
      });
    } else {
      setUserDetails({
        ...userDetails,
        [name]: value,
      });
    }
  };

  const handleCityChange = (event) => {
    //const cityValue = event.target.value;
  };

  return (
    <div className="min-h-screen mb:my-8 md:mx-8">
      <div className="p-20 md:shadow-custom h-1/2">
        <p className="flex items-center gap-5 font-semibold text-xl">
          {t("Header.profile")}
        </p>
        <div className="mt-10">
          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-1/2 md:pr-2 mb-4">
              <label htmlFor="email" className="block font-medium mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500 bg-gray-200"
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
                value={userDetails.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500 bg-gray-200"
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
                value={userDetails.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500 bg-gray-200"
                required
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-2 mb-4">
              <label htmlFor="password" className="block font-medium mb-1">
                {t("Profile.password")}:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={userDetails.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500 bg-gray-200"
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
                value={userDetails.name.firstname}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500 bg-gray-200"
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
                value={userDetails.name.lastname}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500 bg-gray-200"
                required
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
                    value={userDetails.address.city}
                    onChange={(e) => {
                      handleInputChange(e);
                      handleCityChange(e);
                    }}
                    className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500 bg-gray-200"
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
                    value={userDetails.address.street}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500 bg-gray-200"
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
                    value={userDetails.address.number}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500 bg-gray-200"
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
                    value={userDetails.address.zipcode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500 bg-gray-200"
                    required
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </div>
              </div>
              {/* <div className="flex flex-wrap justify-end">
                <button className="px-4 py-2 md:mt-5 bg-gray-800 text-white dark:text-gray-200 rounded">
                  Update Profile
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
