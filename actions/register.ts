"use server";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/tokens";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

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

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Verification Mail Sent!" }
}