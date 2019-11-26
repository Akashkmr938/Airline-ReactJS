import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PassengerStyles from './PassengerDetails.module.css';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(0.5, 2),
        textAlign: 'left',
        backgroundColor: 'floralwhite'
    },
    text: {
        paddingBottom: '8px'
    }
}));

const PassengerDetails = (props) => {
    const classes = useStyles();
    return (
        <Fragment>
            <div className={PassengerStyles.wrapper}>
                {props.passengerDetails.seatNo === '' ? <p className={PassengerStyles.textStyle}>click on seats to see details</p> :
                    <Paper className={classes.root}>
                        <h3 className={PassengerStyles.title}>Passenger Details of {props.passengerDetails.seatNo}</h3>
                        <Typography className={classes.text} component="h4">
                            <div className={PassengerStyles.keytext}>First Name:</div><span className={PassengerStyles.innerText}>{props.passengerDetails.firstName}</span>
                        </Typography>
                        <Typography className={classes.text} component="h4">
                            <div className={PassengerStyles.keytext}>Last Name:</div><span className={PassengerStyles.innerText}>{props.passengerDetails.lastName}</span>
                        </Typography>
                        <Typography className={classes.text} component="h4">
                            <div className={PassengerStyles.keytext}>Contact Number:</div><span className={PassengerStyles.innerText}>{props.passengerDetails.contactNumber}</span>
                        </Typography>
                        <Typography className={classes.text} component="h4">
                            <div className={PassengerStyles.keytext}> Carrying Infants:</div>
                            <span className={PassengerStyles.innerText}>
                                {props.passengerDetails.infants ? 'Yes' : 'No'}</span>
                        </Typography>
                        <Typography className={classes.text} component="h4">
                            <div className={PassengerStyles.keytext}>Seat Number:</div><span className={PassengerStyles.innerText}>{props.passengerDetails.seatNo}</span>
                        </Typography>
                        <Typography className={classes.text} component="h4">
                            <div className={PassengerStyles.keytext}>Wheel chair:</div>
                            <span className={PassengerStyles.innerText}>
                                {props.passengerDetails.wheelChair ? 'Yes' : 'No'}</span>
                        </Typography>
                        <Typography className={classes.text} component="h4">
                            <div className={PassengerStyles.keytext}>PNR:</div><span className={PassengerStyles.innerText}>{props.passengerDetails.PNR}</span>
                        </Typography>
                        {props.source === 'flightIn' ?
                            <Fragment>
                                <Typography className={classes.text} component="h4">
                                    <div className={PassengerStyles.keytext}>Meal Preference:</div><span className={PassengerStyles.innerText}>{props.passengerDetails.meal}</span>
                                </Typography>
                                <Typography className={classes.text} component="h4">
                                    <div className={PassengerStyles.keytext}>Pay Per View TV plan:</div><span className={PassengerStyles.innerText}>{props.passengerDetails.payPerView}</span>
                                </Typography>
                                <Typography className={classes.text} component="h4">
                                    <div className={PassengerStyles.keytext}>Luggage weight:</div><span className={PassengerStyles.innerText}>{props.passengerDetails.luggage}</span>
                                </Typography>
                                <Typography className={classes.text} component="h4">
                                    <div className={PassengerStyles.keytext}>Age:</div><span className={PassengerStyles.innerText}>{props.passengerDetails.age}</span>
                                </Typography>
                            </Fragment> : null
                        }
                    </Paper>
                }
            </div>
        </Fragment>
    )
}

export default PassengerDetails;
