import * as Yup from "yup";
const ProductSchema = Yup.object().shape({
  productName: Yup.string().required("Required"),
  // productDescription: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  availability: Yup.boolean().oneOf([true], "Required"),
  productFeatures: Yup.string().required("Required"),
});
export default ProductSchema;
