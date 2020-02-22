import React, { Component, Fragment } from 'react';
import { httpPut, httpGet } from '../../utils/api/http-calls';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SeatMap from '../../components/feature/SeatMap/SeatMap';
import PassengerDetails from '../../components/feature/PassengerDetails/PassengerDetails';
import FlightInStyles from './Flightin.module.scss';
import Addons from '../../components/feature/Addons/Addons';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { flightDetails } from '../../store/actions/action';

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    appBar: {
        position: 'static',
        top: '64px'
    },
    button: {
        margin: theme.spacing(1),
    }
}));

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

export class FlightIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            pnr: null,
            pnrStatus: '',
            inFlightSeatmap: [
                {
                    id: 0,
                    firstName: "",
                    lastName: "",
                    age: 0,
                    contactNumber: 0,
                    Infants: false,
                    wheelChair: false,
                    PNR: "00-000-0000",
                    seatNo: "",
                    Image: ""
                }],
            inFlightPassengerDetails: {
                id: 0,
                firstName: "",
                lastName: "",
                age: 0,
                contactNumber: 0,
                Infants: false,
                wheelChair: false,
                PNR: "00-000-0000",
                seatNo: "",
                Image: ""
            }
        }

        this.classes = useStyles;
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        // this.props.getFlightDetails(this.props.match.params.airlineNumber);
        httpGet('/' + this.props.match.params.airlineNumber).then(getResponse => {
            this.setState({
                inFlightSeatmap: getResponse.data
            })
        })
    }

    handleTabsChange(event, newValue) {
        if (this.state.value !== newValue) {
            this.setState({
                value: newValue
            })
        }
    }

    inFlightPassengerDetails(seat) {
        if (seat) {
            this.state.inFlightSeatmap.forEach(passengers => {
                if (passengers.seatNo === seat) {
                    this.setState({
                        inFlightPassengerDetails: passengers
                    })
                }
            });
        }
    }

    handlePNR = () => {
        if (this.state.pnr === '') {
            this.setState({
                pnrStatus: 'Empty'
            })
        } else {
            let count = 0;
            this.state.inFlightSeatmap.forEach(passengerDetails => {
                if (passengerDetails.PNR === this.state.pnr) {
                    count += 1;
                    this.setState({
                        pnrStatus: 'Found',
                        inFlightPassengerDetails: passengerDetails
                    });
                }
            })
            if (count === 0) {
                return this.setState({
                    pnrStatus: 'Not Found'
                })
            }
        }
    }

    luggageHandler = (event) => {
        event.persist();
        let passengers = this.state.inFlightSeatmap.map(passengers => {
            if (passengers.PNR === this.state.pnr) {
                return {
                    ...passengers,
                    luggage: event.target.value
                }
            }
            return passengers;
        })
        this.setState({
            inFlightSeatmap: passengers,
            inFlightPassengerDetails: { ...this.state.inFlightPassengerDetails, luggage: event.target.value }
        });
    }

    mealHandler = (event) => {
        event.persist();
        let passengers = this.state.inFlightSeatmap.map(passengers => {
            if (passengers.PNR === this.state.pnr) {
                return {
                    ...passengers,
                    meal: event.target.value
                }
            }
            return passengers;
        })
        this.setState({
            inFlightSeatmap: passengers,
            inFlightPassengerDetails: { ...this.state.inFlightPassengerDetails, meal: event.target.value }
        });
    }

    payPerViewHandler = (event) => {
        event.persist();
        let passengers = this.state.inFlightSeatmap.map(passengers => {
            if (passengers.PNR === this.state.pnr) {
                return {
                    ...passengers,
                    payPerView: event.target.value
                }
            }
            return passengers;
        })
        this.setState({
            inFlightSeatmap: passengers,
            inFlightPassengerDetails: { ...this.state.inFlightPassengerDetails, payPerView: event.target.value }
        });
    }

    updateInflightAncillary = () => {
        httpPut('/' + this.props.match.params.airlineNumber + '/' + this.state.inFlightPassengerDetails.id, this.state.inFlightPassengerDetails).then(() => {
            this.props.history.push('/flightIn');
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <Fragment>
                <div className={this.classes.root}>
                    <AppBar position='static'>
                        <Tabs centered value={this.state.value}
                            onChange={(event, newValue) => this.handleTabsChange(event, newValue)} aria-label="simple tabs example">
                            <Tab label="In-Flight Seat Map" {...a11yProps(0)} />
                            <Tab label="Ancillary Services" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>

                    <TabPanel value={this.state.value} index={0}>
                        {(this.state.value === 0) ? (
                            <Fragment>
                                <PassengerDetails source={'flightIn'} passengerDetails={this.state.inFlightPassengerDetails} />
                            </Fragment>) : null}
                        <span className={FlightInStyles.wrapper}>
                            <SeatMap source={'flightIn'} seatDetails={this.state.inFlightSeatmap}
                                showDetailsHandler={(seat) => this.inFlightPassengerDetails(seat)}></SeatMap>
                        </span>
                    </TabPanel>

                    <TabPanel value={this.state.value} index={1}>
                        <Fragment>
                            <div>
                                <TextField
                                    id="standard-name"
                                    label="Enter PNR"
                                    className={this.classes.textField}
                                    onChange={(event) => this.setState({ pnr: event.target.value })}
                                    margin="normal"
                                />
                                {this.state.pnrStatus === 'Empty' ? <p>Please Enter a Value</p> : null}
                                {this.state.pnrStatus === 'Not Found' ? <p>PNR not found</p> : null}
                                <Button onClick={this.handlePNR} variant="contained" color="primary" className={this.classes.button}>
                                    Submit</Button>
                            </div>
                            {this.state.pnrStatus === 'Found' ?
                                <Fragment>
                                    <Addons
                                        passengerDetails={this.state.inFlightPassengerDetails}
                                        luggageHandler={(event) => this.luggageHandler(event)}
                                        mealHandler={(event) => this.mealHandler(event)}
                                        payPerViewHandler={(event) => this.payPerViewHandler(event)}>
                                    </Addons>
                                    <Button onClick={this.updateInflightAncillary} variant="contained" color="primary" className={this.classes.button}>
                                        Update Ancillary Services</Button>
                                </Fragment>
                                : null}
                        </Fragment>
                    </TabPanel>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        inFlightSeatmap: state.inFlightSeatmap
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFlightDetails: (airlineNumber) => dispatch(flightDetails(airlineNumber))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightIn);