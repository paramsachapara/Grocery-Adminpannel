import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import { Navigate, useParams } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
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
import { Grid, Typography, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import BlockIcon from "@mui/icons-material/Block";
import TableHead from "@mui/material/TableHead";
import { Stack } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [parentCategory, setParentCategory] = useState("");
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = useState(true);
  const [title, setTitle] = useState("");
  const [isCategoryDeleted, setIsCategoryDeleted] = useState(false);
  const navigate = useNavigate();

  const encryption = async (id) => {
    const config = {
      headers: {
        id: id,
      },
    };
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/encryption",
        config
      );
      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const initialValues = {
    categoryName: "",
    parentCategory: parentCategory,
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: subCategoryValidationSchema,
    onSubmit: (values, actions) => {
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
    axios
      .get("http://localhost:8080/api/v1/category/get-all-categories")
      .then((res) => {
        const parentCategory = res.data.data.find((res) => res.id == id);
        const subCategories = res.data.data.filter((category) => {
          setCategories(res.data.data);

          setParentCategory(parentCategory);
          return category.parent_id == id;
        });

        setSubCategory(subCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, active, isEditing, isCategoryDeleted]);

  const handleClick = (title, id, parentId) => {
    setSubCategoryId(id);

    setIsEditing(true);
    formik.setFieldValue("categoryName", title);
    const parentCategory = categories.find((res) => res.id == parentId);

    formik.setFieldValue("parentCategory", parentCategory.title);
  };

  const handleDelete = (title) => {
    if (title) {
      let matchedCategory = categories.find((res) => res.title == title);
      const config = {
        headers: {
          id: matchedCategory.id,
        },
      };
      let encryptedId;
      axios
        .get("http://localhost:8080/api/v1/encryption", config)
        .then((res) => {
          encryptedId = res;
          const token = JSON.parse(sessionStorage.getItem("token"));
          if (token) {
            axios
              .delete("http://localhost:8080/api/v1/category/delete-category", {
                headers: {
                  token: token,
                  category_id: encryptedId.data.data,
                },
              })
              .then((res) => {
                setIsCategoryDeleted(!isCategoryDeleted);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleBlockClick = async () => {
    const onClickCategory = subCategory.find((res) => res.title == title);

    try {
      const data = await encryption(onClickCategory.id);
      const token = JSON.parse(sessionStorage.getItem("token"));

      if (onClickCategory && onClickCategory.is_active) {
        await axios.put(
          "http://localhost:8080/api/v1/category/inactive-category",
          {},
          {
            headers: {
              category_id: data,
              token: token,
            },
          }
        );
      } else {
        await axios.put(
          "http://localhost:8080/api/v1/category/active-category",
          {},
          {
            headers: {
              category_id: data,
              token: token,
            },
          }
        );
      }

      setActive(!active);
    } catch (err) {
      console.log(err);
    }

    const matchedIsActive = subCategory.filter((res) => res.is_active);
    const matchedIsInActive = subCategory.filter((res) => !res.is_active);

    if (
      matchedIsActive.length > 0 ||
      matchedIsInActive.length === subCategory.length
    ) {
      const token = JSON.parse(sessionStorage.getItem("token"));

      try {
        const data = await encryption(parentCategory.id);

        await axios.put(
          "http://localhost:8080/api/v1/category/active-category",
          {},
          {
            headers: {
              category_id: data,
              token: token,
            },
          }
        );

        setActive(!active);
      } catch (err) {
        console.log(err);
      }
    }

    setOpen(false);
  };

  const updateSubCategory = () => {
    setOpen(false);
    let matchedCategory;
    // setSubCategory(formik.values.categoryName);

    if (subCategoryId) {
      matchedCategory = categories.find((res) => res.id == subCategoryId);
      if (matchedCategory) {
        const values = {
          title: formik.values.categoryName,
          parent_id: JSON.stringify(matchedCategory.parent_id),
        };
        const config = {
          headers: {
            id: matchedCategory.id,
          },
        };
        if (values) {
          axios
            .get("http://localhost:8080/api/v1/encryption", config)
            .then((res) => {
              const token = JSON.parse(sessionStorage.getItem("token"));
              axios
                .put(
                  "http://localhost:8080/api/v1/category/update-category",
                  values,
                  {
                    headers: {
                      id: res.data.data,
                      token: token,
                    },
                  }
                )
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
  };

  return (
    <Sidebar>
      {isEditing ? (
        <Box sx={{ marginTop: "100px" }}>
          <Typography variant="h4" color="initial">
            Update Category
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box>
              <TextField
                disabled
                id="category"
                freeSolo
                value={parentCategory.title}
                style={{ width: "50%", marginTop: "30px" }}
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
                onClick={updateSubCategory}
              >
                Update Category
              </Button>
              {/* <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Let Google help apps determine location. This means sending
                    anonymous location data to Google, even when no apps are
                    running.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Disagree</Button>
                  <Button onClick={handleClickOpen}>Agree</Button>
                </DialogActions>
              </Dialog> */}
              <Button
                variant="contained"
                onClick={() => setIsEditing(false)}
                color="success"
              >
                cancel
              </Button>
            </Box>
          </form>
        </Box>
      ) : null}

      <Grid container>
        <Grid item xs={11}>
          <Box sx={{ height: "50px" }}>
            <Stack direction="row" spacing={2} sx={{ marginTop: "70px" }}>
              <ArrowBackIcon
                sx={{ marginTop: "10px" }}
                onClick={() => navigate("/add-category")}
              />
              <Typography variant="h4" color="initial">
                Sub Category
              </Typography>
            </Stack>
          </Box>
          <Box sx={{ height: "50px" }}>
            <TableContainer component={Paper} elevation={7}>
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >
                <TableHead sx={{ backgroundColor: "#4caf50", height: 50 }}>
                  <TableRow>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      Sub Category
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? subCategory.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : subCategory
                  ).map((row, index) => (
                    <TableRow
                      key={row.title}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: row.is_active ? undefined : "#f5f5f5",
                        "&:hover": {
                          backgroundColor: row.is_active
                            ? "rgba(0, 0, 0, 0.08)"
                            : undefined,
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Stack direction="row" spacing={3}>
                          <Typography variant="body1" color="initial">
                            {index + 1}
                          </Typography>
                          <Typography variant="body1" color="initial">
                            {row.title}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell style={{ width: 50 }} align="right">
                      <Tooltip title="Block">
                        <BlockIcon
                          className="blockIcon"
                          sx={{ color: row.is_active ? undefined : "red" }}
                          onClick={() => {
                            setTitle(row.title);
                            setOpen(true);
                          }}
                        />
                        </Tooltip>
                        <Dialog
                          open={open}
                          keepMounted
                          onClose={handleClose}
                          aria-describedby="alert-dialog-slide-description"
                        >
                          <DialogTitle>{title}</DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                              {row.is_active
                                ? "Are you sure you want to inactive the category"
                                : "are you sure you want to active the category"}
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>Disagree</Button>
                            <Button
                              onClick={() =>
                                handleBlockClick(
                                  row.title,
                                  row.id,
                                  row.parent_id
                                )
                              }
                            >
                              Agree
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </TableCell>
                      <TableCell style={{ width: 50 }} align="right">
                        {row.is_active ? (
                          <EditIcon
                            disabled={!row.is_active ? true : false}
                            onClick={() =>
                              handleClick(row.title, row.id, row.parent_id)
                            }
                          />
                        ) : (
                          <EditIcon disabled />
                        )}
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
