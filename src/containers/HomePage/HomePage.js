import React, { Component } from 'react';
import FlightCard from '../../components/feature/FlightCard/FlightCard';
import HomePageStyles from './HomePage.module.scss';
import { httpGet } from '../../utils/api/http-calls';
import { connect } from 'react-redux';

export class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flightList: [
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
                }
            ]
        }
    }

    componentDidMount() {
        window.scrollTo(0,0);
        httpGet('/flight').then(getResponse => {
            this.setState({
                flightList: getResponse.data
            })
        })
    }

    render() {
        return (
            <div className={HomePageStyles.parentWrapper}>{
                this.state.flightList.map((flights, index) => {
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
        isAdmin: state.isAdmin
    }
}

export default connect(mapStateToProps)(HomePage);
