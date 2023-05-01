import React from 'react'
import { Dialog, } from '@mui/material'
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import EditProductForm from './EditProductForm'

function EditProductDialog(props) {
    const {openEditProduct,setOpenEditProduct,userDetails,encryptedId} = props
  return (
    <Dialog open={openEditProduct}>
        <DialogTitle variant={'h4'} textAlign={'center'}>
            Edit product Details
        </DialogTitle>
        <DialogContent>
        <EditProductForm userDetails = {userDetails} setOpenEditProduct = {setOpenEditProduct} encryptedId = {encryptedId} />
        </DialogContent>
    </Dialog>
  )
}

export default EditProductDialog