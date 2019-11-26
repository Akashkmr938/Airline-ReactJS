import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(3),
    },
}));


const Addons = (props) => {
    const classes = useStyles();

    return (
        <Fragment>
            <div>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Choose Meal Plan:</FormLabel>
                    <RadioGroup aria-label="luggage" name="luggage"
                        value={props.passengerDetails.meal ? props.passengerDetails.meal : ''}
                        onChange={(event) => props.mealHandler(event)}>
                        <FormControlLabel value="Non-Veg" control={<Radio />} label="Non-Veg Combo" />
                        <FormControlLabel value="Veg" control={<Radio />} label="Veg Combo" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Choose Luggage Plan:</FormLabel>
                    <RadioGroup aria-label="luggage" name="luggage"
                        value={props.passengerDetails.luggage ? props.passengerDetails.luggage : ''}
                        onChange={(event) => props.luggageHandler(event)}>
                        <FormControlLabel value="15kg" control={<Radio />} label="15kg" />
                        <FormControlLabel value="25kg" control={<Radio />} label="25kg" />
                        <FormControlLabel value="40kg" control={<Radio />} label="40kg" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Choose Pay-per-view TV Plan:</FormLabel>
                    <RadioGroup aria-label="luggage" name="luggage"
                        value={props.passengerDetails.payPerView ? props.passengerDetails.payPerView : ''}
                        onChange={(event) => props.payPerViewHandler(event)}>
                        <FormControlLabel value="Hollywood" control={<Radio />} label="Hollywood Movies" />
                        <FormControlLabel value="Bollywood" control={<Radio />} label="Bollywood Movies" />
                        <FormControlLabel value="Tollywood" control={<Radio />} label="Tollywood Movies" />
                    </RadioGroup>
                </FormControl>
            </div>
        </Fragment>
    );
}

export default Addons;
