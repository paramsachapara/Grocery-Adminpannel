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
import axios from "axios";
import { toast } from "react-hot-toast";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const theme = createTheme();

export default function AddProduct() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const selectChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

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
    initialValues: initialValues,
    onSubmit: (values, action) => {
      let token = sessionStorage.getItem("token");
      console.log(values);
      if (token) {
        console.log(values);
        const options = {
          method: "post",
          url: "http://localhost:8080/api/v1/product/add-product",
          data: initialValues,
        };

        axios
          .request(options)
          .then(function (login_res) {
            if (login_res) {
              console.log("login_res data", login_res);
              toast.success("Signup Successfully", {
                position: "bottom-center",
                duration: 3000,
              });
              // navigate("/login");
            }
          })
          .catch(function (error) {
            console.error(error);
            toast.error(
              error.response.data.message
                ? error.response.data.message
                : "Error With Login",
              {
                position: "bottom-center",
                duration: 3000,
              }
            );
          });
        action.resetForm();
      } else {
        toast.error("You are already logged in", {
          position: "bottom-center",
          duration: 3000,
        });
      }
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
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: "100%", maxWidth: 600 }}>
                  <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
                    onChange={selectChange}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                      >
                        {name}
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
            >
              Add Product
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
