import Sidebar from "../../components/Layout/Sidebar";
import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";

import Container from "@mui/material/Container";
 
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "../Layout/Navbar";
import { Autocomplete, Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, Select } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { useFormik } from "formik";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useTheme } from "@mui/material/styles";

import AddProductSchema from "../../schemas/AddProductSchema";


const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];


export default function AddProduct() {
  const theme = useTheme();
  const [categoryName, setcategoryName] = React.useState([]);
  const [categoryId, setcategoryId] = React.useState([]);
  const [category, setCategory] = React.useState([]);


  React.useEffect(()=>{
    axios
      .get("http://localhost:8080/api/v1/category/get-all-categories")
      .then((res) => {
        console.log(res.data.data);
        setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[])

//   const handleChange = (event) => {
//     let {
//       target: { value },
//     } = event;
//     setPersonName(
//       // On autofill we get a stringified value.
//       typeof value === 'string' ? value.split(',') : value,
//     );
//     setcategoryId(personName);
//     console.log("personName", personName);
//     for (let i = 0; i < categoryId.length; i++) {
//       for (let j = 0; j < category.length; j++) {
//         if(categoryId[i]===category[j].title){
//           categoryId[i] = category[j].id
//           setPersonName(categoryId);
//           console.log("categoryId", categoryId);
//         }
//       } 
//     };
//     formik.setFieldValue("categoryArrayFromBody", categoryId);

    
    
// }
const handleChange = (event) => {
  const { value } = event.target || {}; // set default empty object if event.target is undefined
  
  // Use the spread operator instead of split() to turn a string value into an array
  const categoryNames = Array.isArray(value)
    ? value
    : [value];
  console.log("categoryNames", categoryNames);
  const newCategoryIds = categoryNames.map((categoryName) => {
    console.log("categoryName", categoryName);
    const matchingCategory = category.find((cat) => cat.title === categoryName);
    console.log("matchingCategory", matchingCategory);
    return matchingCategory ? matchingCategory.id : categoryName;
  });
  

  // Update state variables with updated/corrected values
  setcategoryName(categoryNames);
  setcategoryId(newCategoryIds);
  console.log("newCategoryIds", newCategoryIds);
  formik.setFieldValue("categoryArrayFromBody", newCategoryIds);
};


  

  const initialValues = {
    title: "",
    short_description: "",
    description: "",
    amount: "",
    discount_type: "",
    discount_amount: "",
    avatar_image: [],
    categoryArrayFromBody: [],
  };

  // const handleChange = (event, value) => {
  //   formik.setFieldValue("categoryArrayFromBody", value);
  // };
  const handleImageUpload = (e) => {
    const files = e.target.files[0];
    console.log("Files ", files);
    // const files = e.target.files;
    formik.setFieldValue("avatar_image", files);
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, action) => {

      const AddProductObj = {
        title: values.title,
        amount: values.amount,
        discount_type: values.discount_type,
        discount_amount: values.discount_amount,
        short_description: values.short_description,  
        description: values.description,
        avatar_image: values.avatar_image,
        categoryArrayFromBody: values.categoryArrayFromBody,
      };
      // var formData = new FormData()
      // formData.append('title',initialValues.title);
      // formData.append('short_description',initialValues.short_description);
      // formData.append('description',initialValues.description);
      // formData.append('amount',initialValues.amount);
      // formData.append('discount_type',initialValues.discount_type);
      // formData.append('discount_amount',initialValues.discount_amount);
      // formData.append('avatar_image',initialValues.avatar_image);
      // formData.append('categoryArrayFromBody',initialValues.categoryArrayFromBody);

      // console.log("personName", personName);
      
      
      const formData = new FormData();
      formData.append('AddProductObj', JSON.stringify(AddProductObj));
      console.log("FormData", formData);

      let token = JSON.parse(sessionStorage.getItem("token"));
      if (token) {
        console.log("AddProductObj",AddProductObj);
        const options = {
          method: "post",
          url: "http://localhost:8080/api/v1/product/add-product",
          data: AddProductObj,
          headers:{'token':token}
        }
        console.log(values);

        axios
          .request(options)
          .then(function (AddProduct_res) {
            if (AddProduct_res) {
              console.log("AddProduct_res data", AddProduct_res);
              toast.success("Product added successfully", {
                position: "bottom-center",
                duration: 3000,
              });
              // navigate("/login");
            }
          })
          .catch(function (error) {
            console.error("Error of add product",error);
            toast.error(
              error.response.data.message
                ? error.response.data.message
                : "Error With fetching data",
              {
                position: "bottom-center",
                duration: 3000,
              }
            );
          });
        action.resetForm();
      } else {
        toast.error("please login", {
          position: "bottom-center",
          duration: 3000,
        });
      }
    },
    validationSchema: AddProductSchema,
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
            marginTop: 8,
            marginLeft: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" sx={{ mt: 3 }} onSubmit={formik.handleSubmit}>
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
              <Grid item xs={12} sm={12} md={6} >
                <FormControl sx={{ width: "100%", maxWidth: 600 }}>
                  <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                  <Select
          labelId="demo-multiple-checkbox-label"
          id="categoryArrayFromBody"
          name="categoryArrayFromBody"
          multiple
          value={categoryName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {category.map((name) => (
            <MenuItem key={name.id} value={name.title}>
              <Checkbox checked={categoryName.indexOf(name.title) > -1} />
              <ListItemText primary={name.title} />
            </MenuItem>
          ))}
        </Select>
                </FormControl>
              {/* <Autocomplete
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
                /> */}
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
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="success"
            >
              Add Product
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
