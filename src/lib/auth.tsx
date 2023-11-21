import CredentialsProvider from "next-auth/providers/credentials";
import {NextAuthOptions} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import {db} from "../db/db"
import {hash, compare} from "bcrypt";

export const authOptions: NextAuthOptions = {
    // adapter for using prisma
    adapter:PrismaAdapter(db),
    secret: process.env.NEXTAUH_SECRET,

    // session provider
    session:{
        strategy: "jwt"
    },

    // page redirection
    pages: {
        signIn: "/auth/SignIn"  // routes you to the sign in form
    }, 

    // providers, can be filled with Discord, Google, etc
    providers: [
        CredentialsProvider({
          name: "Your BaTaGOR Account",

          credentials: {
            username: { label: "Username", type: "text", placeholder: "Enter your username" },
            password: { label: "Password", type: "password" }
          },

          async authorize(credentials) {
            if(!credentials?.username || !credentials?.password){
                return null;    // null if either or both slots are empty
            }
            
            const existingUser = await db.user.findUnique({
                where: {username: credentials?.username}        // finds the matching user in the DB
            });

            if(!existingUser){
                return null;    // if the username is not found, return null
            }
            
            const passwordCheck = await compare(credentials.password, existingUser.hashed_pass)

            if(!passwordCheck){
                return null;
            }

            
            return{
                id: `existingUser.user_id`,
                username: existingUser.username,
                email: existingUser.email
            }
          }
        })
      ],
			
      callbacks:{
        async jwt({token, user}){
            if(user){
                return{
                    ...token,
                    username: user.username
                }
            }
            return token
        },

        async session({session, token}){
            return{
							...session,
							user:{
								...session.user,
								username: token.username
							}
						} 
        },
      }
}