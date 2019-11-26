import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    selectroot: {
        display: 'flex',
        flexWrap: 'wrap',
        float: 'right'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    }
})
);

const PassengerList = (props) => {
    const classes = useStyles();
    return (
        <Fragment>
            {props.source === 'admin' ?
                <form className={classes.selectroot} autoComplete="off">
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel htmlFor="filled-age-simple">Filter By:</InputLabel>
                        <Select
                            value={props.filterValue}
                            onChange={props.filterHandler}>
                            <MenuItem value="None">None</MenuItem>
                            <MenuItem value={'Passport'}>Missing Passport</MenuItem>
                            <MenuItem value={'Age'}>Age less than 15</MenuItem>
                            <MenuItem value={'Seat'}>Missing Seat No.</MenuItem>
                        </Select>
                    </FormControl>
                </form> : null}

            {props.list.length === 0 ? <p>No results to display</p> :
                <Paper className={classes.root}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No.</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell align="center">Last Name</TableCell>
                                <TableCell align="center">Age</TableCell>
                                <TableCell align="center">Check-in Status</TableCell>
                                <TableCell align="center">Seat Number</TableCell>
                                <TableCell align="center">WheelChair</TableCell>
                                <TableCell align="center">Carrying Infants</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.list.map(passengerListItems => (
                                <TableRow key={passengerListItems.id}>
                                    <TableCell component="th" scope="row">{passengerListItems.id}</TableCell>
                                    <TableCell component="th" scope="row">{passengerListItems.firstName}</TableCell>
                                    <TableCell align="center">{passengerListItems.lastName}</TableCell>
                                    <TableCell align="center">{passengerListItems.age}</TableCell>
                                    <TableCell align="center">{passengerListItems.seatNo === "" ? "NOT CHECKED-IN" : "CHECKED-IN"}</TableCell>
                                    <TableCell align="center">{passengerListItems.seatNo}</TableCell>
                                    <TableCell align="center">{passengerListItems.wheelChair ? 'Needed' : 'Not Needed'}</TableCell>
                                    <TableCell align="center">{passengerListItems.infants ? 'Yes' : 'No'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>}
        </Fragment >
    );
}

export default PassengerList;
