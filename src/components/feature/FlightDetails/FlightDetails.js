import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FlightDetailsStyles from './FlightDetails.module.scss';

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


const FlightDetails = (props) => {
    const classes = useStyles();
    return (
        <aside className={FlightDetailsStyles.wrapper}>
            <Paper className={classes.root}>
                <h3 className={FlightDetailsStyles.title}>Flight Details</h3>
                <Typography className={classes.text + ' ' + FlightDetailsStyles.typography} component="h4">
                    <div className={FlightDetailsStyles.keytext}>Name:</div><span className={FlightDetailsStyles.innerText}>{props.flightDetail.name}</span>
                </Typography>
                <Typography className={classes.text + ' ' + FlightDetailsStyles.typography} component="h4">
                    <div className={FlightDetailsStyles.keytext}>From:</div><span className={FlightDetailsStyles.innerText}>{props.flightDetail.from}</span>
                </Typography>
                <Typography className={classes.text + ' ' + FlightDetailsStyles.typography} component="h4">
                    <div className={FlightDetailsStyles.keytext}>To:</div><span className={FlightDetailsStyles.innerText}>{props.flightDetail.destination}</span>
                </Typography>
                <Typography className={classes.text + ' ' + FlightDetailsStyles.typography} component="h4">
                    <div className={FlightDetailsStyles.keytext}>Take Off Time:</div><span className={FlightDetailsStyles.innerText}>{props.flightDetail.takeOffTime}</span>
                </Typography>
                <Typography className={classes.text + ' ' + FlightDetailsStyles.typography} component="h4">
                    <div className={FlightDetailsStyles.keytext}>Landing Time:</div><span className={FlightDetailsStyles.innerText}>{props.flightDetail.landingTime}</span>
                </Typography>
                <Typography className={classes.text + ' ' + FlightDetailsStyles.typography} component="h4">
                    <div className={FlightDetailsStyles.keytext}>Total Seats:</div><span className={FlightDetailsStyles.innerText}>{props.flightDetail.totalSeats}</span>
                </Typography>
                <Typography className={classes.text + ' ' + FlightDetailsStyles.typography} component="h4">
                    <div className={FlightDetailsStyles.keytext}>Airline Number:</div><span className={FlightDetailsStyles.innerText}>{props.flightDetail.airlineNumber}</span>
                </Typography>
                <Typography className={classes.text + ' ' + FlightDetailsStyles.typography} component="h4">
                    <div className={FlightDetailsStyles.keytext}>Flight Type:</div><span className={FlightDetailsStyles.innerText}>{props.flightDetail.type}</span>
                </Typography>
                <Typography className={classes.text + ' ' + FlightDetailsStyles.typography} component="h4">
                    <div className={FlightDetailsStyles.keytext}>Flight date:</div><span className={FlightDetailsStyles.innerText}>{props.flightDetail.date}</span>
                </Typography>
            </Paper>
        </aside>
    );
}

export default FlightDetails;