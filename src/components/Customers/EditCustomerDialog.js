import React from 'react'
import { Dialog, } from '@mui/material'
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import EditCustomerForm from './EditCustomerForm'

function EditCustomerDialog(props) {
    const {openEditCustomer,setOpenEditCustomer,userDetails,encryptedId} = props
  return (
    <Dialog open={openEditCustomer}>
        <DialogTitle variant={'h4'} textAlign={'center'}>
            Edit User Details
        </DialogTitle>
        <DialogContent>
        <EditCustomerForm userDetails = {userDetails} setOpenEditCustomer = {setOpenEditCustomer} encryptedId = {encryptedId} />
        </DialogContent>
    </Dialog>
  )
}

export default EditCustomerDialog