import Sidebar from "../../components/Layout/Sidebar";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../Layout/Navbar";
import { Autocomplete } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";

const theme = createTheme();

export default function AddProduct() {
  const initialValues = {
    title: "",
    short_description: "",
    description: "",
    amount: "",
    discount_type: "",
    discount_amount: "",
    avatar_image: [],
    categoryArrayFromBody: [2, 4],
  };
  const onSubmit = (values) => {
    console.log(values);
  };
  const handleChange = (event, value) => {
    formik.setFieldValue("categoryArrayFromBody", value);
  };
  const handleImageUpload = (e) => {
    const files = e.target.files;
    console.log("Files ", files[0].name);
    // const files = e.target.files;
    formik.setFieldValue("avatar_image", files[0].name);
  };
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Required")
      .max(20, "max 20 characters allowed"),
    short_description: Yup.string()
      .required("Required")
      .max(20, "max 20 characters allowed"),
    description: Yup.string()
      .required("Required")
      .max(50, "max 50 characters are allowed"),
    amount: Yup.string()
      .required("Required")
      .test("is-valid-price", "Please enter a valid price", function (value) {
        const { path, createError } = this;
        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue)) {
          return createError({ path, message: "Please enter a valid price" });
        }
        return true;
      }),
    discount_amount: Yup.string()
      .required("Required")
      .test("is-valid-price", "Please enter a valid price", function (value) {
        const { path, createError } = this;
        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue)) {
          return createError({ path, message: "Please enter a valid price" });
        }
        return true;
      }),
    discount_type: Yup.string()
      .required("Required")
      .max(50, "max 50 characters are allowed"),
    // categoryArrayFromBody: Yup.array()
    //   .min(1, "Please select category")
    //   .required("Required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit: (values, action) => {
      let token = sessionStorage.getItem("token");
      console.log("Add produt", values);
    },
    validationSchema,
  });
  console.log(formik.errors);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Navbar />
        <Sidebar />
        <Box
          sx={{
            marginTop: 18,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" sx={{ mt: 3 }} onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              {/* <Grid item xs={12} sm={6}>
                <Autocomplete
                  multiple
                  required
                  id="categoryArrayFromBody"
                  name="categoryArrayFromBody"
                  options={products.map((option) => option.name)}
                  filterSelectedOptions
                  onChange={formik.handleChange}
                  value={formik.values.categoryArrayFromBody}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category of product"
                      placeholder="Select Category of Product"
                    />
                  )}
                />
                {formik.touched.categoryArrayFromBody &&
                  formik.errors.categoryArrayFromBody && (
                    <div
                      style={{
                        color: "red",
                        marginBottom: "15px",
                        fontSize: "12px",
                      }}
                    >
                      {formik.errors.categoryArrayFromBody}
                    </div>
                  )}
              </Grid> */}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Product
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
