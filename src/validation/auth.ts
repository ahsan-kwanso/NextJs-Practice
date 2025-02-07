import { z } from "zod";
import { emailSchema, nameSchema } from "./common";
import { PASSWORD_TEXT, REQUIRED_MESSAGE } from "@/constants";

export const SignInFormSchema = z.object({
  email: emailSchema,
  password: nameSchema.min(1, {
    message: `${PASSWORD_TEXT}${REQUIRED_MESSAGE}`,
  }),
});

export const SignUpFormSchema = z.object({
  email: emailSchema,
  password: nameSchema.min(1, {
    message: `${PASSWORD_TEXT}${REQUIRED_MESSAGE}`,
  }),
});
