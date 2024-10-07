import React, { createContext, useContext, useReducer, useEffect } from "react";

// const ProductContext = createContext();

const initialState = {
  products: [],
  categories: [],
  currentCategory: "",
  limit: 10,
  sort: "asc",
  loading: false,
  error: null,
};

// Define the types for the Product state
interface ProductState {
  products: any[]; // Replace `any` with the appropriate type for your products
  categories: string[];
  currentCategory: string;
  limit: number;
  sort: "asc" | "desc";
  loading: boolean;
  error: string | null;
}

// Define the types for the context
interface ProductContextType extends ProductState {
  fetchProducts: () => void;
  setCategory: (category: string) => void;
  setLimit: (limit: number) => void;
  setSort: (sort: "asc" | "desc") => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

function productReducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload, loading: false };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_CURRENT_CATEGORY":
      return { ...state, currentCategory: action.payload };
    case "SET_LIMIT":
      return { ...state, limit: action.payload };
    case "SET_SORT":
      return { ...state, sort: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      dispatch({ type: "SET_CATEGORIES", payload: data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const fetchProducts = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      let url = `https://fakestoreapi.com/products?limit=${state.limit}&sort=${state.sort}`;
      if (state.currentCategory) {
        url = `https://fakestoreapi.com/products/category/${state.currentCategory}?limit=${state.limit}&sort=${state.sort}`;
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      dispatch({ type: "SET_PRODUCTS", payload: data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const setCategory = (category: any) => {
    dispatch({ type: "SET_CURRENT_CATEGORY", payload: category });
  };

  const setLimit = (limit: any) => {
    dispatch({ type: "SET_LIMIT", payload: limit });
  };

  const setSort = (sort: any) => {
    dispatch({ type: "SET_SORT", payload: sort });
  };

  return (
    <ProductContext.Provider
      value={{ ...state, fetchProducts, setCategory, setLimit, setSort }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
