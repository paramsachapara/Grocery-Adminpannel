import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Autocomplete,
  Button,
  Grid,
  Stack,
} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Layout/Sidebar";
import { Formik, useFormik } from "formik";
import AddCategorySchema from "../../schemas/AddCategorySchema";
import axios from "axios";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
// import Box from '@mui/material/Box';
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import BlockIcon from "@mui/icons-material/Block";
import { width } from "@mui/system";
import Divider from "@mui/material/Divider";

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

function AddCategory() {
  const [subCategory, setSubCategory] = useState(true);
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [edit, setEdit] = useState(true);
  const [collapsableCategory, setCollapsableCategory] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = useState(true);
  const [title, setTitle] = useState("");
  const [deleteState, setDeleteState] = useState(true);
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
  };
  const addCategoryApi = async (categoryName) => {
    let matchedCategory = categories.find((res) => res.title == value);
    let categoryObject;
    if (matchedCategory) {
      categoryObject = {
        title: categoryName,
        parent_id: matchedCategory.id,
      };
    } else {
      categoryObject = {
        title: categoryName,
        parent_id: "0",
      };
    }
    const token = JSON.parse(sessionStorage.getItem("token"));
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/category/add-category",
        categoryObject,
        {
          headers: {
            token: token,
          },
        }
      );
      if (res) {
        const newCategory = res.data.data;
        setCategories([newCategory, ...categories]);
      }
      setValue("");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBlockClick = () => {
    const onClickCategory = collapsableCategory.find(
      (res) => res.title == title
    );
    const subCategoryOfSelectedCategory = categories.filter(
      (res) => res.parent_id == onClickCategory.id
    );

    if (subCategoryOfSelectedCategory) {
      subCategoryOfSelectedCategory.map((res) => {
        encryption(res.id)
          .then((data) => {
            const token = JSON.parse(sessionStorage.getItem("token"));

            if (onClickCategory && onClickCategory.is_active && token) {
              axios
                .put(
                  "http://localhost:8080/api/v1/category/inactive-category",
                  {},
                  {
                    headers: {
                      category_id: data,
                      token: token,
                    },
                  }
                )
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
            } else {
              axios
                .put(
                  "http://localhost:8080/api/v1/category/active-category",
                  {},
                  {
                    headers: {
                      category_id: data,
                      token: token,
                    },
                  }
                )
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => console.log(err));
        setOpen(false);
      });
    }
    // const activeCategories =subCategoryOfSelectedCategory.find((res)=>res.is_active)
    const token = JSON.parse(sessionStorage.getItem("token"));

    if (onClickCategory.is_active) {
      encryption(onClickCategory.id).then((data) => {
        axios
          .put(
            "http://localhost:8080/api/v1/category/inactive-category",
            {},
            {
              headers: {
                category_id: data,
                token: token,
              },
            }
          )
          .then((res) => {
            setActive(!active);
          })
          .catch((err) => console.log(err));
      });
    } else {
      encryption(onClickCategory.id).then((data) => {
        axios
          .put(
            "http://localhost:8080/api/v1/category/active-category",
            {},
            {
              headers: {
                category_id: data,
                token: token,
              },
            }
          )
          .then((res) => {
            setActive(!active);
          })
          .catch((err) => console.log(err));
      });
    }
  };
  const handleClick = (title) => {
    formik.setFieldValue("categoryName", title);
    setValue(title);
    setEdit(false);
  };

  const updateCategory = () => {
    let matchedCategory = categories.find((res) => res.title == value);
    const config = {
      headers: {
        id: matchedCategory.id,
      },
    };
    axios
      .get("http://localhost:8080/api/v1/encryption", config)
      .then((res) => {
        const token = JSON.parse(sessionStorage.getItem("token"));
        if (matchedCategory.parent_id == null) {
          axios
            .put(
              "http://localhost:8080/api/v1/category/update-category",
              {
                title: formik.values.categoryName,
                parent_id: "0",
              },
              {
                headers: {
                  id: res.data.data,
                  token: token,
                },
              }
            )
            .then((res) => {
              setEdit(true);
            })
            .catch((err) => console.log(err));
        } else {
          axios
            .put(
              "http://localhost:8080/api/v1/category/update-category",
              {
                title: formik.values.categoryName,
                parent_id: JSON.stringify(matchedCategory.parent_id),
              },
              {
                headers: {
                  id: res.data.data,
                  token: token,
                },
              }
            )
            .then((res) => {
              setEdit(true);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (title) => {
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
        axios
          .delete("http://localhost:8080/api/v1/category/delete-category", {
            headers: {
              token: token,
              category_id: encryptedId.data.data,
            },
          })
          .then((res) => {
            setDeleteState(!deleteState);
            console.log(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: AddCategorySchema,
    onSubmit: (values, actions) => {
      addCategoryApi(values.categoryName);
      setSubCategory(true);
      actions.resetForm();
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/category/get-all-categories")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [formik.values.categoryName, edit, active, deleteState]);

  useEffect(() => {
    if (categories) {
      const transformedData = categories.filter((res) => res.parent_id == null);

      setCollapsableCategory(transformedData);
    }
  }, [categories, active]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - collapsableCategory.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {subCategory ? (
        <Sidebar>
          <Box sx={{ height: "50px" }}>
            <Typography variant="h4" sx={{ marginTop: "70px" }} color="initial">
              Add Category
            </Typography>
          </Box>
          <Grid>
            <Box>
              <form onSubmit={formik.handleSubmit}>
                <Box>
                  <TextField
                    label="Category Name"
                    name="categoryName"
                    value={formik.values.categoryName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    margin="normal"
                    style={{ width: "50%" }}
                  />
                  {formik.touched.categoryName &&
                    formik.errors.categoryName && (
                      <div style={{ color: "red" }}>
                        {formik.errors.categoryName}
                      </div>
                    )}
                </Box>
                {edit ? (
                  <Stack direction="row">
                    <Button
                      type="submit"
                      sx={{ marginRight: "30px" }}
                      variant="contained"
                      color="success"
                    >
                      Add category
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        setSubCategory(false);
                      }}
                    >
                      Add sub category
                    </Button>
                  </Stack>
                ) : (
                  <Stack direction="row" spacing={3}>
                    <Button
                      variant="contained"
                      onClick={updateCategory}
                      color="success"
                    >
                      Update category
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setEdit(true);
                        formik.setFieldValue("categoryName", "");
                      }}
                      color="success"
                    >
                      Back
                    </Button>
                  </Stack>
                )}
              </form>
            </Box>
          </Grid>
        </Sidebar>
      ) : (
        <Sidebar>
          <Grid>
            <Box sx={{ height: "50px" }}>
              <Typography
                variant="h4"
                sx={{ marginTop: "70px" }}
                color="initial"
              >
                Add Category
              </Typography>
            </Box>
            <Box>
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
                  {formik.touched.categoryName &&
                    formik.errors.categoryName && (
                      <div style={{ color: "red" }}>
                        {formik.errors.categoryName}
                      </div>
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
          </Grid>
        </Sidebar>
      )}

      {categories ? (
        <Sidebar>
          <Grid container spacing={2}>
            <Grid item md={10}>
              <TableContainer component={Paper} elevation={7}>
                <Table
                  sx={{ minWidth: 500 }}
                  aria-label="custom pagination table"
                >
                  <TableHead sx={{ backgroundColor: "#4caf50", height: 50 }}>
                    <TableRow>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                        Category
                      </TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                        Sub Category
                      </TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                        Active Category
                      </TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                        In Active Category
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? collapsableCategory.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : collapsableCategory
                    ).map((row, index) => (
                      <TableRow
                        key={row.title}
                        sx={{
                          cursor: "pointer",
                          backgroundColor: row.is_active
                            ? undefined
                            : "#f5f5f5",
                          "&:hover": {
                            backgroundColor: row.is_active
                              ? "rgba(0, 0, 0, 0.08)"
                              : undefined,
                          },
                        }}
                      >
                        <TableCell component="tr" scope="row">
                          <Stack direction="row" spacing={3}>
                            <Typography
                              variant="body1"
                              color="initial"
                              className="parentCategory"
                            >
                              {index + 1}
                            </Typography>

                            <Typography
                              sx={{ width: "140px" }}
                              variant="body1"
                              color="initial"
                              className="parentCategory"
                              onClick={() => navigate(`sub-category/${row.id}`)}
                            >
                              {row.title}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell component="tr" scope="row">
                          <Typography
                            variant="body1"
                            color="initial"
                            className="parentCategory"
                            onClick={() => navigate(`sub-category/${row.id}`)}
                          >
                            {
                              categories.filter(
                                (res) => res.parent_id == row.id
                              ).length
                            }{" "}
                            Subcategories
                          </Typography>
                        </TableCell>
                        <TableCell component="tr" scope="row">
                          <Typography
                            variant="body1"
                            color="initial"
                            className="parentCategory"
                            onClick={() => navigate(`sub-category/${row.id}`)}
                          >
                            {
                              categories.filter(
                                (res) =>
                                  res.parent_id == row.id &&
                                  res.is_active == true
                              ).length
                            }{" "}
                            Active
                          </Typography>
                        </TableCell>
                        <TableCell component="tr" scope="row">
                          <Typography
                            variant="body1"
                            color="initial"
                            className="parentCategory"
                            onClick={() => navigate(`sub-category/${row.id}`)}
                          >
                            {
                              categories.filter(
                                (res) =>
                                  res.parent_id == row.id &&
                                  res.is_active == false
                              ).length
                            }{" "}
                            Inactive
                          </Typography>
                          {/* </Stack> */}

                          {/* {row.name} */}
                        </TableCell>
                        <TableCell style={{ width: 50 }} align="right">
                          <BlockIcon
                            className="blockIcon"
                            sx={{ color: row.is_active ? undefined : "red" }}
                            onClick={() => {
                              setOpen(true);
                              setTitle(row.title);
                            }}
                          />
                        </TableCell>
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
                            <Button onClick={handleBlockClick}>Agree</Button>
                          </DialogActions>
                        </Dialog>
                        <TableCell style={{ width: 50 }} align="right">
                          <EditIcon onClick={() => handleClick(row.title)} />
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
                        count={collapsableCategory.length}
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
            </Grid>
          </Grid>
        </Sidebar>
      ) : null}
    </>
  );
}
export default AddCategory;
