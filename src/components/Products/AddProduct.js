import Sidebar from "../../components/Layout/Sidebar";
import * as React from "react";
import { FallingLines } from "react-loader-spinner";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";

import Container from "@mui/material/Container";
import { Typography } from "@material-ui/core";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "../Layout/Navbar";
import {
  Autocomplete,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { useFormik } from "formik";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useTheme } from "@mui/material/styles";

import AddProductSchema from "../../schemas/AddProductSchema";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate=useNavigate()
  const theme = useTheme();
  const [categoryName, setcategoryName] = React.useState([]);
  const [categoryId, setcategoryId] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [isLoader, setIsLoader] = React.useState(true);

  setTimeout(()=>{
    setIsLoader(false)
  },1500)

  React.useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/category/get-all-categories")
      .then((res) => {
        console.log(res.data.data);
        setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event) => {
    const { value } = event.target || {};

    const categoryNames = Array.isArray(value) ? value : [value];
    console.log("categoryNames", categoryNames);
    const newCategoryIds = categoryNames.map((categoryName) => {
      console.log("categoryName", categoryName);
      const matchingCategory = category.find(
        (cat) => cat.title === categoryName
      );
      console.log("matchingCategory", matchingCategory);
      return matchingCategory ? matchingCategory.id : categoryName;
    });

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
    avatar_image: null,
    categoryArrayFromBody: [],
  };

  const handleImageUpload = (e) => {
    const files = e.target.files[0];
    console.log("Files ", files);
    formik.setFieldValue("avatar_image", files);
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, action) => {

      let formData = new FormData();

      console.log("formData>>>>>>>>>>>>>>>>>>>>>>>>>>>>", formData);

      formData.append("title", values.title);
      formData.append("short_description", values.short_description);
      formData.append("description", values.description);
      formData.append("amount", values.amount);
      formData.append("discount_type", values.discount_type);
      formData.append("discount_amount", values.discount_amount);
      formData.append("avatar_image", values.avatar_image);
      formData.append(
        "categoryArrayFromBody",
        JSON.stringify(values.categoryArrayFromBody)
      );

      for (var [key, value] of formData.entries()) {
        console.log(key, value);
      }

      let token = JSON.parse(sessionStorage.getItem("token"));
      if (token) {
        // console.log("AddProductObj",AddProductObj);
        const options = {
          method: "post",
          url: "http://localhost:8080/api/v1/product/add-product",
          data: formData,
          headers: { token: token, "Content-Type": "multipart/form-data" },
        };
        // console.log(values);
        // axios.post("http://localhost:8080/api/v1/product/add-product", formData,options).then((response) => {
        //   console.log("response.data==>>",response.data);
        // });
        axios
          .request(options)
          .then(function (AddProduct_res) {
            if (AddProduct_res) {
              console.log("AddProduct_res data", AddProduct_res);
              toast.success("Product added successfully", {
                position: "top-right",
                duration: 3000,
              });
              navigate("/all-product");
            }
          })
          .catch(function (error) {
            console.error("Error of add product", error);
            toast.error(
              error.response.data.message
                ? error.response.data.message
                : "Error With fetching data",
              {
                position: "top-right",
                duration: 3000,
              }
            );
          });
        action.resetForm();
      } else {
        toast.error("please login", {
          position: "top-right",
          duration: 3000,
        });
      }
    },
    validationSchema: AddProductSchema,
  });

  return (
    isLoader ? (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          marginTop:"18%"
        }}
      >
        <FallingLines
          color="#4fa94d"
          width="200"
          visible={true}
          ariaLabel="falling-lines-loading"
          className="mt-auto mb-auto"
        />
      </div>
    ) : (
    <ThemeProvider theme={theme}>
      <Container component="main" >
        <CssBaseline />
        {/* <Navbar /> */}
        <Sidebar >
        <Box
          sx={{
            marginTop: 8,
            // marginLeft: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
         <Typography
                  variant="h4"
                  sx={{marginY:'10px'}}
                  color="initial"
                >
                  Add Product
                </Typography>
          <Box component="form" sx={{ mt: 3 }} onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  autoComplete="off"
                  name="title"
                  
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
              <Grid item xs={12} sm={12} md={6}>
                <FormControl sx={{ width: "100%", maxWidth: 600 }}>
                  <InputLabel id="demo-multiple-checkbox-label" >
                    Product Category
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    name="categoryArrayFromBody"
                    multiple
                    value={categoryName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Product Category" />}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {category.map((name) => (
                      <MenuItem key={name.id} value={name.title}>
                        <Checkbox
                          checked={categoryName.indexOf(name.title) > -1}
                        />
                        <ListItemText primary={name.title} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
              color="success"
              sx={{ mt: 3, mb: 2 }}
              className="btn btn-success"
            >
              Add Product
            </Button>
          </Box>
        </Box>
        </Sidebar>
      </Container>
    </ThemeProvider>
  ));
}
