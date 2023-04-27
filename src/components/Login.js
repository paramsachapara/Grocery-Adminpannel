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
import { signUpSchema } from "../schemas/SignupSchema";

const initialValues = {
  email: "",
  password: "",
};

function Signup() {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: signUpSchema,
  });

  const paperStyle = {
    padding: 20,
    height: "auto",
    width: "280px",
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "green" };
  const inputFielsStyle = { margin: "3px 0 0 1px" };
  const SubmitButtonStyle = { margin: "15px 0 0 0 " };
  return (
    <>
      <Grid>
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
          </form>
        </Paper>
      </Grid>
    </>
  );
}

export default Signup;
