import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/lib/utils";
import {NextResponse} from "next/server";
import {field} from "@/types/models";

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
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
}

