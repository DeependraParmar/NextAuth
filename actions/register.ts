"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma"; 
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

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

    try{
        await signIn('credentials', { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT});
    }
    catch(error){
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials !" }

                default:
                    return { error: 'Something went wrong !' }
            }
        }
        console.log("Throwing error: ", error);
        throw error;
    }

    return { success: "Registered Successfully" }
}