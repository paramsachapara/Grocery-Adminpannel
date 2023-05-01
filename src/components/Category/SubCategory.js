import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
// import * as React from 'react';
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Grid, Typography, TextField, Autocomplete } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";

// import * as React from 'react';
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const subCategoryValidationSchema = Yup.object().shape({
  categoryName: Yup.string().required("Category Name is required"),
  parentCategory: Yup.string().required("parent Category is required"),
});

function SubCategory() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [ide, setIde] = useState(null);
  const [subCategory, setSubCategory] = useState([]);
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const initialValues = {
    categoryName: "",
    parentCategory: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: subCategoryValidationSchema,
    onSubmit: (values, actions) => {
      console.log(values);
      actions.resetForm();
    },
  });
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - subCategory.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setIde(id);
    console.log(ide);
    axios
      .get("http://localhost:8080/api/v1/category/get-all-categories")
      .then((res) => {
        console.log(res.data.data);
        setCategories(res.data.data);
        const subCategories = res.data.data.filter((category) => {
          return category.parent_id == id;
        });
        console.log(subCategories, "subCategories");
        setSubCategory(subCategories);
        // console.log(subCategory)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const [card, setCard] = useState({
    name: "",
    description: "",
  });
  const handleClick = () => {
    setIsEditing(true);
  };
  console.log(isEditing);
  const handleDelete = (title) => {
    console.log(title);
  };
  return (
    <Sidebar>
      {isEditing ? (
        <Box sx={{ marginTop: "100px" }}>
          <form onSubmit={formik.handleSubmit}>
            <Box>
              <Autocomplete
                id="category"
                freeSolo
                options={categories
                  .filter((res) => res.parent_id == null)
                  .map((option) => option.title)}
                value={value}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                style={{ width: "50%" }}
                // onChange={handleParentCategoryChange}
                renderInput={(params) => (
                  <TextField {...params} label="Category" />
                )}
              />
            </Box>
            <Box>
              <TextField
                label="Sub Category"
                name="categoryName"
                value={formik.values.categoryName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                margin="normal"
                style={{ width: "50%" }}
              />
              {formik.touched.categoryName && formik.errors.categoryName && (
                <div style={{ color: "red" }}>{formik.errors.categoryName}</div>
              )}
            </Box>
            <Box>
              <Button
                type="submit"
                sx={{ marginRight: "30px" }}
                variant="contained"
                color="success"
              >
                Add Category
              </Button>
              <Button
                variant="contained"
                onClick={() => setSubCategory(true)}
                color="success"
              >
                Back
              </Button>
            </Box>
          </form>
        </Box>
      ) : null}

      <Grid container>
        <Grid item xs={8}>
          <Box sx={{ height: "50px" }}>
            <Typography variant="h4" sx={{ marginTop: "70px" }} color="initial">
              Sub Category
            </Typography>
          </Box>
          <Box sx={{ height: "50px" }}>
            <TableContainer component={Paper} elevation={3}>
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >
                <TableBody>
                  {(rowsPerPage > 0
                    ? subCategory.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : subCategory
                  ).map((row) => (
                    <TableRow key={row.title}>
                      <TableCell component="th" scope="row">
                        <Typography
                          variant="h6"
                          sx={{ marginLeft: "50px" }}
                          color="initial"
                        >
                          {row.title}
                        </Typography>
                      </TableCell>
                      <TableCell style={{ width: 50 }} align="right">
                        <EditIcon onClick={handleClick} />
                      </TableCell>
                      <TableCell style={{ width: 50 }} align="right">
                        <DeleteIcon onClick={() => handleDelete(row.title)} />
                      </TableCell>
                    </TableRow>
                  ))}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={3}
                      count={subCategory.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Sidebar>
  );
}
export default SubCategory;
