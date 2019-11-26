import React, { Component, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CheckInSeats from '../../components/feature/CheckInSeats/CheckInSeats';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { httpGet, httpPut } from '../../utils/api/http-calls';
import Addons from '../../components/feature/Addons/Addons';
import { withRouter } from 'react-router-dom';
import CheckInStyles from './CheckIn.module.css'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200
    },
    root: {
        width: '90%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
})
);

function getSteps() {
    return ['Enter Passenger name record (PNR)', 'Select a Seat', 'select Addons'];
}


export class CheckIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pnr: '',
            pnrStatus: '',
            activeStep: 0,
            allPassengers: null,
            checkedInPassenger: null
        }
        this.classes = useStyles;
        this.steps = getSteps();
    }

    updatePassengerSeat = (seat) => {
        let passengers = this.state.allPassengers.map(passengers => {
            if (passengers.PNR === this.state.pnr) {
                return {
                    ...passengers,
                    seatNo: seat
                }
            }
            return passengers;
        })
        this.setState({
            allPassengers: passengers,
            checkedInPassenger: { ...this.state.checkedInPassenger, seatNo: seat }
        });
    }

    componentDidMount() {
        window.scrollTo(0,0);
        httpGet('/' + this.props.flightNumber).then(getResponse => {
            this.setState({
                allPassengers: getResponse.data
            })
        });
    }

    getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return (
                    <Fragment>
                        <TextField
                            id="standard-name"
                            label="Enter PNR"
                            className={this.classes.textField}
                            onChange={(event) => this.setState({ pnr: event.target.value })}
                            margin="normal"
                        />
                        {this.state.pnrStatus === 'Empty' ? <p>Please Enter a Value</p> : null}
                        {this.state.pnrStatus === 'Not Found' ? <p>PNR not found</p> : null}
                    </Fragment>
                );
            case 1:
                return <CheckInSeats updateSeats={(seat) => this.updatePassengerSeat(seat)}
                    allPassengerData={this.state.allPassengers}
                    pnr={this.state.pnr}></CheckInSeats>;
            case 2:
                return <Addons passengerDetails={this.state.checkedInPassenger}
                    luggageHandler={(event) => this.luggageHandler(event)}
                    mealHandler={(event) => this.mealHandler(event)}
                    payPerViewHandler={(event) => this.payPerViewHandler(event)}></Addons>;
            default:
                return 'Unknown stepIndex';
        }
    }

    luggageHandler = (event) => {
        event.persist();
        let passengers = this.state.allPassengers.map(passengers => {
            if (passengers.PNR === this.state.pnr) {
                return {
                    ...passengers,
                    luggage: event.target.value
                }
            }
            return passengers;
        })
        this.setState({
            allPassengers: passengers,
            checkedInPassenger: { ...this.state.checkedInPassenger, luggage: event.target.value }
        });
    }

    mealHandler = (event) => {
        event.persist();
        let passengers = this.state.allPassengers.map(passengers => {
            if (passengers.PNR === this.state.pnr) {
                return {
                    ...passengers,
                    meal: event.target.value
                }
            }
            return passengers;
        })
        this.setState({
            allPassengers: passengers,
            checkedInPassenger: { ...this.state.checkedInPassenger, meal: event.target.value }
        });
    }

    payPerViewHandler = (event) => {
        event.persist();
        let passengers = this.state.allPassengers.map(passengers => {
            if (passengers.PNR === this.state.pnr) {
                return {
                    ...passengers,
                    payPerView: event.target.value
                }
            }
            return passengers;
        })
        this.setState({
            allPassengers: passengers,
            checkedInPassenger: { ...this.state.checkedInPassenger, payPerView: event.target.value }
        });
    }

    handleNext = () => {
        if (this.state.activeStep === 0) {
            if (this.state.pnr === '') {
                this.setState({
                    pnrStatus: 'Empty'
                })
            } else {
                let count = 0;
                this.state.allPassengers.forEach(passengerDetails => {
                    if (passengerDetails.PNR === this.state.pnr) {
                        count += 1;
                        this.setState((prevState) => {
                            return {
                                pnrStatus: 'Found',
                                checkedInPassenger: passengerDetails,
                                activeStep: prevState.activeStep + 1
                            }
                        });
                    }
                })
                if (count === 0) {
                    return this.setState({
                        pnrStatus: 'Not Found'
                    })
                }
            }
        } else if (this.state.activeStep === 1) {
            if (this.state.checkedInPassenger.seatNo) {
                this.setState((prevState) => {
                    return {
                        activeStep: prevState.activeStep + 1
                    }
                });
            }
        } else if (this.state.activeStep === 2) {
            httpPut('/' + this.props.flightNumber + '/' + this.state.checkedInPassenger.id, this.state.checkedInPassenger).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            })
            this.props.history.push('/checkedIn');
        }
    }

    handleBack = () => {
        this.setState((prevState) => {
            return {
                activeStep: prevState.activeStep - 1
            }
        })
    };

    handleReset = () => {
        this.setState({
            activeStep: 0
        });
    };

    render() {
        return (
            <div className={this.classes.root}>
                <Stepper activeStep={this.state.activeStep} alternativeLabel>
                    {this.steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {this.state.activeStep === this.steps.length ? (
                        <div>
                            <Typography className={this.classes.instructions}>All steps completed</Typography>
                            <Button onClick={this.handleReset}>Reset</Button>
                        </div>
                    ) : (
                            <div>
                                <div className={this.classes.instructions}>{this.getStepContent(this.state.activeStep)}</div>
                                <div className={CheckInStyles.buttonMargin}>
                                    <Button
                                        disabled={this.state.activeStep === 0}
                                        onClick={this.handleBack}
                                        className={this.classes.backButton}>Back</Button>
                                    <Button variant="contained" color="primary" onClick={this.handleNext}>
                                        {this.state.activeStep === this.steps.length - 1 ? 'Check-In' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        )
    }
}

export default withRouter(CheckIn);