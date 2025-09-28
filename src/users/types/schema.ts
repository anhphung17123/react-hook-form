import { z } from "zod";
import { patterns } from "../../constants";

export const schema = z.object({
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
});

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  name: "",
  email: "",
  states: [],
  languagesSpoken: [],
  gender: "",
  skills: [],
  registration: new Date(),
};
