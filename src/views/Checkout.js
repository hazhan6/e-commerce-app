import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../redux/user";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Loading from "./Loading";
import { useSnackbar } from "notistack";
import withReactContent from "sweetalert2-react-content";
import { default as SweetAlert } from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Swal = withReactContent(SweetAlert);

const DummyContent = React.memo(({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className="border mt-6 p-4"
      style={{ height: `${isExpanded ? "200px" : "80px"}`, overflowY: "auto" }}
    >
      <h3
        className="text-lg font-semibold mb-3 cursor-pointer"
        onClick={toggleExpansion}
      >
        {title} {isExpanded ? "-" : "+"}
      </h3>
      {isExpanded && (
        <div>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
});

const Checkout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const userId = useSelector((state) => state.auth.userId);
  const userStore = useSelector((state) => state.user);
  const cartStore = useSelector((state) => state.cart);

  const [userDetails, setUserDetails] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [cardInfo, setCardInfo] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
    focus: "",
  });
  const [agreement, setAgreement] = useState(false);
  const [warnings, setWarnings] = useState({
    cardName: false,
    cardCvc: false,
    cardExpiry: false,
    cardNumber: false,
  });

  useEffect(() => {
    dispatch(getUserDetails({ userId }));
  }, [userId]);

  useEffect(() => {
    setCartProducts(cartStore.cart);
  }, [cartStore?.cart]);

  useEffect(() => {
    setUserDetails(userStore?.user);
  }, [userStore?.user]);

  const formatCardNumber = (input) => {
    const cardNumber = input.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ");
    return cardNumber.trim();
  };

  const formatExpiryDate = (input) => {
    const expiryDate = input
      .replace(/\s/g, "")
      .replace(/(\d{2})(\d{2})/, "$1/$2");
    return expiryDate;
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    if (name === "number" || name === "cvc" || name === "expiry") {
      const onlyNums = value.replace(/[^0-9]/g, "");
      setCardInfo((prev) => ({
        ...prev,
        [name]:
          name === "number"
            ? formatCardNumber(onlyNums)
            : name === "expiry"
            ? formatExpiryDate(onlyNums)
            : onlyNums,
      }));
    } else {
      setCardInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleInputFocus = (e) => {
    setCardInfo((prev) => ({
      ...prev,
      focus: e.target.name,
    }));
  };

  const agreementContent = (
    <>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis
        nisl lacus, et feugiat felis accumsan vel. Fusce dapibus interdum est
        sit amet rhoncus. Integer id sem erat. Nullam porttitor bibendum justo
        quis cursus. Cras in libero ligula. Sed sit amet convallis erat. In eu
        ex sed lorem lacinia consequat. In vestibulum sit amet lorem nec
        venenatis. Nunc non eleifend odio, at ultricies urna.
      </p>
      <p>
        Etiam eu velit mi. Ut imperdiet bibendum tincidunt. Aliquam non mattis
        ipsum. Integer consequat bibendum sapien, eu dignissim eros blandit
        vitae. Nam et est non lacus feugiat tempus. Quisque nec massa eget risus
        malesuada consectetur. Nullam vitae metus nec mauris mollis tristique.
        Pellentesque nec posuere nunc. Quisque eget turpis eget ex rhoncus
        laoreet a ac felis. Proin eu fringilla tortor. Vestibulum convallis
        dapibus nunc, vitae tempus nunc rutrum nec. Nullam euismod est nec
        mauris bibendum, vitae iaculis neque tristique. Integer pretium augue eu
        tincidunt consectetur. Nullam quis fringilla mauris.
      </p>
    </>
  );

  const formContent = (
    <>
      <p>
        Praesent gravida, nisl in vulputate viverra, elit risus vestibulum
        felis, sit amet bibendum quam orci sit amet nisl. Vivamus ac felis eu
        neque bibendum aliquet. Pellentesque habitant morbi tristique senectus
        et netus et malesuada fames ac turpis egestas. Integer nec tempor justo.
        Sed pulvinar justo at odio interdum, vel dignissim orci hendrerit.
        Maecenas eu purus ut est hendrerit tincidunt nec nec justo. Sed id
        egestas quam, non pellentesque eros. Sed at scelerisque ex, non blandit
        sapien. Proin sed turpis et nulla ultricies bibendum. Nam ullamcorper
        sit amet felis vitae congue. Nulla facilisi.
      </p>
      <p>
        Etiam rhoncus euismod bibendum. Ut eleifend, mauris in tincidunt
        interdum, lectus libero dignissim massa, et vestibulum arcu elit
        sagittis mi. Suspendisse potenti. Ut viverra facilisis elit eget
        eleifend. Donec in nisl purus. Pellentesque facilisis a elit at posuere.
        Nunc eleifend odio quis purus hendrerit, eget iaculis elit interdum. Nam
        semper orci sit amet purus consequat, sit amet bibendum turpis
        tincidunt. Integer nec nunc in ex pellentesque facilisis. Integer quis
        turpis cursus, efficitur elit ut, congue tortor. Ut varius fermentum
        dolor eu dignissim.
      </p>
    </>
  );

  const totalAmount = cartProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleAgreementChange = (e) => {
    setAgreement(e.target.checked);
  };

  const handleCheckout = async () => {
    setWarnings({
      cardName: !cardInfo.name,
      cardCvc: !(cardInfo.cvc?.length === 3),
      cardExpiry: !(cardInfo.expiry?.length === 5),
      cardNumber: !(cardInfo.number?.length === 19),
    });

    if (
      !agreement ||
      !cardInfo.name ||
      !(cardInfo.cvc?.length === 3) ||
      !(cardInfo.expiry?.length === 5) ||
      !(cardInfo.number?.length === 19)
    ) {
      return;
    }

    const result = await Swal.fire({
      title: `${t("Checkout.confirmOrder")}`,
      text: `${t("Checkout.confirmOrderDesc")}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `${t("Warnings.continue")}`,
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
        // payment
        enqueueSnackbar(`${t("Warnings.orderTakenSuccess")}`, {
          variant: "success",
          preventDuplicate: true,
        });
        localStorage.removeItem("cart");
        navigate(`/`);
      } catch (error) {
        enqueueSnackbar(`${t("Warnings.orderTakenFail")}`, {
          variant: "error",
          preventDuplicate: true,
        });
      }
    }
  };

  const renderUserInfo = () => {
    return (
      <div className="border p-4">
        <h3 className="text-lg font-semibold mb-3">
          {t("Checkout.deliveryAddress")}
        </h3>
        <p>
          {t("Checkout.to")}:{" "}
          {userDetails.name?.firstname.toUpperCase() +
            " " +
            userDetails.name?.lastname.toUpperCase()}
        </p>
        <p> Email: {userDetails.email}</p>
        <p> {t("Checkout.address")}:</p>
        <div className="px-2">
          <p> No: {userDetails.address?.number}</p>
          <p>
            {userDetails.address?.street.toUpperCase() +
              " / " +
              userDetails.address?.city.toUpperCase()}
          </p>
          <p>
            {t("Checkout.zipcode")}: {userDetails.address?.zipcode}{" "}
          </p>
        </div>
      </div>
    );
  };

  const renderInputByKey = ({ type, name, maxLength }) => {
    return (
      <input
        type={type}
        name={name}
        maxLength={maxLength}
        required
        value={cardInfo[name]}
        onChange={handleCardChange}
        onFocus={handleInputFocus}
        className="w-full border p-2 rounded text-gray-800 outline-gray-500 bg-gray-200"
      />
    );
  };

  const renderCartInformation = () => {
    return (
      <div className="border p-4">
        <h3 className="text-lg font-semibold mb-3">
          {t("Checkout.cardInformation")}
        </h3>
        <div className="flex lg:flex-row flex-col gap-4 mt-4">
          <div className="lg:w-2/5 ml-2">
            <h4 className="text-md font-semibold mb-3">{t("Checkout.name")}</h4>
            {renderInputByKey({ type: "text", name: "name", maxLength: "" })}
            <h4 className="text-md font-semibold mt-3">
              {t("Checkout.cartNumber")}
            </h4>
            {renderInputByKey({ type: "tel", name: "number", maxLength: "19" })}
            <h4 className="text-md font-semibold mt-3">
              {t("Checkout.expiry")}
            </h4>
            {renderInputByKey({ type: "tel", name: "expiry", maxLength: "4" })}
            <h4 className="text-md font-semibold mt-3">CVC</h4>
            {renderInputByKey({ type: "tel", name: "cvc", maxLength: "3" })}
          </div>
          <div className="lg:w-3/5">
            <Cards
              cvc={cardInfo.cvc}
              expiry={cardInfo.expiry}
              focused={cardInfo.focus}
              name={cardInfo.name}
              number={cardInfo.number}
            />
          </div>
        </div>
      </div>
    );
  };

  const ProductCard = ({ product }) => {
    return (
      <div className="flex md:flex-row flex-col items-center shadow-md rounded-md dark:bg-gray-300 mb-2">
        <div className="flex-shrink-0 mb-2 mx-5">
          <img
            src={product.image}
            alt={`Product ${product.id}`}
            className="w-14 h-auto max-h-36 mix-blend-multiply"
          />
        </div>
        <div className="flex flex-col gap-2 ml-4">
          <p className="font-medium text-xs text-gray-800">
            {product.title.slice(0, 300) + "..."}
          </p>
          <p className="font-thin text-xs text-gray-800">
            {product.description.slice(0, 80) + "..."}
          </p>
          <p className="font-normal text-xs text-gray-800">
            {product.quantity + " x  $" + product.price}
          </p>
        </div>
      </div>
    );
  };

  const renderShippingDetails = () => {
    return (
      <>
        <div className="border p-2">
          <h4 className="text-md font-semibold mb-2">
            {t("Checkout.standardDelivery")}
          </h4>
          <p className="font-medium text-xs text-gray-700">
            {t("Checkout.estimatedDeliveryDate") + ": 5 September"}
          </p>
        </div>
        <div className="border p-2 mt-2">
          <h4 className="text-md font-semibold mb-2">
            {t("Checkout.shippingPrice")}
          </h4>
          {"$ 0"}
        </div>
      </>
    );
  };

  const renderContracts = () => {
    return (
      <div className="md:w-4/5">
        <DummyContent
          title={t("Checkout.agreementContent")}
          content={agreementContent}
        />
        <DummyContent title={t("Checkout.formContent")} content={formContent} />
      </div>
    );
  };

  const renderWarnings = () => {
    return (
      <>
        {warnings.cardName && (
          <p className="text-red-500 mt-2">
            * {t("Warnings.cartNameRequired")}
          </p>
        )}
        {warnings.cardCvc && (
          <p className="text-red-500 mt-2">* {t("Warnings.CVCRequired")}</p>
        )}
        {warnings.cardExpiry && (
          <p className="text-red-500 mt-2">* {t("Warnings.expiryRequired")}</p>
        )}
        {warnings.cardNumber && (
          <p className="text-red-500 mt-2">
            * {t("Warnings.cartNumberRequired")}
          </p>
        )}
      </>
    );
  };

  const renderPrices = () => {
    return (
      <>
        <div className="mt-4 flex justify-between">
          <div className="text-gray-800">{t("Checkout.shippingPrice")}:</div>
          <div className="text-gray-800">${0}</div>
        </div>
        <div className="mt-2 flex justify-between">
          <div className="text-gray-800">{t("Checkout.cartTotal")}:</div>
          <div className="text-gray-800">${totalAmount.toFixed(2)}</div>
        </div>
      </>
    );
  };

  const renderCheckoutContainer = () => {
    return (
      <>
        <div>
          <h3 className="text-lg text-gray-800 font-semibold">
            {t("Cart.totalAmount")}
          </h3>
          <p className="text-gray-800 text-4xl">${totalAmount.toFixed(2)}</p>
        </div>
        <div className="mt-6">
          <input
            type="checkbox"
            id="agreementCheckbox"
            checked={agreement}
            onChange={handleAgreementChange}
            className="mr-2"
          />
          <label className="dark:text-gray-700" htmlFor="agreementCheckbox">
            {t("Checkout.contractApprove")} *
          </label>
        </div>
        <div className="mt-4">
          <button
            onClick={handleCheckout}
            disabled={!agreement}
            className={`px-4 py-2 rounded-md ${
              agreement
                ? "bg-gray-800 text-white"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
          >
            {t("Checkout.completeOrder")}
          </button>
        </div>
        {renderWarnings()}
        {renderPrices()}
      </>
    );
  };

  if (!userDetails?.name) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen mb-2 md:my-8 md:mx-8">
      <div className="md:p-12 md:shadow-custom">
        <div className="flex items-center justify-between mt-10 md:mt-0 p-5 md:p-0">
          <h2 className="text-2xl font-bold">{t("Checkout.completeOrder")}</h2>
        </div>

        <div className="flex md:flex-row flex-col-reverse md:gap-7">
          <div className="md:w-4/5">
            <div className="mt-6 flex flex-col gap-10">
              {renderUserInfo()}
              {renderCartInformation()}
            </div>
            <div className="border mt-6 p-4">
              <h3 className="text-lg font-semibold mb-3">
                {t("Checkout.deliveryOptions")}
              </h3>
              <div className="flex md:flex-row flex-col gap-4 mt-4">
                <div className="md:w-2/3">
                  <h4 className="text-md font-semibold mb-3">
                    {t("Products.products")}
                  </h4>
                  {cartProducts &&
                    cartProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <div className="md:w-1/3">{renderShippingDetails()}</div>
              </div>
            </div>
            {renderContracts()}
          </div>

          <div className="flex flex-col md:w-1/5 md:h-min sticky top-0 p-4 shadow-custom rounded-md dark:bg-gray-300">
            {renderCheckoutContainer()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
