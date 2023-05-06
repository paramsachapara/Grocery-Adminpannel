import React from "react";
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
import axios from "axios";
import { LoginSchema } from "../schemas/LoginSchema";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      toast.success("You Already Logged in", {
        position: "top-right",
        duration: 3000,
      });
      navigate("/");
    }
  });
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values, action) => {
      let token = sessionStorage.getItem("token");
      console.log(values);
      const options = {
        method: "post",
        url: "http://localhost:8080/api/v1/admin/login",
        data: values,
      };
      if (!token) {
        axios
          .request(options)
          .then(function (login_res) {
            if (login_res) {
              toast.success("Login Successfull", {
                position: "top-right",
                duration: 3000,
              });
              console.log("login_res.data", login_res);
              sessionStorage.setItem(
                "token",
                JSON.stringify(login_res.data.data.token)
              );
              setTimeout(() => {
                navigate("/");
              }, 1500);
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
      } 
    },

    validationSchema: LoginSchema,
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
            <h1 style={{ margin: 0 }}>Login</h1>
            <Typography variant="caption">
              Please fill this form to Login
            </Typography>
          </Grid>
          <form onSubmit={formik.handleSubmit}>
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

            <Grid align="center">
              <Button
                type="submit"
                style={SubmitButtonStyle}
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </Grid>
            <Grid align="center">
              <p
                onClick={() => navigate("/signup")}
                variant="contained"
                color="primary"
                style={{ cursor: "pointer" }}
              >
                Don’t have an account?{" "}
                <span id="mouse" style={{ color: "blue" }}>
                  Sign up
                </span>
              </p>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </>
  );
}

export default Login;
