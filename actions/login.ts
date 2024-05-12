'use server';
import { LoginSchema } from "@/schemas";
import * as z from "zod";

export const login = async(values: z.infer<typeof LoginSchema>) => {
    const validadatedFields = await LoginSchema.safeParse(values);

    if(!validadatedFields.success){
        return { error: "Invalid fields !"};
    }

    return { success: "Email Sent" };
}