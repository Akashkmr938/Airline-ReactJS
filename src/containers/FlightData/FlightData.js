import React, { Component, Fragment } from 'react';
import { httpGet } from '../../utils/api/http-calls';
import FlightDetails from '../../components/feature/FlightDetails/FlightDetails';
import SeatMap from '../../components/feature/SeatMap/SeatMap';
import FlightDataStyles from './FlightData.module.css';
import PassengerDetails from '../../components/feature/PassengerDetails/PassengerDetails';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PassengerList from '../../components/feature/PasengerList/PassengerList';
import CheckIn from '../CheckIn/CheckIn';

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

export class FlightData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      pnr: null,
      flightDescription: [
        {
          name: "",
          airlineNumber: "",
          from: "",
          destination: "",
          price: 0,
          takeOffTime: "",
          landingTime: "",
          totalSeats: 0,
          type: ""
        }],
      flightSeatmap: [
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
      passengerDetails:
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
      }
    }

    this.classes = useStyles;
  }

  componentDidMount() {
    window.scrollTo(0,0);
    httpGet('/flight?airlineNumber=' + this.props.match.params.airlineNumber).then(getResponse => {
      this.setState({
        flightDescription: getResponse.data
      })
    })
    httpGet('/' + this.props.match.params.airlineNumber).then(getResponse => {
      this.setState({
        flightSeatmap: getResponse.data
      })
    })
  }

  showPassengerDetails(seat) {
    if (seat) {
      this.state.flightSeatmap.forEach(passengers => {
        if (passengers.seatNo === seat) {
          this.setState({
            passengerDetails: passengers
          })
        }
      });
    }
  }

  handleTabsChange(event, newValue) {
    if (this.state.value !== newValue) {
      this.setState({
        value: newValue
      })
    }
  }

  handlePNR = (event) => {
    event.persist();
    console.log(event);
  }

  render() {
    return (
      <Fragment>
        <div className={this.classes.root}>
          <AppBar position='static'>
            <Tabs centered value={this.state.value}
              onChange={(event, newValue) => this.handleTabsChange(event, newValue)} aria-label="simple tabs example">
              <Tab label="Flight Details" {...a11yProps(0)} />
              <Tab label="Seat Map" {...a11yProps(1)} />
              <Tab label="Passengers List" {...a11yProps(2)} />
              <Tab label="Web Check-in" {...a11yProps(2)} />
            </Tabs>
          </AppBar>

          <TabPanel value={this.state.value} index={0}>
            {(this.state.flightDescription[0] && this.state.value === 0) ?
              <FlightDetails flightDetail={this.state.flightDescription[0]}></FlightDetails> :
              null}
          </TabPanel>

          <TabPanel value={this.state.value} index={1}>
            {(this.state.passengerDetails && this.state.value === 1) ? (
              <Fragment>
                <PassengerDetails passengerDetails={this.state.passengerDetails} />
              </Fragment>) : null}
            <span className={FlightDataStyles.wrapper}>
              <SeatMap source={'checkIn'} seatDetails={this.state.flightSeatmap} showDetailsHandler={(seat) => this.showPassengerDetails(seat)} />
            </span>
          </TabPanel>

          <TabPanel value={this.state.value} index={2}>
            {(this.state.flightSeatmap && this.state.value === 2) ?
              <PassengerList list={this.state.flightSeatmap}></PassengerList> : null}
          </TabPanel>
          <TabPanel value={this.state.value} index={3}>
            {(this.state.flightSeatmap && this.state.value === 3) ?
              <CheckIn flightNumber={this.props.match.params.airlineNumber}></CheckIn> : null}
          </TabPanel>
        </div>
      </Fragment>
    )
  }
}

export default FlightData;