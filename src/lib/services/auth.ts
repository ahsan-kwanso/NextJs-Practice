"use server";

// imports
import { redirect } from "next/navigation";
// helpers, services
import { createSession, deleteSession } from "./session";
import { createServerError, successMessage, validateSchema } from "../helpers";
// types, constants
import { LOGIN_TEXT, ROUTES, USER_EMAIL, USER_PASSWORD } from "@/constants";
import { ResponsePayload } from "../types/common";
import { SignInFormSchema } from "@/validation/auth";
import { LoginInputs, LoginStatus } from "../types/auth";

export const logout = async () => {
  try {
    await deleteSession();
    redirect(ROUTES.login);
  } catch (error) {
    throw createServerError(error);
  }
};

// Currently this is just for making route protected and then accessing them, sample
export const adminLogin = validateSchema(
  async (params: LoginInputs): Promise<ResponsePayload<LoginStatus>> => {
    try {
      const { email, password } = params || {};

      if (email === USER_EMAIL && password === USER_PASSWORD) {
        await createSession(1);
        return {
          data: { success: true },
          response: successMessage(LOGIN_TEXT),
        };
      }
      throw Error;
    } catch (error) {
      throw createServerError(error);
    }
  },
  SignInFormSchema
);
