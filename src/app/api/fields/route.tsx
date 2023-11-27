import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/lib/utils";
import {NextResponse} from "next/server";
import {field} from "@/types/models";

export async function GET() {
    try {
        const fields = await prisma.field.findMany({
            orderBy: {
                field_id: 'asc',
            },
        });
        return NextResponse.json(fields, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching fields:', error.message);
        return NextResponse.json("Internal Server Error", { status: 500})
    } finally {
        await prisma.$disconnect();
    }
}

