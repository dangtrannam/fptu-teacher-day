import * as Yup from 'yup';

// function to remove extra spaces
const removeExtraSpaces = (value) => value.replace(/\s+/g, ' ').trim();

export const informationSchema = Yup.object().shape({
    name: Yup.string()
        .transform((value) => removeExtraSpaces(value)) // remove extra spaces
        .required('Tên không được bỏ trống')
        .matches(/^[A-Za-zÀ-ỹà-ỹ\s]*$/, 'Tên không chứa ký tự đặc biệt'),

    schoolName: Yup.string()
        .transform((value) => removeExtraSpaces(value)) // remove extra spaces
        .required('Trường không được bỏ trống')
        .matches(/^[A-Za-zÀ-ỹà-ỹ\s]*$/, 'Trường không chứa ký tự đặc biệt'),

    userInput: Yup.string()
        .transform((value) => value.trim()) // remove extra spaces
        .required('Lời chúc không được bỏ trống')
        .max(170, 'Lời chúc không được dài quá 170 ký tự')
});
