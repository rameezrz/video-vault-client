import { RegistrationInputs } from "./inputValidation";

export type User = RegistrationInputs & {
  avatar?: string;
  bio?: string;
};
