import { emailRegex } from "@/regex/validate.reg";

export const validateEmail = (email: string) => {
  return emailRegex.test(String(email).toLowerCase());
};
