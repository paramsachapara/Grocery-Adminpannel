import * as Yup from "yup";
const AddProductSchema = Yup.object({
  title: Yup.string().required("Required").max(20, "max 20 characters allowed"),
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
export default AddProductSchema;
