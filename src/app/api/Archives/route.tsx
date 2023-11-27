import { NextResponse } from "next/server";;
import {db} from "@/db/db";
import {hash} from "bcrypt";
import * as z from "zod"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextApiRequest } from "next";


type Archives = {
    history_id: number,
    booking_id: number,
    field_id: number,
    field_name: string,
    start_time: string,
    date: string,
    price: number,
    duration_minutes: number
    };

export async function GET() {
    try {
    const session = await getServerSession();

    if (!session) throw new Error();

    const userAccessLevel = session.user.access_level;
    const ID = parseInt(session.user.id,10);
    
    let history;
    
    if (userAccessLevel === 'Customer') {
        history = await db.booking.findMany({
        include: {
            archives : true
        },
        where: {
            user_id : ID
        }
        });


    } else if (userAccessLevel === 'Staff') {
        const IDFieldStaff = await db.staff.findFirst({
    where: {
    user_id: ID,
    },
    })
    .then((staff) => staff?.field_id || null);

    // Menggunakan field_id dalam query archives
    history = await db.booking.findMany({
    include: {
    archives: true,
        },
    where: {
        field_id: IDFieldStaff ?? undefined,
    },
    });

    } else if (userAccessLevel === 'owner') {
        history = await db.booking.findMany({
            include: {
                archives : true
            },
        });

    } else {
        return new NextResponse('Unauthorized', { status: 403 });
    }

    return NextResponse.json(history);

    } catch (error) {
        console.error(error);
        return new NextResponse('Terjadi kesalahan', { status: 500 });
    }
}
