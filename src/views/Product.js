import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../redux/products";
import { FaStar, FaRegStar, FaCaretUp, FaCaretDown } from "react-icons/fa";
import { addProductToCart } from "../redux/cart";
import { useSnackbar } from "notistack";
import Loading from "./Loading";
import { useTranslation } from "react-i18next";

const Product = () => {
  const { id } = useParams();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const productsStore = useSelector((state) => state.products);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getSingleProduct({ productId: id }));
  }, [id]);

  useEffect(() => {
    setProduct(productsStore?.product);
  }, [productsStore?.product]);

  const renderStars = (rate) => {
    if (!rate) {
      return null;
    }
    const filledStars = Math.round(rate);
    const remainingStars = 5 - filledStars;

    return (
      <div className="flex items-center">
        {[...Array(filledStars)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500 text-xl" />
        ))}
        {[...Array(remainingStars)].map((_, index) => (
          <FaRegStar key={index} className="text-gray-400 text-xl" />
        ))}
      </div>
    );
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleAddToCart = () => {
    try {
      dispatch(addProductToCart({ product, quantity }));
      enqueueSnackbar(`${t("Warnings.addToCartSuccess")}`, {
        variant: "success",
        preventDuplicate: true,
      });
    } catch (error) {
      enqueueSnackbar(`${t("Warnings.addToCartFail")}`, {
        variant: "error",
        preventDuplicate: true,
      });
    }
  };

  const renderProductDetails = () => {
    return (
      <>
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <p className="mb-4">{product.description}</p>
        <div className="flex items-center mb-2 justify-between">
          <div className="text-lg font-semibold">${product.price}</div>
          <div className="ml-4 flex gap-2">
            {product?.rating?.rate}
            {renderStars(product?.rating?.rate)}
          </div>
        </div>
        <p className="flex justify-end">
          {t("Products.reviews")}: {product?.rating?.count}
        </p>
      </>
    );
  };

  const renderAddToCart = () => {
    return (
      <div className="flex items-center">
        <div className="flex items-center mr-5">
          <div>
            <button
              onClick={handleDecrement}
              className="p-2 py-3 bg-gray-200 dark:bg-gray-800 rounded"
            >
              <FaCaretDown />
            </button>
          </div>
          <div>
            <input
              type="text"
              className="md:w-16 w-8 px-2 py-2 border rounded text-gray-800 dark:bg-gray-300 text-center outline-none"
              value={quantity}
              readOnly
            />
          </div>
          <div>
            <button
              onClick={handleIncrement}
              className="p-2 py-3 bg-gray-200 dark:bg-gray-800 rounded"
            >
              <FaCaretUp />
            </button>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="md:px-4 p-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-800 hover:dark:bg-gray-900 text-white dark:text-gray-300 rounded"
        >
          {t("Cart.addToCart")}
        </button>
      </div>
    );
  };

  if (!product?.id) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen mb:my-8 md:mx-8">
      <div className="p-20 md:shadow-custom h-1/2 rounded-md">
        <p className="font-semibold mb-2">
          {`${t("Categories.category")} > ${t(product.category).toUpperCase()}`}
        </p>
        <div className="flex flex-col md:flex-row justify-center">
          <div className="md:w-1/2 p-5 dark:bg-gray-300 rounded-md">
            <img
              src={product.image}
              alt={`Product ${product.id}`}
              className="w-full h-auto max-h-96 object-contain mix-blend-multiply"
            />
          </div>
          <div className="md:w-1/2 p-5 flex flex-col md:ml-8">
            {renderProductDetails()}
            {renderAddToCart()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
