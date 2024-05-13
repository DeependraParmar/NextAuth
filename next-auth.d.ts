import { UserRole } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

type ExtendedUser = DefaultSession["user"] & {
    role: UserRole
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}