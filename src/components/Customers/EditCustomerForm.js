import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios'
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";


const theme = createTheme();

export default function EditCustomerForm(props) {
  const { userDetails, setOpenEditCustomer,encryptedId } = props;
  const initialValues = {
    first_name: userDetails.first_name,
    last_name: userDetails.last_name,
    primary_mobile_number: userDetails.primary_mobile_number,
    secondary_mobile_number: userDetails.secondary_mobile_number || '',
    secondary_email: userDetails.secondary_email || '',
    customer_type: '1',
    is_active: '1',
  };
  const onSubmit = (values) => {
    if (values) {
        if(encryptedId){
            console.log(values)
          let token = JSON.parse(sessionStorage.getItem('token'));
          axios
            .put("http://localhost:8080/api/v1/admin/edit-customer",values, {
              headers: {
                token: token,
                customer_id: encryptedId
              }
            })
            .then((res) => {
              console.log("response",res);
              toast.success("Customer Details Updated Successfully!",{position:'top-right'})

              setOpenEditCustomer(false);
            })
            .catch((error) => {
              console.log(error, "error");
              toast.error(error.response.data.message?error.response.data.message:"error in Editing  Customer",{position:'top-right'})
            });
        }
    }
  };
  const handleCancel = () => {
    setOpenEditCustomer(false);
  };

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .required("Required")
      .max(20, "max 20 characters allowed")
      .min(2, "Minimum 2 characters required"),
    last_name: Yup.string()
      .required("Required")
      .max(20, "max 20 characters allowed")
      .min(2, "Minimum 2 characters required"),
    primary_mobile_number: Yup.string()
      .required("Required")
      .matches(
        "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
        "Invalid Number"
      ),
   
    secondary_email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    secondary_mobile_number: Yup.string()
      .required("Required")
      .matches(
        "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
        "Invalid Number"
      ),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  // console.log(userDetails)
  return (
    
    <ThemeProvider theme={theme}>
    <div><Toaster/></div>
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            sx={{ marginTop: 5 }}
            onSubmit={formik.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="off"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                  onBlur={formik.handleBlur}
                />{" "}
                {formik.touched.first_name && formik.errors.first_name && (
                  <div
                    style={{
                      color: "red",
                      marginBottom: "15px",
                      fontSize: "12px",
                    }}
                  >
                    {formik.errors.first_name}
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="off"
                  name="last_name"
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  onChange={formik.handleChange}
                  value={formik.values.last_name}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.last_name && formik.errors.last_name && (
                  <div
                    style={{
                      color: "red",
                      marginBottom: "15px",
                      fontSize: "12px",
                    }}
                  >
                    {formik.errors.last_name}
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="primary_mobile_number"
                  label="Mobile Number"
                  name="primary_mobile_number"
                  autoComplete="off"
                  onChange={formik.handleChange}
                  value={formik.values.primary_mobile_number}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.primary_mobile_number &&
                  formik.errors.primary_mobile_number && (
                    <div
                      style={{
                        color: "red",
                        marginBottom: "15px",
                        fontSize: "12px",
                      }}
                    >
                      {formik.errors.primary_mobile_number}
                    </div>
                  )}
              </Grid>
             
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="secondary_mobile_number"
                  label="Secondary Mobile Number"
                  type="text"
                  id="secondary_mobile_number"
                  autoComplete="off"
                  onChange={formik.handleChange}
                  value={formik.values.secondary_mobile_number}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.secondary_mobile_number &&
                  formik.errors.secondary_mobile_number && (
                    <div
                      style={{
                        color: "red",
                        marginBottom: "15px",
                        fontSize: "12px",
                      }}
                    >
                      {formik.errors.secondary_mobile_number}
                    </div>
                  )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="secondary_email"
                  label="Secondary Email"
                  type="text"
                  id="secondary_email"
                  autoComplete="off"
                  onChange={formik.handleChange}
                  value={formik.values.secondary_email}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.secondary_email &&
                  formik.errors.secondary_email && (
                    <div
                      style={{
                        color: "red",
                        marginBottom: "15px",
                        fontSize: "12px",
                      }}
                    >
                      {formik.errors.secondary_email}
                    </div>
                  )}
              </Grid>
            </Grid>
            <Button
            
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              color="success"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="submit" fullWidth variant="contained" color="success" onClick={onSubmit}>
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
