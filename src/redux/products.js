import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  products: [],
  product: {},
  limitedProducts: [],
};

const fetchData = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export const getCategories = createAsyncThunk("getCategories", async () => {
  const categories = await fetchData(
    "https://fakestoreapi.com/products/categories"
  );
  return categories;
});

export const getProducts = createAsyncThunk(
  "getProducts",
  async ({ sortOption, selectedCategory }) => {
    let url = "https://fakestoreapi.com/products";

    if (selectedCategory !== "") {
      url += `/category/${selectedCategory}`;
    }

    if (sortOption !== "default") {
      url += `?sort=${sortOption}`;
    }

    const products = await fetchData(url);
    return products;
  }
);

export const getSingleProduct = createAsyncThunk(
  "getSingleProduct",
  async ({ productId }) => {
    const product = await fetchData(
      `https://fakestoreapi.com/products/${productId}`
    );
    return product;
  }
);

export const getLimitedProducts = createAsyncThunk(
  "getLimitedProducts",
  async () => {
    const limitedProducts = await fetchData(
      "https://fakestoreapi.com/products?limit=5"
    );
    return limitedProducts;
  }
);

const products = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(getLimitedProducts.fulfilled, (state, action) => {
        state.limitedProducts = action.payload;
      });
  },
});

export default products.reducer;
