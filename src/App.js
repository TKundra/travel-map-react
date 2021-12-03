import React, {useEffect, useState} from 'react';
import {CssBaseline, Grid} from '@material-ui/core';
import Header from './components/header/Header';
import List from './components/list/List';
import Map from './components/map/Map';
import { useSelector, useDispatch } from 'react-redux'  
import { fetchPlaces, fetchWeatherData } from './redux/api';

const App = () => {
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    const [childClicked, setChildClicked] = useState(null);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    const { places, loading } = useSelector(state => state.placesData);
    const placesDispatch = useDispatch();	

    const { weather } = useSelector(state => state.weatherData);
    const weatherDispatch = useDispatch();	

    const [autoComplete, setautoComplete] = useState(null);
    const onLoad = (data) => setautoComplete(data);
    const onPlaceChanged = () => {
        // check google map documentation
        const lat = autoComplete.getPlace().geometry.location.lat();
        const lng = autoComplete.getPlace().geometry.location.lng();
        setCoordinates({lat, lng});
    }

    useEffect(() => { // only works at initial to have current locations
        // js owns functionality to provide current location through browser
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude})
        })
    }, []);

    useEffect(() => {
        const filtered = places.filter((place) => Number(place.rating) >= rating);
        setFilteredPlaces(filtered);
    }, [rating])

    useEffect(() => { // works whenever coordinates & bounds changes
        if (bounds?.sw && bounds?.ne) {
            weatherDispatch(fetchWeatherData(coordinates["lng"], coordinates["lat"]));

            placesDispatch(fetchPlaces(type, bounds?.sw, bounds?.ne));

            setFilteredPlaces([]); // reset filtered places when data loads
            setRating('');
        }
    }, [bounds, placesDispatch, weatherDispatch, type]);

    return (
        <>
            <CssBaseline />
            <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
            <Grid container spacing={3} style={{width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List 
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked} 
                        isLoading={loading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                    setCoordinates={setCoordinates}
                    setBounds={setBounds}
                    coordinates={coordinates} 
                    places={filteredPlaces.length ? filteredPlaces : places} 
                    setChildClicked={setChildClicked}
                    weather={weather} />
                </Grid>
            </Grid>
        </>
    )
}

export default App;