// src/store/searchSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchOption {
  // Define the structure of SearchOption here
}

interface BoatTypeOption {
  // Define the structure of BoatTypeOption here
}

interface SearchState {
  searchResults: any | null;
  boatTypes: BoatTypeOption[];
  selectedBoatType: BoatTypeOption | null;
  selectedLocation: any | null; // Define type if known
  checkIn: any;
  checkOut: any;
  beds: number;
  selectedLanguage: string;
}

const initialState: SearchState = {
  searchResults: [],
  boatTypes: [],
  selectedBoatType: null,
  selectedLocation: null,
  checkIn: null,
  checkOut: null,
  beds: 0,
  selectedLanguage: "English",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResultsSlice: (state, action: PayloadAction<any>) => {
      state.searchResults = action.payload;
    },
    setBoatTypes: (state, action: PayloadAction<BoatTypeOption[]>) => {
      state.boatTypes = action.payload;
    },
    setSelectedBoatType: (
      state,
      action: PayloadAction<BoatTypeOption | null>
    ) => {
      state.selectedBoatType = action.payload;
    },
    setSelectedLocation: (state, action: PayloadAction<any | null>) => {
      state.selectedLocation = action.payload;
    },
    setAllData: (state, action: PayloadAction<any | null>) => {
      if (action.payload) {
        state.beds = action.payload.beds;
        state.checkIn = action.payload.selectedCheckIn;
        state.checkOut = action.payload.selectedCheckOut;
        state.selectedBoatType = action.payload.selectedBoatType;
        state.selectedLocation = action.payload.selectedLocation;
        state.boatTypes = action.payload.boatTypes;
        // state.selectedBoatType = action.payload.selectedBoatType;
      }
    },

    setLanguage: (state, action: PayloadAction<any | null>) => {
      state.selectedLanguage = action.payload;
    },
  },
});

export const {
  setSearchResultsSlice,
  setBoatTypes,
  setSelectedBoatType,
  setSelectedLocation,
  setAllData,
  setLanguage,
} = searchSlice.actions;

export default searchSlice.reducer;
