import * as Yup from 'yup'

 const AddCategorySchema=Yup.object().shape({
    categoryName:Yup.string().required('Category Name is required')
})
export default AddCategorySchema