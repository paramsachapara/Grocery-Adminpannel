import * as yup from "yup";
export const signUpSchema = yup.object({
  first_name: yup.string().min(2).required("Please enter your name"),
  last_name: yup.string().min(2).required("Please enter your name"),
  email: yup.string().email().required("Please enter your email"),
  password: yup
    .string()
    .min(8, "length of password must be minimum 8")
    .required("Please entr your password"),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Password must be same"),
  // gender: yup
  //   .string()
  //   .required("Please select gender")
  //   .test("is-selected", "Please select a gender", (value) => {
  //     return value !== undefined && value !== null;
  //   }),
});
