// slices/apiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToggleState {
    toggleValue: boolean;
    editorSidebarToggleValue: boolean;
  }

  const initialState: ToggleState = { toggleValue: true, editorSidebarToggleValue: true };

// Async thunk for API call
const toggleSlice = createSlice({
    name: "toggle",
    initialState,
    reducers: {
      setToggle: (state, action: PayloadAction<boolean>) => {
        state.toggleValue = action.payload;
      },
      setEditorSidebarToggle: (state, action: PayloadAction<boolean>) => {
        state.editorSidebarToggleValue = action.payload;
      },
    },
  });

  export const { setToggle, setEditorSidebarToggle } = toggleSlice.actions;
  export default toggleSlice.reducer;
