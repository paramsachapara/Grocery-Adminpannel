import Sidebar from "../../components/Layout/Sidebar";
import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";

import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "../Layout/Navbar";

import { OutlinedInput } from "@mui/material";
import { useFormik } from "formik";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useTheme } from "@mui/material/styles";

import AddProductSchema from "../../schemas/AddProductSchema";
import {Grid} from "@mui/material";
// import { Grid } from "react-loader-spinner";

export default function EditProductForm(props) {
  const { selectedProduct, setOpenEditDialog } = props;

  const theme = useTheme();

  const initialValues = {
    title: selectedProduct.title || "",
    short_description: selectedProduct.short_description || "",
    description: selectedProduct.description || "",
    amount: selectedProduct.amount || "",
    discount_type: selectedProduct.discount_type || "",
    discount_amount: selectedProduct.discount_amount || 0,
    avatar_image: selectedProduct.avatar_image || [],
    categoryArrayFromBody:[1],
  };

  // const handleChange = (event, value) => {
  //   formik.setFieldValue("categoryArrayFromBody", value);
  // };
  const handleImageUpload = (e) => {
    const files = e.target.files[0];
    console.log("Files ", files);
    // const files = e.target.files;
    formik.setFieldValue("avatar_image", files.name);
  };
  const onSubmit = (values) =>{
    console.log("on submit",values)
    if(values){
      let token = JSON.parse(sessionStorage.getItem('token'))
      console.log(token,"token")
      if(token){
      axios
      .get("http://localhost:8080/api/v1/encryption", {
        headers: {
          id: selectedProduct.id,
        },
      })
      .then((res) => {
        // console.log("id", id);
        console.log("Eid", res.data.data);
     
        axios.put("http://localhost:8080/api/v1/product/update-product",values,{
          headers:{
            token:token,
            product_id:res.data.data
          }
        }).then((res)=>{
          console.log("Product Updated",res)
          setOpenEditDialog(false)
        }).catch((error)=>{
          console.log("Error",error)
        })
      }).catch(error=>console.log(error))
    }
    
    }
  }

  const formik = useFormik({
    initialValues: initialValues,onSubmit:onSubmit
    // onSubmit: (values, action) => {
    //   let token = sessionStorage.getItem("token");
    //   console.log(values);
    //   if (token) {
    //     console.log(values);

    //     const options = {
    //       method: "post",
    //       url: "http://localhost:8080/api/v1/product/update-product",

    //       data: values,
    //       headers: { token: JSON.parse(token), product_id: encryptedId },
    //     };

    //     axios
    //       .request(options)
    //       .then(function (login_res) {
    //         if (login_res) {
    //           console.log("login_res data", login_res);
    //           toast.success("Signup Successfully", {
    //             position: "bottom-center",
    //             duration: 3000,
    //           });
    //           // navigate("/login");
    //         }
    //       })
    //       .catch(function (error) {
    //         console.error(error);
    //         toast.error(
    //           error.response.data.message
    //             ? error.response.data.message
    //             : "Error With fetching data",
    //           {
    //             position: "bottom-center",
    //             duration: 3000,
    //           }
    //         );
    //       });
    //     action.resetForm();
    //   } else {
    //     toast.error("You are already logged in", {
    //       position: "bottom-center",
    //       duration: 3000,
    //     });
    //   }
    // },,
    ,validationSchema: AddProductSchema,
  });
  const handleCancel = () => {
    setOpenEditDialog(false);
  };
  // console.log(formik.errors);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Navbar />
        <Sidebar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" sx={{ mt:1 }} onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  autoComplete="off"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Product Title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  onBlur={formik.handleBlur}
                />{" "}
                {formik.touched.title && formik.errors.title && (
                  <div
                    style={{
                      color: "red",
                      marginBottom: "15px",
                      fontSize: "12px",
                    }}
                  >
                    {formik.errors.title}
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  autoComplete="off"
                  name="short_description"
                  required
                  fullWidth
                  id="short_description"
                  label="Short Description"
                  onChange={formik.handleChange}
                  value={formik.values.short_description}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.short_description &&
                  formik.errors.short_description && (
                    <div
                      style={{
                        color: "red",
                        marginBottom: "15px",
                        fontSize: "12px",
                      }}
                    >
                      {formik.errors.short_description}
                    </div>
                  )}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="off"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description && (
                  <div
                    style={{
                      color: "red",
                      marginBottom: "15px",
                      fontSize: "12px",
                    }}
                  >
                    {formik.errors.description}
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="amount"
                  label="Product Amount"
                  name="amount"
                  autoComplete="off"
                  onChange={formik.handleChange}
                  value={formik.values.amount}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.amount && formik.errors.amount && (
                  <div
                    style={{
                      color: "red",
                      marginBottom: "15px",
                      fontSize: "12px",
                    }}
                  >
                    {formik.errors.amount}
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  required
                  fullWidth
                  name="discount_type"
                  label="Discount Type"
                  type="text"
                  id="discount_type"
                  autoComplete="off"
                  onChange={formik.handleChange}
                  value={formik.values.discount_type}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.discount_type &&
                  formik.errors.discount_type && (
                    <div
                      style={{
                        color: "red",
                        marginBottom: "15px",
                        fontSize: "12px",
                      }}
                    >
                      {formik.errors.discount_type}
                    </div>
                  )}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  required
                  fullWidth
                  name="discount_amount"
                  label="Discount Amount"
                  type="text"
                  id="discount_amount"
                  autoComplete="off"
                  onChange={formik.handleChange}
                  value={formik.values.discount_amount}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.discount_amount &&
                  formik.errors.discount_amount && (
                    <div
                      style={{
                        color: "red",
                        marginBottom: "15px",
                        fontSize: "12px",
                      }}
                    >
                      {formik.errors.discount_amount}
                    </div>
                  )}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <OutlinedInput
                  required
                  fullWidth
                  accept="image/*"
                  type="file"
                  // multiple
                  name="avatar_image"
                  label="Product Images"
                  id="avatar_image"
                  autoComplete="off"
                  onChange={(e) => handleImageUpload(e)}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.discount_amount &&
                  formik.errors.discount_amount && (
                    <div
                      style={{
                        color: "red",
                        marginBottom: "15px",
                        fontSize: "12px",
                      }}
                    >
                      {formik.errors.discount_amount}
                    </div>
                  )}
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              color="success"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="submit" fullWidth variant="contained" color="success">
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
