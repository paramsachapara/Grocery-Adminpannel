import Sidebar from "../../components/Layout/Sidebar";
import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import {

  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "../Layout/Navbar";
import { OutlinedInput } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-hot-toast";
import AddProductSchema from "../../schemas/AddProductSchema";


const theme = createTheme();
export default function EditProductForm(props) {
  const { selectedProduct, setOpenEditDialog } = props;
  const [categoryName, setcategoryName] = React.useState([]);
  const [categoryId, setcategoryId] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [changeProduct, setChangeProduct] = React.useState(false);


  React.useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/category/get-all-categories")
      .then((res) => {
        console.log("Category Response", res.data.data);
        setCategory(res.data.data);
        console.log("selectedProduct", selectedProduct);
        const categoryIds = selectedProduct.categoryArrayFromBody;
        console.log("categoryIds", categoryIds);

        const newCategoryIds = categoryIds.map((categoryId) => {
          console.log("category", res.data.data);
          console.log("categoryId", categoryId);
          const matchingCategory = res.data.data.find(
            (cat) => cat.id === categoryId.category_id
          );
          console.log("matchingCategory", matchingCategory);
          return matchingCategory ? matchingCategory.title : categoryId;
        });

        setcategoryName(newCategoryIds);
        console.log("newCategoryIds", newCategoryIds);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [changeProduct, setOpenEditDialog]);

  const handleChange = (event) => {
    const { value } = event.target || {};

    console.log("value", value);

    const categoryNames = Array.isArray(value) ? value : [value];
    console.log("categoryNames", categoryNames);
    const newCategory = categoryNames.map((categoryName) => {
      console.log("categoryName", categoryName);
      const matchingCategory = category.find(
        (cat) => cat.title === categoryName
      );
      console.log("matchingCategory", matchingCategory);
      return matchingCategory ? matchingCategory.id : categoryName;
    });
    formik.setFieldValue("categoryArrayFromBody", newCategory);
    console.log("newCategoryIds", newCategory);
    setcategoryName(categoryNames);
    setcategoryId(newCategory);
  };

  const initialValues = {
    title: selectedProduct.title || "",
    short_description: selectedProduct.short_description || "",
    description: selectedProduct.description || "",
    amount: selectedProduct.amount || "",
    discount_type: selectedProduct.discount_type || "",
    discount_amount: selectedProduct.discount_amount || 0,
    avatar_image: selectedProduct.avatar_image || {},
    categoryArrayFromBody: categoryId || [],
  };

  const handleAvatarChange = (event) => {
    formik.setFieldValue("avatar_image", event.currentTarget.files[0]);
  };

  const onSubmit = (values) => {
    if (values) {
      let token = JSON.parse(sessionStorage.getItem("token"));
      console.log(token, "token");
      if (token) {
        axios
          .get("http://localhost:8080/api/v1/encryption", {
            headers: {
              id: selectedProduct.id,
            },
          })
          .then((res) => {
            console.log("Eid", res.data.data);
            let formData = new FormData();
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

            axios
              .put(
                "http://localhost:8080/api/v1/product/update-product",
                formData,
                {
                  headers: {
                    token: token,
                    product_id: res.data.data,
                    "Content-Type": "multipart/form-data",
                  },
                }
              )
              .then((res) => {
                console.log("Product Updated", res);
                toast.success(`${formData.get("title")} Product Updated`, {
                  position: "top-right",
                  autoClose: 3000,
                });
                setOpenEditDialog(false);
                setChangeProduct(!changeProduct);
              })
              .catch((error) => {
                console.log("Error", error);
                toast.error(error.response.data.message, {
                  position: "top-right",
                  autoClose: 3000,
                });
              });
          })
          .catch((error) => console.log(error));
      }
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: AddProductSchema,
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
          <Box component="form" sx={{ mt: 1 }} onSubmit={formik.handleSubmit}>
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
                  onChange={handleAvatarChange}
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
                <FormControl sx={{ width: "100%", maxWidth: 300 }}>
                  <InputLabel id="demo-multiple-checkbox-label" required>
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
