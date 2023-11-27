import { NextResponse } from "next/server";;
import {db} from "@/db/db";
import {hash} from "bcrypt";
import * as z from "zod"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";


export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
    const { name } = req.query;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: 'Invalid query parameter' });
    }

    const fields = await db.field.findMany({
        where: {
            field_name: {
                contains: name,
            mode: 'insensitive', // Case-insensitive search
            },
        },
    });

    return res.status(200).json(fields);
    } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
    }
}
