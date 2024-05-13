'use server';
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async(values: z.infer<typeof LoginSchema>) => {
    const validadatedFields = LoginSchema.safeParse(values);

    if(!validadatedFields.success){
        return { error: "Invalid fields !"};
    }

    const { email, password } = validadatedFields.data;
    try{
        await signIn("credentials", { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT });
    }
    catch(error){
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return { error : "Invalid Credentials !"}
                default:
                    return { error: 'Something went wrong !'}
            }
        }
        console.log("Throwing error: ", error);
        throw error;
    }

    // return { success: "Logged-in successful"}
}