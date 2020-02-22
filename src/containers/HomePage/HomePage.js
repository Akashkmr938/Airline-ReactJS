import React, { Component } from 'react';
import FlightCard from '../../components/feature/FlightCard/FlightCard';
import HomePageStyles from './HomePage.module.scss';
import { connect } from 'react-redux';
import { allFlights } from './../../store/actions/action';

export class HomePage extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.flightList.length === 0)
            this.props.getFlightDetails();
    }

    render() {
        return (
            <div className={HomePageStyles.parentWrapper}>{
                this.props.flightList.map((flights, index) => {
                    return (
                        <div className={HomePageStyles.wrapper} key={flights.airlineNumber}>
                            <FlightCard isAdmin={this.props.isAdmin} index={index} flightDetails={flights} />
                        </div>
                    )
                })
            }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAdmin: state.isAdmin,
        flightList: state.allFlightDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFlightDetails: () => dispatch(allFlights())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
