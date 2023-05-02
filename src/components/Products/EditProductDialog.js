import React from 'react'
import { Dialog, } from '@mui/material'
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import EditProductForm from './EditProductForm'

function EditProductDialog(props) {
    const {openEditDialog,setOpenEditDialog,selectedProduct} = props
  return (
    <Dialog open={openEditDialog}>
        <DialogTitle variant={'h4'} textAlign={'center'}>
            Edit product Details
        </DialogTitle>
        <DialogContent>
        <EditProductForm selectedProduct = {selectedProduct} setOpenEditDialog = {setOpenEditDialog}  />
        </DialogContent>
    </Dialog>
  )
}

export default EditProductDialog