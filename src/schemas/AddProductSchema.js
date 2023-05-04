import * as Yup from "yup";
const AddProductSchema = Yup.object({
  title: Yup.string().required("Required"),
  short_description: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  amount: Yup.number().required("Required"),
  discount_amount: Yup.string().required("Required"),
  discount_type: Yup.string().required("Required"),
  categoryArrayFromBody: Yup.array()
    .min(1, "Please select category")
    .required("Required"),
});
export default AddProductSchema;
