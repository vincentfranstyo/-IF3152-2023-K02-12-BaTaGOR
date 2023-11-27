import NextAuth from "next-auth";

// used in lib/auth for session provision
declare module "next-auth"{
    interface User{
        username: string
        access_level: string
    }
    interface Session{
        user: User & {
            username: string
        }
        token:{
            username: string
        }
    }
}