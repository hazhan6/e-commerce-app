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

  const handleSetInsideInput = ({ name, value, upName }) => {
    return setUserDetails({
      ...userDetails,
      [upName]: {
        ...userDetails[upName],
        [name]: value,
      },
    });
  };

  const handleSetInput = ({ name, value }) => {
    return setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" || name === "zipcode" || name === "number") {
      const numericInputRegex = /^[0-9-\b]+$/;
      if (!value || numericInputRegex.test(value)) {
        name === "phone"
          ? handleSetInput({ name, value })
          : handleSetInsideInput({ name, value, upName: "address" });
      }
    } else if (name === "firstname" || name === "lastname") {
      handleSetInsideInput({ name, value, upName: "name" });
    } else if (name === "city" || name === "street") {
      handleSetInsideInput({ name, value, upName: "address" });
    } else {
      handleSetInput({ name, value });
    }
  };

  const renderInputByKey = ({ type, name, upName }) => {
    return (
      <input
        id={name}
        type={type}
        name={name}
        required
        value={upName ? userDetails[upName][name] : userDetails[name]}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border rounded text-gray-800 outline-gray-500 bg-gray-200"
      />
    );
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
              {renderInputByKey({ type: "email", name: "email" })}
            </div>
            <div className="w-full md:w-1/2 md:pl-2">
              <label htmlFor="username" className="block font-medium mb-1">
                {t("Profile.username")}:
              </label>
              {renderInputByKey({ type: "text", name: "username" })}
            </div>
          </div>
          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-1/2 md:pr-2">
              <label htmlFor="phone" className="block font-medium mb-1">
                {t("Profile.phoneNumber")}:
              </label>
              {renderInputByKey({ type: "tel", name: "phone" })}
            </div>
            <div className="w-full md:w-1/2 md:pl-2 mb-4">
              <label htmlFor="password" className="block font-medium mb-1">
                {t("Profile.password")}:
              </label>
              {renderInputByKey({ type: "password", name: "password" })}
            </div>
          </div>
          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-1/2 md:pr-2 mb-4">
              <label htmlFor="firstname" className="block font-medium mb-1">
                {t("Profile.firstName")}:
              </label>
              {renderInputByKey({
                type: "text",
                name: "firstname",
                upName: "name",
              })}
            </div>
            <div className="w-full md:w-1/2 md:pl-2">
              <label htmlFor="lastname" className="block font-medium mb-1">
                {t("Profile.lastName")}:
              </label>
              {renderInputByKey({
                type: "text",
                name: "lastname",
                upName: "name",
              })}
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
                  {renderInputByKey({
                    type: "text",
                    name: "city",
                    upName: "address",
                  })}
                </div>
                <div className="w-full md:w-1/2 md:pl-2">
                  <label htmlFor="street" className="block font-medium mb-1">
                    {t("Profile.street")}:
                  </label>
                  {renderInputByKey({
                    type: "text",
                    name: "street",
                    upName: "address",
                  })}
                </div>
              </div>
              <div className="flex flex-wrap mb-4">
                <div className="w-full md:w-1/2 md:pr-2 mb-4">
                  <label htmlFor="number" className="block font-medium mb-1">
                    {t("Profile.number")}:
                  </label>
                  {renderInputByKey({
                    type: "text",
                    name: "number",
                    upName: "address",
                  })}
                </div>
                <div className="w-full md:w-1/2 md:pl-2">
                  <label htmlFor="zipcode" className="block font-medium mb-1">
                    {t("Checkout.zipcode")}:
                  </label>
                  {renderInputByKey({
                    type: "text",
                    name: "zipcode",
                    upName: "address",
                  })}
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
