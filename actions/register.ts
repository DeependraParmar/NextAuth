"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma"; 
import { getUserByEmail } from "@/data/user";

export const register = async(values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = await RegisterSchema.safeParse(values);
    
    if(!validatedFields.success){
        return { error: "Invalid Credentials !!" }
    }

    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);

    if(existingUser)
        return { error: 'Email already exists !'}

    await prisma.user.create({
        data: {
            name, email, password: hashedPassword
        }
    });

    // Todo: Send the verification mail here 

    return { success: "Registered Successfully" }
}