import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import SeatMapStyles from './SeatMap.module.css';
import Tooltip from '@material-ui/core/Tooltip';

const SeatMap = (props) => {
    const seatCol = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const seatRow = ['A', 'B', 'C', 'D', 'E', 'F'];
    let spacesBtwSeats = '';

    const useStyles = makeStyles({
        avatar: {
            margin: 10
        }
    })();

    const colorCode = (seatNum) => {
        let color = '#bcbcbc';
        if (props.source === 'checkIn') {
            props.seatDetails.forEach(seat => {
                if (seat.seatNo === seatNum) {
                    if (seat.infants && seat.wheelChair) {
                        color = 'green';
                    }
                    else if (seat.infants) {
                        color = "blue";
                    } else if (seat.wheelChair) {
                        color = "black";
                    } else if (seat.seatNo !== '') {
                        color = "Red";
                    }
                }
            });
            return color;
        }
        else if (props.source === 'flightIn') {
            props.seatDetails.forEach(seat => {
                if (seat.seatNo === seatNum) {
                    if (seat.meal === 'Non-Veg') {
                        color = 'Red';
                    }
                    else if (seat.meal === 'Veg') {
                        color = "green";
                    }
                    else {
                        color = "purple"
                    }
                }
            });
            return color;
        }
    }

    const pointerOrNot = (seatNum) => {
        let cursor = 'not-allowed';
        props.seatDetails.forEach(seat => {
            if (seat.seatNo === seatNum) {
                cursor = 'pointer';
            }
        });
        return cursor;
    }

    return (
        props.seatDetails ?
            <div className={SeatMapStyles.parentWrapper}>
                {props.source !== 'flightIn' ?
                    <div className={SeatMapStyles.avatarWrap}>
                        <Avatar className={SeatMapStyles.avatarIcon} style={{ backgroundColor: 'green' }}></Avatar><h4> : Infants and Wheelchair</h4>
                        <Avatar className={SeatMapStyles.avatarIcon} style={{ backgroundColor: 'blue' }}></Avatar><h4> : Infants</h4>
                        <Avatar className={SeatMapStyles.avatarIcon} style={{ backgroundColor: 'black' }}></Avatar><h4> : Wheelchair</h4>
                        <Avatar className={SeatMapStyles.avatarIcon} style={{ backgroundColor: 'Red' }}></Avatar><h4> : Occupied</h4>
                    </div> : null}

                {props.source === 'flightIn' ?
                    <div className={SeatMapStyles.avatarWrap}>
                        <Avatar className={SeatMapStyles.avatarIcon} style={{ backgroundColor: 'red' }}></Avatar><h4> : Non-Veg</h4>
                        <Avatar className={SeatMapStyles.avatarIcon} style={{ backgroundColor: 'green' }}></Avatar><h4> : Veg</h4>
                        <Avatar className={SeatMapStyles.avatarIcon} style={{ backgroundColor: 'purple' }}></Avatar><h4> : No Preference</h4>
                        <Avatar className={SeatMapStyles.avatarIcon} style={{ backgroundColor: '#bcbcbc' }}></Avatar><h4> : Unoccupied</h4>
                    </div> : null}

                {seatCol.map((seatNum) => {
                    return (
                        <Fragment key={seatNum}>
                            <div>{
                                seatRow.map((seatAlpha) => {
                                    seatAlpha === 'D' ?
                                        spacesBtwSeats = <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        : spacesBtwSeats = "";

                                    return (<Fragment key={seatAlpha + seatNum}>
                                        {spacesBtwSeats}
                                        <span className={SeatMapStyles.wrapper}>
                                            <Tooltip title={seatAlpha + seatNum} placement="top">
                                                <Avatar onClick={() => props.showDetailsHandler(seatAlpha + seatNum)} className={useStyles.avatar}
                                                    style={{ backgroundColor: colorCode(seatAlpha + seatNum), cursor: pointerOrNot(seatAlpha + seatNum), fontSize: '16px' }}>
                                                    {seatAlpha + seatNum}</Avatar>
                                            </Tooltip>
                                        </span>
                                    </Fragment>
                                    )
                                })
                            }</div >
                        </Fragment>
                    )
                })
                }
            </div> : null
    )
}

export default SeatMap;
