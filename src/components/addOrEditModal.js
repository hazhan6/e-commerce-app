import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getCategories, updateProduct } from "../redux/products";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";

const AddOrEditModal = ({ product, setModalOpen }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { selectedCategory } = useParams();

  const categories = useSelector((state) => state.products.categories);
  const [inputData, setInputData] = useState(
    product
      ? { ...product }
      : {
          title: "",
          price: "",
          description: "",
          category: selectedCategory || "",
        }
  );
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    if (
      !inputData?.category ||
      !inputData?.price ||
      !inputData?.description ||
      !inputData?.title
    ) {
      return setWarning(true);
    }
    try {
      dispatch(
        product ? updateProduct({ inputData }) : addProduct({ inputData })
      );
      enqueueSnackbar(
        `${t(
          product
            ? "Warnings.updatedProductSuccess"
            : "Warnings.addedProductSuccess"
        )}`,
        {
          variant: "success",
          preventDuplicate: true,
        }
      );
      handleModalClose();
    } catch (error) {
      enqueueSnackbar(
        `${t(
          product ? "Warnings.updatedProductFail" : "Warnings.addedProductFail"
        )}`,
        {
          variant: "error",
          preventDuplicate: true,
        }
      );
    }
  };

  const renderInputByKey = ({ type, name }) => {
    return (
      <input
        id={name}
        type={type}
        name={name}
        required
        value={inputData[name]}
        onChange={handleInputChange}
        className="w-full border p-2 rounded text-gray-800 outline-gray-500 bg-gray-200"
      />
    );
  };

  const renderCategorySelect = () => {
    return (
      <div className="flex flex-col md:border rounded-lg">
        <select
          name="category"
          value={inputData?.category}
          onChange={handleInputChange}
          className="p-2 outline-gray-500 dark:bg-gray-300 border rounded dark:text-gray-700"
          disabled={selectedCategory ? true : false}
        >
          <option value={""}></option>
          {categories &&
            categories.map((category) => (
              <option key={category} value={category}>
                {t(category).toUpperCase()}
              </option>
            ))}
        </select>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white dark:bg-gray-600 rounded-lg p-6 z-10 max-w-3xl w-full">
        <h2 className="text-2xl font-semibold mb-4">
          {product ? t("Products.update") : t("Products.add")}
        </h2>
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium">
            {t("Products.title")}: *
          </label>
          {renderInputByKey({ type: "text", name: "title" })}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium">
            {t("Products.description")}: *
          </label>
          {renderInputByKey({ type: "text", name: "description" })}
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block font-medium">
            {t("Products.price")}: *
          </label>
          {renderInputByKey({ type: "number", name: "price" })}
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block font-medium">
            {t("Categories.category")}: *
          </label>
          {renderCategorySelect()}
        </div>
        {warning && (
          <div className="mb-4">
            <p>{t("Warnings.canNotBeBlank")}</p>
          </div>
        )}
        <div className="flex justify-end">
          <button
            onClick={handleSaveChanges}
            className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
          >
            {t("Warnings.save")}
          </button>
          <button
            onClick={handleModalClose}
            className="ml-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            {t("Warnings.cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOrEditModal;
