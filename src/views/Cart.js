import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteProductFromCart, updateCart } from "../redux/cart";
import { Link, useNavigate } from "react-router-dom";
import { FaCaretUp, FaCaretDown, FaTrash } from "react-icons/fa";
import { useSnackbar } from "notistack";
import withReactContent from "sweetalert2-react-content";
import { default as SweetAlert } from "sweetalert2";
import { getLimitedProducts } from "../redux/products";
import ProductCard from "../components/productCard";
import { useTranslation } from "react-i18next";

const Swal = withReactContent(SweetAlert);

const EmptyCart = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const productsStore = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(getLimitedProducts());
  }, []);

  useEffect(() => {
    setProducts(productsStore?.limitedProducts);
  }, [productsStore?.limitedProducts]);

  return (
    <div className="min-h-screen mt-8 mx-8">
      <div className="flex flex-col gap-5 items-center md:p-12 md:shadow-custom justify-center">
        <h2 className="text-2xl font-bold">{t("Cart.emptyCart")}</h2>
        <p>{t("Cart.emptyCartDesc")}</p>
        <p>{t("Cart.or")}</p>
        <Link to="/" className="px-4 py-2 rounded-md bg-gray-800 text-white">
          {t("Links.goToHome")}
        </Link>

        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-0 md:gap-4">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

const CartItem = ({ item, handleIncrement, handleDecrement, handleDelete }) => {
  return (
    <div
      key={item.id}
      className="flex md:flex-row flex-col items-center p-4 shadow-md rounded-md dark:bg-gray-300"
    >
      <div className="flex-shrink-0 mb-2 mx-5">
        <img
          src={item.image}
          alt={`Product ${item.id}`}
          className="w-28 h-auto max-h-36 mix-blend-multiply"
        />
      </div>
      <div className="flex flex-col gap-2 ml-4">
        <Link to={`/product/${item.id}`}>
          <p className="font-medium text-gray-800">
            {item.title.slice(0, 300) + "..."}
          </p>
          <p className="font-light text-gray-800">
            {item.description.slice(0, 80) + "..."}
          </p>
        </Link>
        <p className="text-gray-800">
          {item.quantity} x ${item.price}
        </p>
        <div className="flex items-center">
          <div>
            <button
              onClick={() => handleDecrement(item)}
              className="p-2 bg-gray-200 dark:bg-gray-800 rounded"
            >
              <FaCaretDown className="text-gray-700" />
            </button>
          </div>
          <div>
            <input
              type="text"
              className="md:w-12 w-8 px-2 py-1 border rounded text-gray-800 text-center outline-none dark:bg-gray-200"
              value={item.quantity}
              readOnly
            />
          </div>
          <div>
            <button
              onClick={() => handleIncrement(item)}
              className="p-2 bg-gray-200 dark:bg-gray-800 rounded"
            >
              <FaCaretUp className="text-gray-700" />
            </button>
          </div>
          <div>
            <button
              onClick={() => handleDelete(item)}
              className="mx-2 px-2 py-2 bg-gray-800 text-white dark:text-gray-200 rounded"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const cartStore = useSelector((state) => state.cart);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    dispatch(getLimitedProducts());
  }, []);

  useEffect(() => {
    setCartProducts(cartStore.cart);
  }, [cartStore?.cart]);

  const totalAmount = cartProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleIncrement = (item) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    handleUpdate(updatedItem);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      handleUpdate(updatedItem);
    }
  };

  const handleUpdate = (item) => {
    try {
      dispatch(updateCart(item));
      enqueueSnackbar(`${t("Warnings.updateCartSuccess")}`, {
        variant: "success",
        preventDuplicate: true,
      });
    } catch (error) {
      enqueueSnackbar(`${t("Warnings.updateCartSuccess")}`, {
        variant: "error",
        preventDuplicate: true,
      });
    }
  };

  const handleDelete = async (item) => {
    try {
      dispatch(deleteProductFromCart(item.id));
      enqueueSnackbar(`${t("Warnings.deleteProductSuccess")}`, {
        variant: "success",
        preventDuplicate: true,
      });
    } catch (error) {
      enqueueSnackbar(`${t("Warnings.deleteProductFail")}`, {
        variant: "error",
        preventDuplicate: true,
      });
    }
  };

  const handleClearCart = async () => {
    const result = await Swal.fire({
      title: `${t("Warnings.sureForClear")}`,
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
        dispatch(clearCart());
        enqueueSnackbar(`${t("Warnings.clearCartSuccess")}`, {
          variant: "success",
          preventDuplicate: true,
        });
      } catch (error) {
        enqueueSnackbar(`${t("Warnings.clearCartFail")}`, {
          variant: "error",
          preventDuplicate: true,
        });
      }
    }
  };

  const handleCheckout = async () => {
    if (isUserLoggedIn) {
      enqueueSnackbar(`${t("Links.redirectToCheckout")}`, {
        variant: "success",
        preventDuplicate: true,
      });
      navigate(`/checkout`);
    } else {
      const result = await Swal.fire({
        title: `Warning`,
        text: `${t("Warnings.authenticationForCheckout")}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `${t("Links.goToLogin")}`,
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
        navigate(`/login`);
      }
    }
  };

  if (!cartProducts?.length) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen mb-2 md:my-8 md:mx-8">
      <div className="md:p-12 md:shadow-custom">
        <div className="flex items-center justify-between mt-10 md:mt-0 p-5 md:p-0">
          <h2 className="text-xl font-bold">
            {t("Cart.myCart")} ({cartProducts.length} {t("Products.productss")})
          </h2>
          <button
            onClick={() => handleClearCart()}
            className="flex items-center gap-2 px-4 py-2 md:mt-5 bg-gray-800 text-white dark:text-gray-200 rounded"
          >
            <FaTrash />
            {t("Cart.clearCart")}
          </button>
        </div>
        <div className="mt-6 flex md:flex-row flex-col-reverse gap-10">
          <div className="md:w-4/5 grid gap-6">
            {cartProducts.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                handleDelete={handleDelete}
              />
            ))}
          </div>

          <div className="flex md:flex-col md:justify-normal justify-evenly md:w-1/5 md:h-min p-4 shadow-custom rounded-md dark:bg-gray-300">
            <div>
              <h3 className="text-lg text-gray-800 font-semibold">
                {t("Cart.totalAmount")}
              </h3>
              <p className="text-gray-800">${totalAmount.toFixed(2)}</p>
            </div>
            <button
              onClick={() => handleCheckout()}
              className="px-4 py-2 md:mt-5 bg-gray-800 text-white dark:text-gray-200 rounded"
            >
              {t("Cart.checkout")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
