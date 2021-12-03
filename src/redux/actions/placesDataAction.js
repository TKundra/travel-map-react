import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  hasErrors: false,
  places: [],
}

// A slice for recipes with our 3 reducers
const placesDataSlice = createSlice({
  name: 'placesData',
  initialState,
  reducers: {
    getPlaces: (state) => {
      state.loading = true
    },
    getPlacesSuccess: (state, action) => {
      state.places = action.payload
      state.loading = false
      state.hasErrors = false
    },
    getPlacesFailure: (state) => {
      state.loading = false
      state.hasErrors = true
    },
  },
})
// Actions
export const {getPlaces, getPlacesSuccess, getPlacesFailure} = placesDataSlice.actions;
// The reducer
export default placesDataSlice.reducer;