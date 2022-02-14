import * as yup from "yup";
export const schemaPayment = yup.object().shape({
  firstName: yup.string().required("Please input your first name."),
  lastName: yup.string().required("Please input your last name."),
  expirationTime: yup
    .string()
    .required("Please input expiration time.")
    .matches(
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i,
      "Please input the expiration time in dd/mm/yyy format."
    ),
  cardId: yup
    .string()
    .required("Card ID is required.")
    .matches(/^[0-9]+$/, "Phone must be only digits.")
    .min(9, "Card ID must be exactly 9 digits.")
    .max(9, "Card ID must be exactly 9 digits."),
  code: yup
    .string()
    .required("Code is required.")
    .matches(/^[0-9]+$/, "Phone must be only digits.")
    .min(4, "Please input 4 digits.")
    .max(4, "Please input 4 digits."),
});

export const schemaSignIn = yup.object().shape({
  taiKhoan: yup.string().required("User name is required."),
  matKhau: yup.string().required("You must specify a password."),
});
export const schemaSignUp = yup.object().shape({
  email: yup
    .string()
    .required("Email is required.")
    .matches(
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
      "Email format invalid."
    ),
  taiKhoan: yup.string().required("User name is required."),
  matKhau: yup
    .string()
    .required("You must specify a password.")
    .matches(
      /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
      "Password minimum 8 characters, at least one letter and one number."
    ),
  matKhau1: yup
    .string()
    .required("You must specify a password.")
    .oneOf([yup.ref("matKhau"), null], "Passwords must match."),
  soDt: yup
    .string()
    .required("Phone number is required.")
    .matches(/^[0-9]+$/, "Phone must be only digits.")
    .min(10, "Please input 10 digits.")
    .max(10, "Please input 10 digits."),
  ho: yup.string().required("First name is required."),
  ten: yup.string().required("Last name is required."),
});
