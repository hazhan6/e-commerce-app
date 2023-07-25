import React, { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { addProductToCart } from "../redux/cart";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import EditAndDeleteProduct from "./editAndDeleteProduct";
import EditModal from "./editModal";

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [quantity, setQuantity] = useState(1);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const dropdownRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleDropdownOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleDropdownOutsideClick);
    };
  }, []);

  const handleDropdownOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleAddToCart = useCallback(() => {
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
  }, [product, quantity]);

  const renderProductDetails = () => {
    return (
      <Link to={`/product/${product.id}`}>
        <div className="w-full h-40 mb-5 hover:p-3 p-5">
          <img
            src={product.image}
            alt={`Ürün ${product.id}`}
            className="object-contain w-full h-full mix-blend-multiply"
          />
        </div>

        <p className="font-semibold mb-5 text-gray-800">
          {product.title.length > 40
            ? product.title.slice(0, 40) + "..."
            : product.title}
        </p>
        <p className="text-gray-800">
          {product.description.length > 30
            ? product.description.slice(0, 30) + "..."
            : product.description}
        </p>
        <p className="font-semibold text-gray-800">${product.price}</p>
      </Link>
    );
  };

  const renderAddToCart = () => {
    return (
      <div>
        <div className="flex justify-center my-3">
          <div>
            <button
              onClick={handleDecrement}
              className="p-2 bg-gray-200 dark:bg-gray-800 rounded"
            >
              <FaCaretDown className="text-gray-700" />
            </button>
          </div>
          <div>
            <input
              type="text"
              className="md:w-12 w-8 px-2 py-1 border rounded text-gray-800 text-center outline-none dark:bg-gray-200"
              value={quantity}
              readOnly
            />
          </div>
          <div>
            <button
              onClick={handleIncrement}
              className="p-2 bg-gray-200 dark:bg-gray-800 rounded"
            >
              <FaCaretUp className="text-gray-700" />
            </button>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="md:px-6 p-1 bg-gray-600 hover:bg-gray-700 dark:bg-gray-800 hover:dark:bg-gray-900 text-white dark:text-gray-300 rounded"
        >
          {t("Cart.addToCart")}
        </button>
      </div>
    );
  };

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const renderActions = () => {
    return (
      <div className="absolute top-0 right-5 z-10 text-black">
        <button className="text-2xl" onClick={handleDropdownToggle}>
          ...
        </button>
        {isDropdownOpen && (
          <div ref={dropdownRef}>
            <EditAndDeleteProduct
              productId={product.id}
              setEditModalOpen={setEditModalOpen}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col relative items-center justify-between dark:bg-gray-300 m-1 md:m-5 py-6 text-center shadow-md hover:shadow-2xl dark:hover:shadow-slate-500 border hover:border-gray-600 dark:border-gray-600 hover:dark:border-gray-500 rounded-md">
      {renderProductDetails()}
      {renderAddToCart()}
      {renderActions()}
      {isEditModalOpen && (
        <EditModal product={product} setEditModalOpen={setEditModalOpen} />
      )}
    </div>
  );
};

export default ProductCard;
