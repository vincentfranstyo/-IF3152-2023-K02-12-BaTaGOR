import { NextResponse } from "next/server";;
import {db} from "@/db/db";
import {hash} from "bcrypt";
import * as z from "zod"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Define a User schema for validation

const FieldSchema = z
.object({
    user_id: z.number().int().optional(),
    access_level: z.string().min(1, "Access level must be valid")
})

export async function GET(req: Request) {

    try {

        // auth
        const session = await getServerSession(authOptions)

        if (!session) throw Error()

        if (session.user.username !== "admin") {
            return NextResponse.json({field: null, message: "Forbidden"}, {status: 403})
        }


        // Check for field in db
        const existingFieldById = await db.field.findUnique({
            where: {field_id: field_id }
        })

        if (existingFieldById === null) {
            return NextResponse.json({ field: null, message: "This field does not exist" }, { status: 404 })
        }

        return NextResponse.json({field: getHistory, message: "Field updated successfully"}, {status : 201});

    } catch (error) {
        console.error("Error", error)
        return new Response("An error occurred", { status: 500 });
    }

}
