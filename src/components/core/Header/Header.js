import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { ReactComponent as Logo } from './../../../assets/img/logo.svg';
import { withRouter } from 'react-router-dom';
import HeaderStyles from './Header.module.scss';
import SignIn from '../Login/Login';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    logoIcon: {
        fontSize: 2.2 + 'rem'
    },
    Appbar: {
        backgroundColor: '#2E3B55',
        position: 'fixed',
        top: 0
    }
}));

const Header = (props) => {
    const classes = useStyles();

    const routeToHomePage = () => {
        props.history.push('/');
    };

    return (
        <header className={classes.root}>
            <AppBar position="static" className={classes.Appbar}>
                <Toolbar>
                    <Logo onClick={routeToHomePage} className={HeaderStyles.logo}/>
                    <IconButton onClick={routeToHomePage} role="menu" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        Mindtree Airline
                    </IconButton>
                    <div variant="h6" className={classes.title}></div>
                    <SignIn></SignIn>
                </Toolbar>
            </AppBar>
        </header>
    );
}

export default withRouter(Header);