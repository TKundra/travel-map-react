import axios from 'axios';
import { getPlaces, getPlacesSuccess, getPlacesFailure } from './actions/placesDataAction';
import { getWeather, getWeatherSuccess, getWeatherFailure } from './actions/weatherDataAction';

const API_KEY = process.env.REACT_APP_API_KEY;
// Asynchronous thunk action
export const fetchPlaces = (type, sw, ne) => {
  return async (dispatch) => {
    dispatch(getPlaces());

    try {
      await axios.get(
        `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
        params: {
          bl_latitude: sw?.lat,
          tr_latitude: ne?.lat,
          bl_longitude: sw?.lng,
          tr_longitude: ne?.lng,
        },
        headers: {
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
          'x-rapidapi-key': API_KEY
        }
      }).then((response) => {
        console.log("data========", response.data.data);
        dispatch(getPlacesSuccess(response.data.data));
      }).catch((error) => dispatch(getPlacesFailure()));
    } catch (error) {
      console.log(error);
    }

  }
}

export const fetchWeatherData = (lng, lat) => {
  return async (dispatch) => {
    dispatch(getWeather());
    try {
      await axios.get(
        `https://community-open-weather-map.p.rapidapi.com/find`, {
        params: {lon: lng, lat: lat},
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key': API_KEY
        }
      }).then((response) => {
        console.log("data========", response.data.list);
        dispatch(getWeatherSuccess(response.data.list));
      }).catch((error) => dispatch(getWeatherFailure()));
    } catch (error) {
      console.log(error);
    }
  }
}