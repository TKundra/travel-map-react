import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';

// adding google map api - google cloud > create project > api & services >  search maps > map javascipt api > enable > maps javascript api
// > credentials (left side) > create credentials > api key > and copy your key
const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked, weather}) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');
    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact 
            bootstrapURLKeys={{key: 'AIzaSyCCOfJm5qP7YNDNd4f3lpBKR7CVmn0yib8'}} 
            defaultCenter={coordinates}
            center={coordinates} 
            defaultZoom={14} 
            margin={[50,50,50,50]} 
            options={''} 
            onChange={(e) => { // console.log(e)
                setCoordinates({lat: e.center.lat, lng: e.center.lng});
                setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw});
            }}
            onChildClick={(child) => 
                // lift-up we doing here i.e which child is clicked
                // in lift-up we send data from child to parent
                // data sent to App then from App to list
                setChildClicked(child)}>
                {places?.map((place, index) => (
                    <div 
                    className={classes.markerContainer} 
                    lat={Number(place?.latitude)}
                    lng={Number(place?.longitude)}
                    key={index}>
                        {!isDesktop?(
                            <LocationOnOutlinedIcon color="primary" fontSize="large" />
                        ) : (
                            <Paper elevation={3} className={classes.paper}>
                                <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                                    <img
                                    alt={place.name}
                                    className={classes.pointer}
                                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} />
                                <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                            </Paper>
                        )}
                    </div>
                ))}
                {weather?.length && weather.map((data, index) => (
                    <div key={index} lat={data.coord.lat} lng={data.coord.lng}>
                        <img alt={data.name} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" />
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    )
}

export default Map;