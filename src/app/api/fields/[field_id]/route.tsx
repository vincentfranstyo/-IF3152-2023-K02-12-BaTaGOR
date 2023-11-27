import { NextApiRequest } from 'next';
import { prisma } from "@/lib/utils";
import {NextResponse} from "next/server";

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
