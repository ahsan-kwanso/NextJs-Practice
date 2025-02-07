import { z } from "zod";
import { JwtPayload } from "jsonwebtoken";
// validations
import { SignInFormSchema, SignUpFormSchema } from "@/validation/auth";

export type LoginInputs = z.infer<typeof SignInFormSchema>;

export interface SessionPayload extends JwtPayload {
  userId: number;
  expiresAt: Date;
}

export interface LoginStatus {
  success: boolean;
}

export type SignUpInputs = z.infer<typeof SignUpFormSchema>;
