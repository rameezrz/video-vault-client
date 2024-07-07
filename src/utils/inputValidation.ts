import { LoginInputs, RegistrationInputs } from "../types/inputValidation";

export const validateRegistrationInputs = (inputs: RegistrationInputs) => {
  const { firstName, lastName, email, mobile } = inputs;
  if (!firstName.trim()) {
    return "First Name is required";
  }
  if (firstName.trim().length < 3) {
    return "First Name should have at least 3 letters";
  }
  if (/\d/.test(firstName.trim())) {
    return "First Name should not contain numbers";
  }
  if (!lastName.trim()) {
    return "Last Name is required";
  }
  if (lastName.trim().length < 3) {
    return "Last Name should have at least 3 letters";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid Email format";
  }
  const mobileRegex = /^\d{10}$/;
  if (!mobileRegex.test(mobile)) {
    return "Mobile number should be 10 digits";
  }
  return "";
};

export const validateLoginInputs = (inputs: LoginInputs) => {
  const { firstName, password } = inputs;
  if (!firstName.trim()) {
    return "First Name is required";
  }
  if (firstName.trim().length < 3) {
    return "First Name should have at least 3 letters";
  }
  if (/\d/.test(firstName.trim())) {
    return "First Name should not contain numbers";
  }
  if (!password.trim()) {
    return "Password is required";
  }
  if (password.trim().length < 10) {
    return "Password should have at least 10 letters";
  }
  return "";
};

export const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};
