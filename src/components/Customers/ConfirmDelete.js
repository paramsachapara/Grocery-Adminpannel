import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDelete(props) {
  const {openConfirmDialog,setOpenConfirmDialog,handleYes,handleNo,contentForDeleteDialog} = props 
  return (

    <div>
      <Dialog
        open={openConfirmDialog}
        onClose={()=>setOpenConfirmDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {contentForDeleteDialog}
        </DialogTitle>
       
        <DialogActions>
          <Button variant='contained' color='success' onClick={handleNo} autoFocus>No</Button>
          <Button variant='outlined' color='success'  onClick={handleYes}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
