import React from "react";
import ProductSchema from "../../schemas/AddProductSchema";
import { useFormik } from "formik";
import Sidebar from "../../components/Layout/Sidebar";

import {
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  Paper,
  InputLabel,
  Box,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const availabilityOptions = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];

export function AddProduct() {
  const initialValues = {
    productImage: [],
    productVideo: [],
    productName: "",
    productDescription: "",
    price: "",
    availability: false,
    shippingInformation: "",
    productDimensions: "",
    productWeight: "",
    materialAndConstruction: "",
    productFeatures: "",
    relatedProducts: [],
    warrantyInformation: "",
    returnPolicy: "",
    faqs: "",
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    formik.setFieldValue("productImages", [
      ...formik.values.productImage,
      ...files,
    ]);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ProductSchema,
    onSubmit: (values, action) => {},
  });
  return (
    <>
      <Sidebar>
        <Box sx={{ height: "100px" }} />
        <div>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3} align="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Product Name"
                  name="productName"
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  style={{ width: "70%" }}
                />
                {formik.touched.productName && formik.errors.productName && (
                  <div style={{ color: "red" }}>
                    {formik.errors.productName}
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <label htmlFor="discription">
                  Discription <small>(option)</small>
                </label>
                <ReactQuill
                  theme="snow"
                  id="discription"
                  style={{ width: "70%" }}
                />
                {formik.touched.productDescription &&
                  formik.errors.productDescription && (
                    <div style={{ color: "red" }}>
                      {formik.errors.productDescription}
                    </div>
                  )}
              </Grid>
            </Grid>
            {/* second row */}
            <Grid container spacing={3} align="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Price"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  style={{ width: "70%" }}
                />
                {formik.touched.price && formik.errors.price && (
                  <div style={{ color: "red" }}>{formik.errors.price}</div>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel style={{ margin: "0" }}>Age</InputLabel>
                <Select
                  labelId="availability-select-label"
                  id="availability-select"
                  value={formik.values.availability}
                  onChange={formik.handleChange}
                  autoWidth
                  label="Availability"
                  style={{ width: "70%" }}
                >
                  {availabilityOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.availability && formik.errors.availability && (
                  <div style={{ color: "red" }}>
                    {formik.errors.availability}
                  </div>
                )}
              </Grid>
            </Grid>
            {/* third row */}
            <Grid container spacing={3} align="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Shipping information "
                  type="Textarea"
                  multiline
                  rows={4}
                  name="shippingInformation"
                  value={formik.values.shippingInformation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  style={{ width: "70%" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Product dimensions "
                  name="productDescription"
                  value={formik.values.productDescription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  style={{ width: "70%" }}
                />
              </Grid>
            </Grid>
            {/* fourth row */}
            <Grid container spacing={3} align="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Product Weight "
                  name="productWeight"
                  value={formik.values.productWeight}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  style={{ width: "70%" }}
                />
                {formik.touched.productWeight &&
                  formik.errors.productWeight && (
                    <div style={{ color: "red" }}>
                      {formik.errors.productWeight}
                    </div>
                  )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="material And Construction "
                  name="materialAndConstruction"
                  value={formik.values.materialAndConstruction}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  style={{ width: "70%" }}
                />
                {formik.touched.materialAndConstruction &&
                  formik.errors.materialAndConstruction && (
                    <div style={{ color: "red" }}>
                      {formik.errors.materialAndConstruction}
                    </div>
                  )}
              </Grid>
            </Grid>
            {/* fifth row */}
            <Grid container spacing={3} align="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Product Features "
                  name="productFeatures"
                  value={formik.values.productFeatures}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  style={{ width: "70%" }}
                />
                {formik.touched.productFeatures &&
                  formik.errors.productFeatures && (
                    <div style={{ color: "red" }}>
                      {formik.errors.productFeatures}
                    </div>
                  )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Related products "
                  name="relatedProducts"
                  value={formik.values.relatedProducts}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  style={{ width: "70%" }}
                />
                {formik.touched.relatedProducts &&
                  formik.errors.relatedProducts && (
                    <div style={{ color: "red" }}>
                      {formik.errors.relatedProducts}
                    </div>
                  )}
              </Grid>
            </Grid>
            {/* sixth row */}
            <Grid container spacing={3} align="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  label="warranty Information"
                  name="warrantyInformation"
                  value={formik.values.warrantyInformation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  style={{ width: "70%" }}
                />
                {formik.touched.warrantyInformation &&
                  formik.errors.warrantyInformation && (
                    <div style={{ color: "red" }}>
                      {formik.errors.warrantyInformation}
                    </div>
                  )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="return Policy"
                  name="returnPolicy"
                  value={formik.values.returnPolicy}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  style={{ width: "70%" }}
                />
                {formik.touched.returnPolicy && formik.errors.returnPolicy && (
                  <div style={{ color: "red" }}>
                    {formik.errors.returnPolicy}
                  </div>
                )}
              </Grid>
            </Grid>
            {/* Seventh row */}
            <Grid container spacing={3} align="center">
              <Grid item xs={12} sm={6}>
                <input
                  style={{ marginTop: "10px" }}
                  accept="image/*"
                  multiple
                  type="file"
                  id="productImage"
                  name="productImage"
                  label="Product Images"
                  onChange={(event) => handleImageUpload(event)}
                />
                {formik.errors.productImage && formik.touched.productImage && (
                  <div
                    style={{ color: "red", fontSize: "12px", margin: "5px" }}
                  >
                    {formik.errors.productImage}
                  </div>
                )}
              </Grid>
            </Grid>

            <Grid align="center">
              <Button type="submit" bg="primarylight">
                add
              </Button>
            </Grid>
          </form>
        </div>
      </Sidebar>
    </>
  );
}

export default AddProduct;
