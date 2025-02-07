import { TConfig } from "@/lib/types/config";

export const CONFIG: TConfig = {
  // session
  SECRET_KEY: process.env.SESSION_SECRET || "",
};
