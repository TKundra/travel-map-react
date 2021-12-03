import { configureStore } from '@reduxjs/toolkit';
import placesDataReducer from '../redux/actions/placesDataAction';
import weatherDataReducer from '../redux/actions/weatherDataAction';

export const store = configureStore({
    reducer: {
        placesData: placesDataReducer,
        weatherData: weatherDataReducer
    },
})