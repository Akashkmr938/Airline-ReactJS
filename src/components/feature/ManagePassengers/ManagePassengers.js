import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import manageStyles from './ManagePassengers.module.css';
import ContactsIcon from '@material-ui/icons/Contacts';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import AirlineSeatReclineExtraTwoToneIcon from '@material-ui/icons/AirlineSeatReclineExtraTwoTone';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const ManagePassengers = (props) => {
    const classes = useStyles();

    return (
        <Fragment>
            <div className={manageStyles.wrapper}>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment">First Name:</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={props.passsengerDetails.firstName}
                        onChange={(event) => props.handleUpdate(event, 'firstName')}
                        startAdornment={
                            <InputAdornment position="start">
                                <ContactsIcon />
                            </InputAdornment>}
                    />
                </FormControl>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment">Last Name:</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={props.passsengerDetails.lastName}
                        onChange={(event) => props.handleUpdate(event, 'lastName')}
                        startAdornment={
                            <InputAdornment position="start">
                                <ContactsIcon />
                            </InputAdornment>}
                    />
                </FormControl>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment">Age:</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={props.passsengerDetails.age}
                        onChange={(event) => props.handleUpdate(event, 'age')}
                        startAdornment={
                            <InputAdornment position="start">
                                <PersonOutlineTwoToneIcon />
                            </InputAdornment>}
                    />
                </FormControl>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment">Contact Number:</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={props.passsengerDetails.contactNumber}
                        onChange={(event) => props.handleUpdate(event, 'contact')}
                        startAdornment={
                            <InputAdornment position="start">
                                <ContactPhoneIcon />
                            </InputAdornment>}
                    />
                </FormControl>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment">Seat No. (A1-F10):</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={props.passsengerDetails.seatNo}
                        onChange={(event) => props.handleUpdate(event, 'seat')}
                        startAdornment={
                            <InputAdornment position="start">
                                <AirlineSeatReclineExtraTwoToneIcon />
                            </InputAdornment>}
                    />
                </FormControl>
            </div>
        </Fragment>
    );
}

export default ManagePassengers;