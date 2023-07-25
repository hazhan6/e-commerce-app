import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getProducts } from "../redux/products";
import ProductCard from "./productCard";
import { useTranslation } from "react-i18next";

const ProductsSection = ({ isCategoryPage, category }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const productsStore = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOption, setSortOption] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState(
    category ? category : ""
  );

  useEffect(() => {
    dispatch(getProducts({ sortOption, selectedCategory }));
  }, [sortOption, selectedCategory]);

  useEffect(() => {
    if (!isCategoryPage) dispatch(getCategories());
  }, []);

  useEffect(() => {
    setProducts(productsStore?.products);
  }, [productsStore?.products]);

  useEffect(() => {
    if (!isCategoryPage) setCategories(productsStore?.categories);
  }, [productsStore?.categories]);

  const paginateProducts = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * rowsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - rowsPerPage;
  const currentProducts = products?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const renderCategoryFilter = () => {
    return (
      <div className="flex flex-col w-2/5 md:w-2/3 md:border rounded-lg p-1 md:p-4">
        <label className="mb-2">{t("filterByCategory")}</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mt-1 p-2 outline-gray-500 dark:bg-gray-300 border rounded dark:text-gray-700"
        >
          <option value="">{t("allCategory")}</option>
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

  const renderFilterOptions = () => {
    return (
      <>
        <div className="flex flex-col w-1/5 md:w-2/3 md:mt-5 md:border rounded-lg p-1 md:p-4">
          <label className="mb-2">{t("show")}</label>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(e.target.value)}
            className="mt-1 p-2 outline-gray-500 dark:bg-gray-300 border rounded dark:text-gray-700"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value={products?.length}>{t("all")}</option>
          </select>
        </div>
        <div className="flex flex-col w-2/5 md:w-2/3 md:border rounded-lg p-1 md:p-4">
          <label className="mb-2">{t("sortBy")}</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="mt-1 p-2 border rounded outline-gray-500 dark:bg-gray-300 dark:text-gray-700"
          >
            <option value="default">{t("default")}</option>
            <option value="asc">{t("asc")}</option>
            <option value="desc">{t("desc")}</option>
          </select>
        </div>
        {!isCategoryPage && renderCategoryFilter()}
      </>
    );
  };

  const renderPagination = () => {
    return (
      <div className="flex justify-center mt-5">
        {Array.from({
          length: Math.ceil(products?.length / rowsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginateProducts(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-gray-700 text-white"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex md:flex-row flex-col md:p-10 gap-7">
      <div className="md:w-1/5 flex flex-row md:flex-col items-center border border-gray-400 rounded-lg md:gap-7">
        {renderFilterOptions()}
      </div>

      <div className="w-full md:w-4/5 mr-12 border border-gray-400 rounded-lg p-2">
        <p className="mb-4 font-semibold text-4xl text-center dark:text-gray-200 ">
          {category ? t(category).toUpperCase() : t("Products.products")}
        </p>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-0 md:gap-4">
          {currentProducts &&
            currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
        {renderPagination()}
      </div>
    </div>
  );
};

export default ProductsSection;
