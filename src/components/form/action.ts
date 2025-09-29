"use server";

import type { FormFields } from "./validateFormIFields";

export async function sendMail(formFields: FormFields) {
   const bodyData = {
      subject: "New Project Requests From " + formFields.name,
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      ...formFields,
   };

   try {
      const result = await fetch(process.env.MAIL_URL, {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.JWT_TOKEN}`,
         },
         method: "POST",
         body: JSON.stringify(bodyData),
      });
      const response = await result.json();
      return {
         status: response.status as string,
         message: response.message as string,
      };
   } catch (error) {
      console.error(error);
      return {
         status: "error",
         // @ts-expect-error error is an unkown type
         message: error.message as string,
      };
   }
}
