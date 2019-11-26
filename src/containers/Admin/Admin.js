import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PassengerList from '../../components/feature/PasengerList/PassengerList';
import { httpGet, httpDelete, httpPut } from '../../utils/api/http-calls';
import ManagePassengers from '../../components/feature/ManagePassengers/ManagePassengers';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Addons from '../../components/feature/Addons/Addons';
import AdminStyles from './Admin.module.css';
import Modal from './../../components/shared/Modal/Modal';

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
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 2000
    },
    button: {
        margin: theme.spacing(25),
        color: 'red'
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

class Admin extends Component {
    classes = useStyles;
    constructor(props) {
        super(props)
        this.state = {
            update: false,
            modalOpen: false,
            pnr: null,
            formInvalid: false,
            errors: [],
            pnrStatus: null,
            value: 0,
            filter: 'None',
            PassengerDetails: null,
            updatedPassengers: null,
            selectedPassengerDetails: null
        }
        this.errors = [];
        this.seatRegEx = '^[A-F]{1}(?:[1-9]|0[1-9]|10)$';
    }

    componentDidMount() {
        window.scrollTo(0,0);
        httpGet('/' + this.props.match.params.airlineNumber).then(getResponse => {
            this.setState({
                PassengerDetails: getResponse.data,
                updatedPassengers: getResponse.data
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

    filterHandler = (event) => {
        let passengers = null;
        if (this.state.filter !== event.target.value) {

            if (event.target.value === 'None') {
                passengers = this.state.PassengerDetails;
            } else if (event.target.value === 'Passport') {
                passengers = this.state.PassengerDetails.filter(personDetails => (!personDetails.passport || personDetails.passport === ''))
            } else if (event.target.value === 'Seat') {
                passengers = this.state.PassengerDetails.filter(personDetails => personDetails.seatNo === '')
            } else if (event.target.value === 'Age') {
                passengers = this.state.PassengerDetails.filter(personDetails => personDetails.age < 15)
            }

            this.setState({
                filter: event.target.value,
                updatedPassengers: passengers
            })
        }
    }

    handlePNR = () => {
        if (this.state.pnr === '') {
            this.setState({
                pnrStatus: 'Empty'
            })
        } else {
            let count = 0;
            this.state.PassengerDetails.forEach(passengerDetails => {
                if (passengerDetails.PNR === this.state.pnr) {
                    count += 1;
                    this.setState({
                        pnrStatus: 'Found',
                        selectedPassengerDetails: passengerDetails
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

    updatePassengerToggle = () => {
        this.setState({
            update: true
        })
    }

    deletePassenger = () => {
        httpDelete('/' + this.props.match.params.airlineNumber + '/' + this.state.selectedPassengerDetails.id)
            .then(() => {
                this.setState({
                    modalOpen: false
                });
                this.props.history.push('/updated');
            })
            .catch(error => console.log(error));
    }

    handleUpdate = (event, field) => {
        if (field === 'firstName') {
            this.setState({
                selectedPassengerDetails: { ...this.state.selectedPassengerDetails, firstName: event.target.value },
            })
        } else if (field === 'lastName') {
            this.setState({
                selectedPassengerDetails: { ...this.state.selectedPassengerDetails, lastName: event.target.value },
            })
        } else if (field === 'age') {
            this.setState({
                selectedPassengerDetails: { ...this.state.selectedPassengerDetails, age: event.target.value },
            })
        } else if (field === 'contact') {
            this.setState({
                selectedPassengerDetails: { ...this.state.selectedPassengerDetails, contactNumber: event.target.value },
            })
        } else if (field === 'seat') {
            this.setState({
                selectedPassengerDetails: { ...this.state.selectedPassengerDetails, seatNo: event.target.value },
            })
        }
    }

    luggageHandler = (event) => {
        event.persist();
        this.setState({
            selectedPassengerDetails: { ...this.state.selectedPassengerDetails, luggage: event.target.value }
        });
    }

    mealHandler = (event) => {
        event.persist();
        this.setState({
            selectedPassengerDetails: { ...this.state.selectedPassengerDetails, meal: event.target.value }
        });
    }

    payPerViewHandler = (event) => {
        event.persist();
        this.setState({
            selectedPassengerDetails: { ...this.state.selectedPassengerDetails, payPerView: event.target.value }
        });
    }

    updatePassengers = () => {
        this.setState({
            formInvalid: true
        });
        this.errors = [];
        if (this.state.selectedPassengerDetails.firstName === '' || this.state.selectedPassengerDetails.lastName === '') {
            this.errors.push('First Name or Last Name cannot be empty.');
        }
        if (this.state.selectedPassengerDetails.age === 0) {
            this.errors.push('Age cannot be 0.');
        }
        if (this.state.selectedPassengerDetails.contactNumber.toString().length !== 10) {
            this.errors.push('Contact Number should be 10 digits.');
        }
        if (!this.state.selectedPassengerDetails.seatNo.match(this.seatRegEx)) {
            this.errors.push('Seat number invalid');
        }

        this.setState({
            errors: this.errors
        })

        if (this.errors.length === 0) {
            httpPut('/' + this.props.match.params.airlineNumber + '/' + this.state.selectedPassengerDetails.id, this.state.selectedPassengerDetails)
                .then(() => this.props.history.push('/updated'))
                .catch(err => console.log(err));
        }
    }

    confirmDelete = () => {
        this.setState({
            modalOpen: true
        })
    }

    modalClose = () => {
        this.setState({
            modalOpen: false
        })
    }

    render() {
        return (
            <Fragment>
                <div className={this.classes.root}>
                    <AppBar position='static'>
                        <Tabs centered value={this.state.value}
                            onChange={(event, newValue) => this.handleTabsChange(event, newValue)} aria-label="Admin manage">
                            <Tab label="List Passengers" {...a11yProps(0)} />
                            <Tab label="Manage Passengers" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>

                    <TabPanel value={this.state.value} index={0}>
                        {this.state.updatedPassengers && this.state.value === 0 ?
                            <PassengerList
                                source={'admin'}
                                list={this.state.updatedPassengers}
                                filterHandler={(event) => this.filterHandler(event)}
                                filterValue={this.state.filter}>
                            </PassengerList> : null}
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
                                <Button onClick={this.handlePNR} variant="contained" color="primary" className={AdminStyles.button}>Submit</Button>
                            </div>
                        </Fragment>
                        {this.state.pnrStatus === 'Found' ?
                            <Fragment>
                                <div>
                                    <Button onClick={this.updatePassengerToggle} variant="contained" color="primary" className={AdminStyles.button}>Update Passenger Details</Button>
                                    <Button onClick={this.confirmDelete} variant="contained" color="primary" className={AdminStyles.button}>Delete Passenger</Button>
                                    <Modal open={this.state.modalOpen} deletePassenger={this.deletePassenger} modalHandleClose={this.modalClose}></Modal>
                                </div>
                                {this.state.update ?
                                    <Fragment>
                                        <div className={AdminStyles.detailsWrapper}>
                                            <div className={AdminStyles.managePassenegrs}>
                                                <ManagePassengers
                                                    handleUpdate={(event, field) => this.handleUpdate(event, field)}
                                                    passsengerDetails={this.state.selectedPassengerDetails}></ManagePassengers>
                                                {this.state.errors.length > 0 ?
                                                    <Fragment>
                                                        <div>*Note: Some fields are incorrect</div>
                                                        <ul className={AdminStyles.errorList}>
                                                            {this.state.errors.map((error, index) => {
                                                                return <li key={index}>{error}</li>
                                                            })}
                                                        </ul>
                                                    </Fragment> : null
                                                }
                                            </div>
                                            <div className={AdminStyles.addons}>
                                                <Addons
                                                    passengerDetails={this.state.selectedPassengerDetails}
                                                    luggageHandler={(event) => this.luggageHandler(event)}
                                                    mealHandler={(event) => this.mealHandler(event)}
                                                    payPerViewHandler={(event) => this.payPerViewHandler(event)}></Addons>
                                            </div>
                                        </div>

                                        <Button onClick={this.updatePassengers} variant="contained" color="primary" className={AdminStyles.button}>Update</Button>
                                    </Fragment> : null}
                            </Fragment> : null}
                    </TabPanel>
                </div>
            </Fragment>
        )
    }
}

export default Admin;
