import { z } from "zod";

export const IssueSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title must not exceed 255 characters" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description must contain more than 1 character" })
    .max(65536, { message: "Description must not exceed 65536 characters" }),
});

export const PatchIssueSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title must not exceed 255 characters" })
    .optional(),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description must contain more than 1 character" })
    .max(65536, { message: "Description must not exceed 65536 characters" })
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, { message: "AssignedToUserId is required" })
    .optional()
    .nullable(),
});
