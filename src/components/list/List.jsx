import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import PlaceDetails from '../placeDetails/PlaceDetails';
import useStyles from './styles.js';

const List = ({places, childClicked, isLoading, type, setType, rating, setRating}) => {
    const classes = useStyles();
    const [elementRef, setElementRef] = useState([]);
    useEffect(() => {
        setElementRef((refs) => 
            Array(places?.length).fill().map((_, index) => refs[index] || createRef())
        );
        // createRef() - receives underlying DOM element as its current property
        // || if refs doesn't exists create one using createRef()
        // .fill() - fills specific element in an array with value i.e overwrites the original array
        // set array of refs and assign each grid item a ref as well as send them to placeDetails for scrolling to selected card
    }, [places]);

    return (
        <div className = {classes.container}>
            <Typography variant="h4">Food & Dining around you</Typography>
            {isLoading ? (
                <div className={classes.container}>
                    <CircularProgress size='5rem'/>
                </div>
            ) : (
            <>
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                    <MenuItem value="hotels">Hotels</MenuItem>
                    <MenuItem value="attractions">Attractions</MenuItem>
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={3}>Above 3.0</MenuItem>
                    <MenuItem value={4}>Above 4.0</MenuItem>
                    <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
            </FormControl>

            <Grid container spacing={3} className={classes.list}>
                {places?.map((place, index) => (
                    <Grid ref={elementRef[index]} item key={index} xs={12}>
                        <PlaceDetails key={`${index}-p`}
                        place={place}
                        selected={Number(childClicked) === index} 
                        refProp={elementRef[index]} ></PlaceDetails>
                    </Grid>
                ))}
            </Grid>
            </>
            )}
        </div>
    )
}

export default List;