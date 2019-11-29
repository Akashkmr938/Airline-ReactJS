import React, { Suspense, Fragment } from 'react';
import LayoutStyles from './Layout.module.scss';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';

const FlightData = React.lazy(() => import('../../containers/FlightData/FlightData'));
const HomePage = React.lazy(() => import('../../containers/HomePage/HomePage'));
const FlightIn = React.lazy(() => import('../../containers/FlightIn/Flightin'));
const CheckedIn = React.lazy(() => import('../feature/CheckedIn/CheckedIn'));
const Admin = React.lazy(() => import('../../containers/Admin/Admin'));

const useStyles = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(2)
    },
}));

const Layout = () => {
    const classes = useStyles();
    return (
        <Fragment>
            <div className={LayoutStyles['parent-wrapper']}>
                <Suspense fallback={<CircularProgress className={classes.progress} />}>
                    <Route path="/" exact component={HomePage}></Route>
                    <Route path="/checkin/:airlineNumber" exact component={FlightData}></Route>
                    <Route path="/flightin/:airlineNumber" exact component={FlightIn}></Route>
                    <Route path="/checkedIn" exact component={CheckedIn}></Route>
                    <Route path="/flightIn" exact component={CheckedIn}></Route>
                    <Route path="/updated" exact component={CheckedIn}></Route>
                    <Route path="/admin/:airlineNumber" exact component={Admin}></Route>
                </Suspense>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        isAdmin: state.isAdmin,
    };
};

export default connect(mapStateToProps)(Layout);