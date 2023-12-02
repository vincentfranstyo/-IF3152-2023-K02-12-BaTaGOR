import {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from "@/lib/utils";
import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {db} from "@/db/db"
import * as z from "zod"

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const fields = await prisma.field.findMany({
            orderBy: {
                field_id: 'asc',
            },
        });
        // console.log('Fetched Fields:', fields);
        return NextResponse.json(fields, {status: 200});
    } catch (error: any) {
        console.error('Error fetching fields:', error.message);
        return NextResponse.json('Internal Server Error' , {status: 500});
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


type Field = {
    field_id: number;
    field_name: string;
    street: string;
    city: string;
    province: string;
    postal_code: number;
    image_url: string;
    rate_per_hour: number;
    operational_status: string;
    owner_id: number;
};


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsedField: Field = FieldSchema.parse(body);

        // Create a new object with the field_id from the context
        const field = await db.field.create({
            data: {
                ...parsedField
            },
        });

        return NextResponse.json({field: field, message: "Field created successfully"}, {status: 200});

    } catch (error) {
        console.error("Error", error)
        return new Response("An error occurred", {status: 500});
    }
}
