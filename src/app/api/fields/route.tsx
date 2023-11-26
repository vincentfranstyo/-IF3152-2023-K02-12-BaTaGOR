import { NextResponse } from "next/server";;
import {db} from "@/db/db";
import {hash} from "bcrypt";
import * as z from "zod"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Define a Field schema for input validation

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

export async function PUT(req: Request) {

    try {

        // auth
        const session = await getServerSession(authOptions)

        if (!session) throw Error()

        if (session.user.username !== "admin") {
            return NextResponse.json({field: null, message: "Forbidden"}, {status: 403})
        }

        // Parse input
        const body = await req.json();
        const { field_id, field_name, street, city, province, postal_code, image_url, rate_per_hour, operational_status, owner_id } : 
        { field_id : number, field_name? : string, street? : string, city? : string, province? : string, postal_code? : number, image_url? : string, rate_per_hour? : number, operational_status? : string, owner_id? : number}
        = FieldSchema.parse(body)

        // Check for field in db
        const existingFieldById = await db.field.findUnique({
            where: {field_id: field_id }
        })

        if (existingFieldById === null) {
            return NextResponse.json({ field: null, message: "This field does not exist" }, { status: 404 })
        }

        // Update
        const updateField = await db.field.update({
            where: {
                field_id : field_id,
            },
            data: {
                field_name : field_name ?? existingFieldById.field_name,
                street : street ?? existingFieldById.street,
                city : city ?? existingFieldById.city,
                province : province  ??  existingFieldById.province,
                postal_code : postal_code ??  existingFieldById.postal_code,
                image_url : image_url  ??  existingFieldById.image_url,
                rate_per_hour : rate_per_hour  ??  existingFieldById.rate_per_hour,
                operational_status : operational_status ??  existingFieldById.operational_status,
                owner_id : owner_id  ??  existingFieldById.owner_id
            },
        })

        return NextResponse.json({field: updateField, message: "Field updated successfully"}, {status : 201});

    } catch (error) {
        console.error("Error", error)
        return new Response("An error occurred", { status: 500 });
    }

}

export async function DELETE(req: Request) {

    try {

        // auth
        const session = await getServerSession(authOptions)

        if (!session) throw Error()

        if (session.user.username !== "admin") {
            return NextResponse.json({field: null, message: "Forbidden"}, {status: 403})
        }

        // Parse input
        const body = await req.json();
        const { field_id } : 
        { field_id : number }
        = FieldSchema.parse(body)

        // Check for field in db
        const existingFieldById = await db.field.findUnique({
            where: {field_id: field_id }
        })

        if (existingFieldById === null) {
            return NextResponse.json({ field: null, message: "This field does not exist" }, { status: 404 })
        }

        // Delete
        const deleteUser = await db.field.delete({
            where: {
              field_id: field_id,
            },
          })

        return NextResponse.json({field: existingFieldById, message: "Field updated successfully"}, {status : 201});

    } catch (error) {
        console.error("Error", error)
        return new Response("An error occurred", { status: 500 });
    }

}

