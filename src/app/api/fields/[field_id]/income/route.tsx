import { NextResponse } from "next/server";;
import {db} from "@/db/db";
import {hash} from "bcrypt";
import * as z from "zod"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextApiRequest } from "next";

const FieldSchema = z
.object({
    field_id: z.number().int().min(1, "ID is required"),
    field_name: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
    postal_code: z.number().int().optional(),
    image_url: z.string().optional(),
    rate_per_hour: z.number().int().optional(),
    operational_status: z.string().optional(),
    owner_id: z.number().int().optional(),
})

export async function GET(req: Request, context : { params : {field_id : string}}) {

    try {

        // auth
        const session = await getServerSession(authOptions)

        if (!session) throw Error()

        if (session.user.username !== "admin") {
            return NextResponse.json({field: null, message: "Forbidden"}, {status: 403})
        }

        // Parse input
        const field_id = parseInt(context.params.field_id)

        // Check for field in db
        const existingFieldById = await db.field.findUnique({
            where: {field_id: field_id }
        })

        if (existingFieldById === null) {
            return NextResponse.json({ field: null, message: "This field does not exist" }, { status: 404 })
        }

        // Aggregate total income
        const total_income = await db.booking.aggregate({
            _sum : {
                total_price: true
            },
            where: {
                field_id: {
                    equals: field_id
                }
            }
        })

        return NextResponse.json({field_id : field_id, total_income : total_income},{status : 200})

    } catch (error) {
        console.error("Error", error)
        return new Response("An error occurred", { status: 500 });
    }

}