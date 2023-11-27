import NextAuth from "next-auth"
import {authOptions} from "@/lib/auth"

// authOptions is retrieved from lib
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}