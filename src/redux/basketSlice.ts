import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { BasketItem } from "../interfaces/BasketItem";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

interface BasketState {
  items: BasketItem[];
  totalPrice: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BasketState = {
  items: [],
  totalPrice: 0,
  status: "idle",
  error: null,
};

const basketURL = import.meta.env.VITE_BASKET_SERVICE;

export const fetchBasket = createAsyncThunk(
  "basket/fetchBasket",
  async (token: string, thunkAPI) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.get<BasketState>(`${basketURL}`, config);
    return response.data;
  }
);

export const addItemToBackend = createAsyncThunk(
  "basket/addItemToBackend",
  async ({ item, token }: { item: BasketItem; token: string }, thunkAPI) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.put(`${basketURL}/additem`, item, config);
    return response.data;
  }
);

export const removeItemFromBackend = createAsyncThunk(
  "basket/removeItemFromBackend",
  async ({ item, token }: { item: BasketItem; token: string }, thunkAPI) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.put(`${basketURL}/removeitem`, item, config);
    return response.data;
  }
);

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<BasketItem>) => {
      state.items.push(action.payload);
      state.totalPrice += action.payload.itemPrice;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(
        (item) => item.plantId === action.payload
      );
      if (index !== -1) {
        state.totalPrice -= state.items[index].itemPrice;
        state.items.splice(index, 1);
      }
    },
    removeAllItems: (state, action: PayloadAction<string>) => {
      const plantId = action.payload;
      state.items = state.items.filter((item) => item.plantId !== plantId);
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.itemPrice,
        0
      );
    },
    clearBasket: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    updateTotalPrice: (state) => {
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.itemPrice,
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        addItemToBackend.fulfilled,
        (state, action: PayloadAction<BasketState>) => {
          const addedItem = state.items.find((item) => item.itemId === null);
          if (addedItem) {
            const updatedItem = action.payload.items.find(
              (item) => item.plantId === addedItem.plantId
            );
            if (updatedItem) {
              addedItem.itemId = updatedItem.itemId;
            }
          }
        }
      )
      .addCase(fetchBasket.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchBasket.fulfilled,
        (state, action: PayloadAction<BasketState>) => {
          state.status = "succeeded";
          state.items = action.payload.items;
          state.totalPrice = action.payload.totalPrice;
        }
      )
      .addCase(fetchBasket.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch basket";
      });
  },
});

export const {
  addItem,
  removeItem,
  clearBasket,
  updateTotalPrice,
  removeAllItems,
} = basketSlice.actions;

export default basketSlice.reducer;
