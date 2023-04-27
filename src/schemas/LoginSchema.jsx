import * as yup from "yup";
export const LoginSchema = yup.object({
  email: yup.string().email().required("Please enter your email"),
  password: yup
    .string()
    .min(8, "length of password must be minimum 8")
    .required("Please entr your password")
});
