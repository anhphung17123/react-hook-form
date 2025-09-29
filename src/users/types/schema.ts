import { z } from "zod";
import { patterns } from "../../constants";

export const schema = z.intersection(
  z.object({
    name: z.string().min(1, { message: "Required" }),
    email: z
      .string()
      .min(1, { message: "Required" })
      .refine((text) => patterns.email.test(text), {
        message: "Email is not valid",
      }),
    states: z
      .array(z.string())
      .min(1, { message: "Select at least one state" })
      .max(2, { message: "Select at most two states" }),
    languagesSpoken: z
      .array(z.string())
      .min(1, { message: "Select at least one language" }),
    gender: z.string().min(1, { message: "Select a gender" }),
    skills: z
      .array(z.string())
      .min(1, { message: "Select at least one skill" })
      .max(3, { message: "Select at most three skills" }),
    registration: z.date(),
    formerPeriod: z.array(z.date()).min(2).max(2),
    salaryRange: z.array(z.number()).min(2).max(2),
  }),
  z
    .discriminatedUnion("variant", [
      z.object({ variant: z.literal("create") }),
      z.object({ variant: z.literal("edit"), id: z.string().min(1) }),
    ])
    .and(
      z.union([
        z.object({ isTeacher: z.literal(false) }),
        z.object({
          isTeacher: z.literal(true),
          student: z.array(
            z.object({
              name: z.string().min(4, { message: "Required" }),
            })
          ),
        }),
      ])
    )
);

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  variant: "create",
  name: "",
  email: "",
  states: [],
  languagesSpoken: [],
  gender: "",
  skills: [],
  registration: new Date(),
  formerPeriod: [new Date(), new Date()],
  salaryRange: [0, 70000],
  isTeacher: false,
};
