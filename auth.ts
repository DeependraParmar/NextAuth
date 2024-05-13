import NextAuth, { type DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";

export const {
    handlers: { GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        async jwt({ token }){
            if(!token.sub){
                return token;
            }
            const existingUser = await getUserById(token.sub);
            if(!existingUser)
                return token;

            token.role = existingUser.role;
            return token;
        },
        async session({token, session}){
            if(token.sub && session.user){
                session.user.id = token.sub;
            }
            if(token.role && session.user){
                session.user.role = token.role as UserRole;
            }
            return session;
        },
        async signIn({user, account}){
            if(account?.provider !== 'credentials') return true;
            const existingUser = await getUserById(user?.id);
            
            if(!existingUser?.emailVerified) return false;

            // TODO: Add 2FA check

            return true;
        }
    },
    events: {
        async linkAccount({user}){
            await prisma.user.update({
                where: {id: user.id},
                data: { emailVerified: new Date()}
            });
        }
    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },  
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt"},
    ...authConfig,
});