import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.modalHandleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Delete Passenger?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This will delete the passenger completely. The action cannot be reverted back. Do you want to continue?
                        </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.modalHandleClose} color="primary" autoFocus>No</Button>
                    <Button onClick={props.deletePassenger} color="primary">Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}