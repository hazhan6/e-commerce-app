import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  products: [],
  product: {},
  limitedProducts: [],
};

const handleDelete = ({ state, action, stateKey }) => {
  return (state[stateKey] = state[stateKey].map((item) => {
    if (item.id === action.payload.id) {
      return action.payload;
    } else {
      return item;
    }
  }));
};

const handleUpdate = ({ state, action, stateKey }) => {
  return (state[stateKey] = state[stateKey].filter(
    (item) => item.id != action.payload.id
  ));
};

const handleAdd = ({ state, action, stateKey }) => {
  return (state[stateKey] = [action.payload, ...state[stateKey]]);
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

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async ({ productId }) => {
    try {
      const response = await axios.delete(
        `https://fakestoreapi.com/products/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async ({ inputData }) => {
    try {
      const response = await axios.put(
        `https://fakestoreapi.com/products/${inputData.id}`,
        {
          title: inputData.title,
          price: inputData.price,
          description: inputData.description,
          image: "https://i.pravatar.cc",
          category: inputData.category,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const addProduct = createAsyncThunk(
  "addProduct",
  async ({ inputData }) => {
    try {
      const response = await axios.post(
        `https://fakestoreapi.com/products`,
        {
          title: inputData.title,
          price: inputData.price,
          description: inputData.description,
          image: "https://i.pravatar.cc",
          category: inputData.category,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
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
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        handleUpdate({ state, action, stateKey: "limitedProducts" });
        handleUpdate({ state, action, stateKey: "products" });
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        handleDelete({ state, action, stateKey: "limitedProducts" });
        handleDelete({ state, action, stateKey: "products" });
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        handleAdd({ state, action, stateKey: "limitedProducts" });
        handleAdd({ state, action, stateKey: "products" });
      });
  },
});

export default products.reducer;
