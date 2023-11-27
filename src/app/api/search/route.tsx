import { NextResponse } from "next/server";;
import {db} from "@/db/db";
import {hash} from "bcrypt";
import * as z from "zod"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";


export default async function GET(req: Request, context : { params : {name : string}}) {
    try {
    if (context.params.name || typeof context.params.name !== 'string') {
        return new Response("Invalid paramter", {status: 400});
    }

    const fields = await db.field.findMany({
        where: {
            field_name: {
                contains: context.params.name,
            mode: 'insensitive', 
            },
        },
    });
    return NextResponse.json(fields);
    }
    catch (error) {
    console.error(error);
    return new Response("An error occurred", {status: 500});
    }
    
}
