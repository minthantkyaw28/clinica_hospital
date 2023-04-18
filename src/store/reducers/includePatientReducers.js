import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { user } from "../../Data/UserData";

//Auth State
const initialIncludePatientState = {
  data: null,
  loading: false,
  error: null,
};

export const includePatientfunc = createAsyncThunk(
  "includePatient",
  async (formData) => {
    // Transform form data to JSON
    const jsonData = JSON.stringify(formData);
    // const url=
    // Make POST request to login API and get response
    const response = await fetch(
      `https://clinica-app.onrender.com/add_patient_account_to_hospital/${user.user._id}`,
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
      throw new Error("Patient Include failed");
    }
  }
);

const includePatientSlice = createSlice({
  name: "includePatient",
  initialState: initialIncludePatientState,
  extraReducers: (builder) => {
    builder
      .addCase(includePatientfunc.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.error = null;
      })
      .addCase(includePatientfunc.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(includePatientfunc.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message; // Set the error message
      });
  },
});

export const includePatientActions = includePatientSlice.actions;

export default includePatientSlice.reducer;
