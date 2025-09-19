import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6),
});

export type TTloginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,?!;:@#$%^&*()\-_=+{}\[\]<>€£$∞≠])[A-Za-z\d.,?!;:@#$%^&*()\-_=+{}\[\]<>€£$∞≠]{8,16}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character."
    ),
});

export type TTregisterSchema = z.infer<typeof registerSchema>;

export const todoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["todo", "in_progress", "done"]).default("todo"),
  priority: z.coerce.number().int().min(1).max(5).optional(),
  tags: z.string().nullable().optional(),
  dueDate: z.string().nullable().optional(),
});

export type TTtodoSchema = z.infer<typeof todoSchema>;
