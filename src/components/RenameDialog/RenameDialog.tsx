import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function RenameDialog(props: any) {
    const handleClose = () => {
        props.onClose()
    };

    return (
        <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Rename</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Change the name of the image selected.
                </DialogContentText>
                <TextField
                    onChange={(e:any)=>{props.onChange(e.target.value)}}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="New Image Name"
                    type="text"
                    fullWidth
                    autoComplete="off"
                    value={props.inputValue}
                    onKeyUp={(e)=>{if(props.inputValue.length>0 && e.keyCode === 13)props.onSubmit()}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.onSubmit} color="primary">
                    Change
                </Button>
            </DialogActions>
        </Dialog>
    );
}