import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/lib/utils";
import {NextResponse} from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {db} from "@/db/db";
import {hash} from "bcrypt";
import * as z from "zod"


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

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const fields = await prisma.field.findMany({
            orderBy: {
                field_id: 'asc',
            },
        });
        // console.log('Fetched Fields:', fields);
        return NextResponse.json(fields, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching fields:', error.message);
        NextResponse.json('Internal Server Error', {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

const FieldSchema = z.object({
    field_id: z.number().min(1, "ID is required"),
    field_name: z.string(),
    street: z.string(),
    city: z.string(),
    province: z.string(),
    postal_code: z.number(),
    image_url: z.string(),
    rate_per_hour: z.number(),
    operational_status: z.string(),
    owner_id: z.number()
});

export async function POST(req: Request) {

    try {


        // auth
        const session = await getServerSession(authOptions)

        //if (!session) throw Error()

        // Parse input
        const body = await req.json();
        const parsedField: Field = FieldSchema.parse(body);

        // Create a new object with the field_id from the context
        const field: Field = {
            ...parsedField,
            field_id: parseInt(body.field_id)
        };
        const ID = parseInt(body.field_id);
        // createKosong
        const newField = await db.field.create({
            data: {
                field_id : ID,
                field_name : "",
                street : "",
                city : "",
                province : "" ,
                postal_code : 0,
                image_url : "",
                rate_per_hour : 0,
                operational_status : "operational",
                owner_id : 6
            },
        })

        // Check for field in db
        const existingFieldById = await db.field.findUnique({
            where: {field_id: field.field_id }
        })

        if (existingFieldById === null) {
            return NextResponse.json({ field: null, message: "This field does not exist" }, { status: 404 })
        }

        // Update
        const updateField = await db.field.update({
            where: {
                field_id : field.field_id,
            },
            data: {
                field_name : field.field_name ?? existingFieldById.field_name,
                street : field.street ?? existingFieldById.street,
                city : field.city ?? existingFieldById.city,
                province : field.province  ??  existingFieldById.province,
                postal_code : field.postal_code ??  existingFieldById.postal_code,
                image_url : field.image_url  ??  existingFieldById.image_url,
                rate_per_hour : field.rate_per_hour  ??  existingFieldById.rate_per_hour,
                operational_status : field.operational_status ??  existingFieldById.operational_status,
                owner_id : field.owner_id  ??  existingFieldById.owner_id
            },
        })

        return NextResponse.json({field: updateField, message: "Field created successfully"}, {status : 200});

    } catch (error) {
        console.error("Error", error)
        return new Response("An error occurred", { status: 500 });
    }

}