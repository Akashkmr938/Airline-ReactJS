import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CheckInSeatStyles from './CheckInSeats.module.scss';
import Tooltip from '@material-ui/core/Tooltip';

const CheckInSeats = (props) => {
    const seatCol = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const seatRow = ['A', 'B', 'C', 'D', 'E', 'F'];
    let spacesBtwSeats = '';


    const useStyles = makeStyles({
        avatar: {
            margin: 10
        }
    })();

    const colorCode = (seatNum) => {
        let color = 'light-grey';
        props.allPassengerData.forEach(passenger => {
            if ((props.pnr === passenger.PNR) && (seatNum === passenger.seatNo)) {
                color = 'green';
            } else if (seatNum === passenger.seatNo) {
                color = '#593276';
            }
        });
        // console.log(seatNum, color); 
        return color;
    }

    const pointerOrNot = (seatNum) => {
        let cursor = 'pointer';
        props.allPassengerData.forEach(seat => {
            if (seat.seatNo === seatNum) {
                cursor = 'not-allowed';
                return;
            }
        });
        return cursor;
    }
    const pointerEvent = (seatNum) => {
        let pntrEvent = 'all';
        props.allPassengerData.forEach(seat => {
            if (seat.seatNo === seatNum) {
                pntrEvent = 'none';
                return;
            }
        });
        return pntrEvent;
    }


    return (
        <div className={CheckInSeatStyles.parentWrapper}>
            <div className={CheckInSeatStyles.avatarWrap}>
                <Avatar className={CheckInSeatStyles.avatarIcon} style={{ backgroundColor: 'green' }}></Avatar><h4> : Currently Selected seat</h4>
                <Avatar className={CheckInSeatStyles.avatarIcon} style={{ backgroundColor: '#593276' }}></Avatar><h4> : Already Booked</h4>
                <Avatar className={CheckInSeatStyles.avatarIcon} style={{ backgroundColor: 'light-grey' }}></Avatar><h4> : Unoccupied</h4>
            </div>
            {seatCol.map((seatNum) => {
                return (
                    <Fragment key={seatNum}>
                        <div>{
                            seatRow.map((seatAlpha) => {
                                seatAlpha === 'D' ?
                                    spacesBtwSeats = <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    : spacesBtwSeats = "";
                                return (
                                    <Fragment key={seatAlpha + seatNum}>
                                        {spacesBtwSeats}
                                        <span className={CheckInSeatStyles.wrapper} style={{ cursor: pointerOrNot(seatAlpha + seatNum) }}>
                                            <Tooltip title={seatAlpha + seatNum} placement="top">
                                                <Avatar className={useStyles.avatar}
                                                    onClick={() => { props.updateSeats(seatAlpha + seatNum) }
                                                    }
                                                    style={{
                                                        backgroundColor: colorCode(seatAlpha + seatNum),
                                                        pointerEvents: pointerEvent(seatAlpha + seatNum),
                                                        fontSize: '16px'
                                                    }}>
                                                    {seatAlpha + seatNum}</Avatar>
                                            </Tooltip>
                                        </span>
                                    </Fragment>)
                            })
                        }</div >
                    </Fragment>
                )
            })
            }
        </div >
    )
}

export default CheckInSeats;