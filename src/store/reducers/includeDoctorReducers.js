import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { user } from "../../Data/UserData";

//Auth State
const initialIncludeDoctorState = {
  data: null,
  loading: false,
  error: null,
};

export const includeDoctorfunc = createAsyncThunk(
  "includeDoctor",
  async (formData) => {
    // Transform form data to JSON
    const jsonData = JSON.stringify(formData);
    // const url=
    // Make POST request to login API and get response
    const response = await fetch(
      `https://clinica-app.onrender.com/add_doctor_account_to_hospital/${user.user._id}`,
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
      throw new Error("Doctor Include failed");
    }
  }
);

const includeDoctorSlice = createSlice({
  name: "includeDoctor",
  initialState: initialIncludeDoctorState,
  extraReducers: (builder) => {
    builder
      .addCase(includeDoctorfunc.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(includeDoctorfunc.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(includeDoctorfunc.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message; // Set the error message
      });
  },
});

export const includeDoctorActions = includeDoctorSlice.actions;

export default includeDoctorSlice.reducer;
