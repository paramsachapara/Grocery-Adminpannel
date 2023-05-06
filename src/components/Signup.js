import React, { useEffect } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas/SignupSchema";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirmPassword: "",
  // gender: "",
};

function Signup() {
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      // toast.success("You are Already Logged in", {
      //   position: "top-right",
      //   duration: 3000,
      // });
      setTimeout(() => {
        navigate("/add-product");
      }, 1500);
    }
  });
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, action) => {
      let token = sessionStorage.getItem("token");
      console.log(values);
      const Obj = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.confirmPassword,
      };
      if (!token) {
        console.log(values);
        const options = {
          method: "post",
          url: "http://localhost:8080/api/v1/admin/register",
          data: Obj,
        };

        axios
          .request(options)
          .then(function (login_res) {
            if (login_res) {
              console.log("login_res data", login_res);
              toast.success("Signup Successfull", {
                position: "top-right",
                duration: 3000,
              });
              navigate("/login");
            }
          })
          .catch(function (error) {
            console.error(error);
            toast.error(
              error.response.data.message
                ? error.response.data.message
                : "Error With Login",
              {
                position: "top-right",
                duration: 3000,
              }
            );
          });
        action.resetForm();
      } else {
        // toast.error("You are already logged in", {
        //   position: "top-right",
        //   duration: 3000,
        // });
      }
    },

    validationSchema: signUpSchema,
  });

  const paperStyle = {
    padding: 20,
    height: "auto",
    width: "350px",
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "green" };
  const inputFielsStyle = { marginTop: "15px", marginBottom: "15px" };
  const SubmitButtonStyle = { margin: "15px 0 0 0 " };
  return (
    <>
      <Grid>
        <div>
          <Toaster />
        </div>
        <Paper elevation={4} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockIcon />
            </Avatar>
            <h1 style={{ margin: 0 }}>SignUp</h1>
            <Typography variant="caption">
              Please fill this form to add account
            </Typography>
          </Grid>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              style={inputFielsStyle}
              label="First Name"
              name="first_name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name && (
              <div style={{ color: "red" }}>{formik.errors.name}</div>
            )}
            <TextField
              fullWidth
              style={inputFielsStyle}
              label="Last Name"
              name="last_name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name && (
              <div style={{ color: "red" }}>{formik.errors.name}</div>
            )}
            <TextField
              fullWidth
              style={inputFielsStyle}
              label="Email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            )}
            <TextField
              fullWidth
              style={inputFielsStyle}
              label="Password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            )}
            <TextField
              fullWidth
              style={inputFielsStyle}
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            {formik.errors.confirmPassword &&
              formik.touched.confirmPassword && (
                <div style={{ color: "red" }}>
                  {formik.errors.confirmPassword}
                </div>
              )}
            <Grid align="center">
              <Button
                type="submit"
                style={SubmitButtonStyle}
                variant="contained"
                color="primary"
              >
                SignUp
              </Button>
            </Grid>
            <Grid align="center">
              <p
                onClick={() => navigate("/login")}
                variant="contained"
                color="primary"
                style={{ cursor: "pointer" }}
              >
                Already have an account?{" "}
                <span style={{ color: "blue" }}>Login</span>
              </p>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </>
  );
}

export default Signup;
