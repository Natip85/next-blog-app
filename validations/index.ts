import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Valid email required" }),
  password: z.string().min(1, {
    message: "Password required",
  }),
  code: z.optional(z.string()),
});
export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({ message: "Valid email required" }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});
