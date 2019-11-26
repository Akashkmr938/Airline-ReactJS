import React, { Component, Fragment } from 'react'
import CheckedInStyles from './CheckedIn.module.scss'
import { Button } from '@material-ui/core'


export class CheckedIn extends Component {

    goToDashboard = () => {
        this.props.history.push('/');
    };
    render() {
        return (
            <Fragment>
                {this.props.location.pathname === '/checkedIn' ?
                    <div className={CheckedInStyles.wrapper} >
                        <h2>CHECK-IN SUCCESSFULL</h2>
                        <Button onClick={this.goToDashboard} variant="contained" color="primary">Back to dashboard</Button>
                    </div> : null}
                {this.props.location.pathname === '/flightIn' ?
                    <div className={CheckedInStyles.wrapper} >
                        <h2>FLIGHT-IN SUCCESSFULL</h2>
                        <Button onClick={this.goToDashboard} variant="contained" color="primary">Back to dashboard</Button>
                    </div> : null}
                {this.props.location.pathname === '/updated' ?
                    <div className={CheckedInStyles.wrapper} >
                        <h2>PASSENGER UPDATE SUCCESSFULL</h2>
                        <Button onClick={this.goToDashboard} variant="contained" color="primary">Back to dashboard</Button>
                    </div> : null}
            </Fragment>
        )
    }
}

export default CheckedIn;