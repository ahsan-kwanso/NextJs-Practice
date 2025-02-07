import { z } from "zod";
import {
  EMAIL_TEXT,
  INVALID_EMAIL_MESSAGE,
  MAX_LIMIT_MESSAGE,
  MIN_LIMIT_MESSAGE,
  REQUIRED_MESSAGE,
} from "@/constants";

export const idSchema = z.number();
export const nameSchema = z.string().trim();
export const optionalSchema = z.string().optional().nullable();
export const textareaSchema = z.string().trim().min(2).max(5000);
export const messageSchema = z.string().trim();

export const emailSchema = z
  .string()
  .trim()
  .min(1, { message: `${EMAIL_TEXT}${REQUIRED_MESSAGE}` })
  .min(2, { message: `${EMAIL_TEXT}${MIN_LIMIT_MESSAGE}` })
  .max(50, { message: `${EMAIL_TEXT}${MAX_LIMIT_MESSAGE}` })
  .email({ message: `${INVALID_EMAIL_MESSAGE}` });

export const enumSchema = <T extends [string, ...string[]]>(enumValues: T) =>
  z.enum(enumValues);

export const optionalEnumSchema = <T extends [string, ...string[]]>(
  enumValues: T
) => z.enum(enumValues).optional().nullable();

export const htmlSchema = z.any();
