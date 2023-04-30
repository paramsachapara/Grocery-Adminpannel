import React from 'react'
import { Alert } from '@mui/material'

function SuccessToast() {
    console.log("toasr")
  return (

    <Alert severity="success" color="info">
          This is a success alert — check it out!
        </Alert>
  )
}

export default SuccessToast