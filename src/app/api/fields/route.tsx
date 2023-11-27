import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/lib/utils";
import {NextResponse} from "next/server";

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

