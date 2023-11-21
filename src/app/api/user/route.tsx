import { NextResponse } from "next/server";;
import {db} from "@/db/db";
import {hash} from "bcrypt";
import * as z from "zod"

// Define a user schema for input validation
const UserSchema = z
.object({
  username: z.string().min(1, "Username is required").max(30),
  name: z.string(),
  phone_num: z.string(),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  unhashed_pass: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters long"),
  access_level: z.string().min(1, "Access level must be valid")
})

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, name, phone_num, email, unhashed_pass, access_level }: 
        { username: string, name: string, phone_num: string, email: string, unhashed_pass: string,  access_level: string}
         = UserSchema.parse(body);   // to have user schema validation

        // check if the username already exists
        const existingUserByUsername = await db.user.findUnique({
            where: { username: username }
        });

        if (existingUserByUsername !== null) {
            return NextResponse.json({ user: null, message: "This username has already been registered" }, { status: 409 });
        }

        // hashing the password
        const hashed_pass = await hash(unhashed_pass, 10);

        const newUser = await db.user.create({
            data:{
                username, name, phone_num, email, hashed_pass, access_level
            }
        })
        
        //removes the hashed pass from the return value, security reasons
        const { hashed_pass: newUserPassword, ...restOfUser } = newUser

        return NextResponse.json({user:  restOfUser , message: "User created successfully"}, {status: 201});

    } catch (error) {
        console.error("Error", error)
        return new Response("An error occurred", { status: 500 });
    }
}