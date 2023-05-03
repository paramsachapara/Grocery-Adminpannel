import React,{ useRef } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';


const DialogComponent = ({ open, handleClose, handleBlockClick, title,contentOfDialog }) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-describedby="alert-dialog-slide-description">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {contentOfDialog}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleBlockClick}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
