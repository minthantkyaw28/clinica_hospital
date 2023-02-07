import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { user } from "../../Data/UserData";

//Single Day Transaciton State
const initialTransactionSingleDayState = {
  data: null,
  loading: false,
  error: null,
};

export const transactionSingleDayfunc = createAsyncThunk(
  "transactionSingleDay",
  async (formData) => {
    // Transform form data to JSON
    const jsonData = JSON.stringify(formData);
    // const url=
    // Make GET request to login API and get response
    const response = await fetch(
      `https://clinica-app.onrender.com/cost_count_by_day_at_hospital/${user.user._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: jsonData,
      }
    );

    // If login successful, return JSON data
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      // If login fails, throw an error
      throw new Error("Single Day Transaction failed");
    }
  }
);

const transactionSingleDaySlice = createSlice({
  name: "transactionSingleDay",
  initialState: initialTransactionSingleDayState,
  extraReducers: (builder) => {
    builder
      .addCase(transactionSingleDayfunc.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(transactionSingleDayfunc.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(transactionSingleDayfunc.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message; // Set the error message
      });
  },
});

export const transactionSingleDayActions = transactionSingleDaySlice.actions;

export default transactionSingleDaySlice.reducer;
