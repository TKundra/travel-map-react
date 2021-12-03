import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  hasErrors: false,
  weather: [],
}

// A slice for recipes with our 3 reducers
const weatherDataSlice = createSlice({
  name: 'weatherData',
  initialState,
  reducers: {
    getWeather: (state) => {
      state.loading = true
    },
    getWeatherSuccess: (state, action) => {
      state.weather = action.payload
      state.loading = false
      state.hasErrors = false
    },
    getWeatherFailure: (state) => {
      state.loading = false
      state.hasErrors = true
    },
  },
})
// Actions
export const {getWeather, getWeatherSuccess, getWeatherFailure} = weatherDataSlice.actions;
// The reducer
export default weatherDataSlice.reducer;