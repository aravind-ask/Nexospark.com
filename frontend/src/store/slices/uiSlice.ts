import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isDarkMode: boolean;
  isMobileMenuOpen: boolean;
  activeSection: string;
}

const initialState: UIState = {
  isDarkMode: false,
  isMobileMenuOpen: false,
  activeSection: "home",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
  },
});

export const { toggleDarkMode, toggleMobileMenu, setActiveSection } =
  uiSlice.actions;

export default uiSlice.reducer;
