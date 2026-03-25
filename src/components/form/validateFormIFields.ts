import { z } from "zod";

const schema = z.object({
   name: z
      .string({
         error: "Invalid name input",
      })
      .min(3)
      .regex(/^[a-zA-Z\s]+$/, {
         error: "Invalid name",
      }),
   email: z.email({
      error: "Invalid email address",
   }),
   phone: z.string({
      error: "Invalid phone number",
   }),
   message: z
      .string({
         error: "Invalid message",
      })
      .min(10),
   leadSource: z.string().optional(),
});
export const validate = (formData: FormData) => {
   const validatedFields = schema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      leadSource: formData.get("leadSource"),
   });

   return validatedFields;
};

export type FormFields = z.infer<typeof schema>;
