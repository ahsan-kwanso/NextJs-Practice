import { ZodSchema } from "zod";
import { HttpStatusCode } from "axios";
// types, constants
import { IResponseType, EnumT } from "@/lib/types/common";
// Higher-order function type with generics

export const validateSchema = <I, M>(
  callback: (props: I) => Promise<M>,
  zodSchema: ZodSchema<I>
) => {
  return async (inputProps: I): Promise<M> => {
    // Validate inputProps using the provided zodSchema
    const validatedFields = zodSchema?.safeParse(inputProps);

    if (!validatedFields?.success) {
      // If validation fails, throw a detailed error message
      const errorMessages = validatedFields?.error?.errors?.map(
        (err) => err.message
      );
      throw new Error(errorMessages?.join(", ") || "Validation Error");
    }

    // If validation succeeds, invoke the callback with validated inputProps
    return await callback(inputProps); // validatedFields.data is the correctly parsed inputProps
  };
};

export const createNotFoundMsg = (title: string) => `${title} not found.`;

export const NotFoundException = (title: string): IResponseType => {
  return {
    statusCode: HttpStatusCode.NotFound,
    message: createNotFoundMsg(title),
  };
};

export const createMessage = (title: string): IResponseType => {
  return {
    statusCode: HttpStatusCode.Created,
    message: `${title} is created successfully.`,
  };
};

export const delMessage = (title: string): IResponseType => {
  return {
    statusCode: HttpStatusCode.Ok,
    message: `${title} is deleted successfully.`,
  };
};

export const updateMessage = (title: string): IResponseType => {
  return {
    statusCode: HttpStatusCode.Ok,
    message: `${title} is updated successfully.`,
  };
};

export const fetchMessage = (title: string): IResponseType => {
  return {
    statusCode: HttpStatusCode.Ok,
    message: `${title} is fetched successfully.`,
  };
};

export const createServerError = (error: unknown): Error => {
  if (error instanceof Error) return error;
  return new Error("Something went wrong");
};

export const createAPIError = (error: unknown): IResponseType => {
  const serverErr = (error as IResponseType) || {};
  const { statusCode, message } = serverErr || {};
  if (statusCode !== HttpStatusCode.Ok) {
    return {
      statusCode,
      message,
    };
  }
  return {
    statusCode: HttpStatusCode.InternalServerError,
    message: "Something went wrong",
  };
};

export const formatTextType = (type: string): string => {
  const words: string[] = type.split("_");
  return words
    ?.map(
      (word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
};

export function createEnumMappedArray<T>(
  enumType: T,
  defaultValue: string,
  isCapitalize = true,
  isLowerCase = false
): EnumT {
  const enumValues = Object.values(enumType as object).map<string>(
    (enumValue) =>
      isCapitalize
        ? formatTextType(enumValue)
        : isLowerCase
        ? enumValue?.toLowerCase()
        : enumValue
  );

  if (enumValues?.length) {
    return enumValues as EnumT;
  }
  return [defaultValue];
}

export const successMessage = (title: string): IResponseType => {
  return {
    statusCode: HttpStatusCode.Ok,
    message: `${title} successfully.`,
  };
};

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
