import Home from "../../views/Home";
import Product from "../../views/Product";
import ProductsByCategory from "../../views/ProductsByCategory";
import Profile from "../../views/Profile";
import Cart from "../../views/Cart";
import Login from "../../views/Login";
import SignUp from "../../views/SignUp";
import Checkout from "../../views/Checkout";

export const AppRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/products/:selectedCategory",
    element: <ProductsByCategory />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
];
