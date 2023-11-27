import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";;
import {db} from "@/db/db";
import * as z from "zod"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextApiRequest } from "next";

// Define a Field schema for input validation

export async function GET(req: NextApiRequest, context : { params : {field_id : string}}) {
    try {
        // console.log(context.params.field_id);
        const field_id = context.params.field_id;
        if (!field_id || isNaN(Number(field_id))) {
            return NextResponse.json({ error: 'Invalid field_id' }, { status: 400 });
        }

        const field = await prisma.field.findFirst({
            where: {
                field_id: Number(field_id), // convert the id to a number
            },
        });

        if (!field) {
            return NextResponse.json({ error: 'Field not found' }, {status: 404});
        }

        return NextResponse.json(field, {status: 200});
    } catch (error: any) {
        console.error('Error fetching field:', error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

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

type Field = {
    field_id: number;
    field_name?: string;
    street?: string;
    city?: string;
    province?: string;
    postal_code?: number;
    image_url?: string;
    rate_per_hour?: number;
    operational_status?: string;
    owner_id?: number;
  };

export async function PUT(req: Request, context : { params : {field_id : string}}) {

    try {

        console.log(context.params.field_id);

        // auth
        const session = await getServerSession(authOptions)

        if (!session) throw Error()

        if (session.user.username !== "admin") {
            return NextResponse.json({field: null, message: "Forbidden"}, {status: 403})
        } 

        // Parse input
        const body = await req.json();
        const parsedField: Field = FieldSchema.parse(body);

        // Create a new object with the field_id from the context
        const field: Field = {
            ...parsedField,
            field_id: parseInt(context.params.field_id)
        };

        // Check for field in db
        const existingFieldById = await db.field.findUnique({
            where: {field_id: field.field_id }
        })

        if (existingFieldById === null) {
            return NextResponse.json({ field: null, message: "This field does not exist" }, { status: 404 })
        }

        const checked_field_name = (field.field_name ?? existingFieldById.field_name)
        const checked_street = (field.street ?? existingFieldById.street)
        const checked_city = (field.city ?? existingFieldById.city)
        const checked_province = (field.province  ??  existingFieldById.province)
        const checked_postal_code = (field.postal_code ??  existingFieldById.postal_code)
        const checked_image_url = (field.image_url  ??  existingFieldById.image_url)
        const checked_rate_per_hour = (field.rate_per_hour  ??  existingFieldById.rate_per_hour)
        const checked_operational = (field.operational_status ??  existingFieldById.operational_status)

        // Update
        const updateField = await db.field.update({
            where: {
                field_id : field.field_id,
            },
            data: {
                field_name : checked_field_name === "" ? existingFieldById.field_name : checked_field_name,
                street : checked_street === "" ? existingFieldById.street : checked_street,
                city : checked_city === "" ? existingFieldById.city : checked_city,
                province : checked_province === "" ? existingFieldById.province : checked_province,
                postal_code : checked_postal_code === 0 ? existingFieldById.postal_code : checked_postal_code,
                image_url : checked_image_url === "" ? existingFieldById.image_url : checked_image_url,
                rate_per_hour : checked_rate_per_hour === 0 ? existingFieldById.rate_per_hour : checked_rate_per_hour,
                operational_status : checked_operational === "" ? existingFieldById.operational_status : checked_operational
            },
        })

        return NextResponse.json({field: updateField, message: "Field updated successfully"}, {status : 200});

    } catch (error) {
        console.error("Error", error)
        return new Response("An error occurred", { status: 500 });
    }

}

export async function DELETE(req: Request, context : { params : {field_id : string}}) {

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

        // Delete
        const deleteUser = await db.field.delete({
            where: {
              field_id: field_id,
            },
          })

        return NextResponse.json({field: existingFieldById, message: "Field deleted successfully"}, {status : 200});

    } catch (error) {
        console.error("Error", error)
        return new Response("An error occurred", { status: 500 });
    }

}
