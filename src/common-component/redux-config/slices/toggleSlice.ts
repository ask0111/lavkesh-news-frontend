// slices/apiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToggleState {
    toggleValue: boolean;
    editorSidebarToggleValue: boolean;
    editorSettingToggle: boolean;
  }

  const initialState: ToggleState = { toggleValue: true, editorSidebarToggleValue: true, editorSettingToggle: false };

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
      setEditorSettingToggle: (state, action: PayloadAction<boolean>) => {
        state.editorSettingToggle = action.payload;
      },
    },
  });

  export const { setToggle, setEditorSidebarToggle, setEditorSettingToggle } = toggleSlice.actions;
  export default toggleSlice.reducer;
