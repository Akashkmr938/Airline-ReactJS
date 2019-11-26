import React, { Fragment } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import FlightcardStyles from './FlightCard.module.scss';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import Fab from '@material-ui/core/Fab';
import { withRouter } from 'react-router-dom';
const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    },
}))(MuiExpansionPanelDetails);

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
        height: '40px',
        textTransform: 'none',
        backgroundColor: '#2E3B55',
        color: 'aliceblue'
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    flightButtons: {
        display: 'block'
    }
}));

const FlightCard = (props) => {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState('panel' + props.index);

    const handleChange = panel => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const routeToCheckIn = () => {
        props.history.push('/checkin/' + props.flightDetails.airlineNumber);
    }

    const routeToFlightIn = () => {
        props.history.push('/flightin/' + props.flightDetails.airlineNumber);
    }
    const routeToAdminPage = () => {
        props.history.push('/admin/' + props.flightDetails.airlineNumber);
    }

    return (
        <Fragment>
            <ExpansionPanel square expanded={expanded === 'panel' + props.index} onChange={handleChange('panel' + props.index)}>
                <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>{props.flightDetails.name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={FlightcardStyles.expansionPanel}>
                    <Typography className={FlightcardStyles.cardDetails}>
                        From: {props.flightDetails.from} &nbsp;&nbsp;
                        <FlightTakeoffIcon />
                    </Typography>
                    <Typography className={FlightcardStyles.cardDetails}>
                        <FlightLandIcon /> &nbsp;&nbsp;
                        To: {props.flightDetails.destination}
                    </Typography>
                    <Typography className={FlightcardStyles.cardDetails}>Price: {props.flightDetails.price}</Typography>
                    <Typography className={FlightcardStyles.cardDetails}>Seats: {props.flightDetails.totalSeats}</Typography>
                </ExpansionPanelDetails>

                <ExpansionPanelDetails className={classes.flightButtons}>

                    {(props.source !== 'check-in') ?
                        <Typography>
                            <Fab onClick={routeToCheckIn} variant="extended" aria-label="delete" className={classes.fab + ' ' + FlightcardStyles.buttonHover}>
                                Check-In
                        </Fab>
                            <Fab onClick={routeToFlightIn} variant="extended" aria-label="delete" className={classes.fab + ' ' + FlightcardStyles.buttonHover}>
                                In-Flight
                        </Fab>
                            {props.isAdmin ?
                                <Fab
                                    onClick={routeToAdminPage}
                                    variant="extended"
                                    aria-label="delete"
                                    className={classes.fab + ' ' + FlightcardStyles.buttonHover}>Admin</Fab> : null}
                        </Typography> : null}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Fragment>
    );
}

export default withRouter(FlightCard);
