import { NextResponse } from "next/server";;
import {db} from "@/db/db";
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

export async function GET(req: Request) {

    try {

        // auth
        /* const session = await getServerSession(authOptions)

        if (!session) throw Error()

        if (session.user.username !== "admin") {
            return NextResponse.json({field: null, message: "Forbidden"}, {status: 403})
        } */

        // Aggregate total income
        const field_incomes = await db.booking.groupBy({
            by: ["field_id"],
            _sum : {
                total_price: true
            },
            orderBy : {
                field_id : 'asc'
            }
        })

        const field_names = await db.field.findMany({
            select: {
                field_id: true,
                field_name: true
            },
            orderBy: {
                field_id : 'asc'
            }
        })

        const join = field_names.map(nameObj => {
            const incomeObj = field_incomes.find(s => s.field_id === nameObj.field_id);
            return {
                field_id: nameObj.field_id,
                field_name: nameObj.field_name,
                field_income: incomeObj ? incomeObj._sum.total_price : 0 
            };
        });

        return NextResponse.json({fields_incomes : join},{status : 200})

    } catch (error) {
        console.error("Error", error)
        return new Response("An error occurred", { status: 500 });
    }

}