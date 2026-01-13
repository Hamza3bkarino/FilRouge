// app/lib/Redux/programSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API;

// ✅ Fetch all programs
export const fetchPrograms = createAsyncThunk(
  "programs/fetchPrograms",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

// ✅ Add a program
export const addProgramAsync = createAsyncThunk(
  "programs/addProgram",
  async (program) => {
    const response = await axios.post(API_URL, program);
    return response.data;
  }
);

// ✅ Update a program
export const updateProgramAsync = createAsyncThunk(
  "programs/updateProgram",
  async (program) => {
    const response = await axios.put(`${API_URL}${program.id}`, program);
    return response.data;
  }
);

// ✅ Delete a program
export const deleteProgramAsync = createAsyncThunk(
  "programs/deleteProgram",
  async (id) => {
    await axios.delete(`${API_URL}${id}`);
    return id;
  }
);

// ✅ Toggle program status
export const toggleProgramStatusAsync = createAsyncThunk(
  "programs/toggleStatus",
  async (program) => {
    const newStatus = program.status === "active" ? "draft" : "active";
    const response = await axios.put(`${API_URL}${program.id}`, { ...program, status: newStatus });
    return response.data;
  }
);

const programSlice = createSlice({
  name: "programs",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchPrograms.pending, (state) => { state.loading = true; })
      .addCase(fetchPrograms.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchPrograms.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      // Add
      .addCase(addProgramAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Update
      .addCase(updateProgramAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })

      // Delete
      .addCase(deleteProgramAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      })

      // Toggle status
      .addCase(toggleProgramStatusAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      });
  }
});

export default programSlice.reducer;
