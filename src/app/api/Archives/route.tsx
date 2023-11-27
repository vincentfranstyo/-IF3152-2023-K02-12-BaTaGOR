import { NextResponse } from "next/server";;
import {db} from "@/db/db";
import {hash} from "bcrypt";
import * as z from "zod"
import { useSession } from "next-auth/react";
import { authOptions } from "@/lib/auth";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";


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
    const session = await getServerSession(authOptions)

    //if (!session) throw new Error();
    const userData = await db.user.findFirst({
        where: {
        username : session?.user.username
        }
        })
    /* const userData = {
        "user_id": 8,
        "username": "gigi",
        "name": "gigigigi",
        "phone_num": "08123456789",
        "email": "a@gmail.com",
        "hashed_pass": "$2b$10$R04df8Rvtx8eKbvR3jg4gOQ.966zcZ3kjG8h58LgR9a5vJ5P4W4TK",
        "access_level": "Customer"
    } */

    const userAccessLevel  = userData?.access_level;
    const ID = userData?.user_id;
    let history;
    
    if (userAccessLevel === "Customer") {
        history = await db.booking.findMany({
        where: {
            user_id : Number(ID)
        }
        });


    } else if (userAccessLevel === "Staff") {
        const IDFieldStaff = await db.staff.findFirst({
    where: {
    user_id: Number(ID),
    },
    })
    .then((staff) => staff?.field_id || null);

    // Menggunakan field_id dalam query archives
    history = await db.booking.findMany({
    where: {
        field_id: IDFieldStaff ?? undefined,
    },
    });

    } else if (userAccessLevel === "Owner") {
        history = await db.booking.findMany({
        });

    } else {
        return new NextResponse('Unauthorized', { status: 403 });
    }
    const formattedHistoryData = history.map(booking => {
        // Mengubah start_time
        const startTime = new Date(booking.start_time);
        const startTimeFormatted = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',hour12: false });

        // Mengubah booking_date
        const bookingDate = new Date(booking.booking_date);
        const bookingDateFormatted = bookingDate.toLocaleDateString();

        // Mengembalikan objek dengan format yang diubah
        return {
        ...booking,
        start_time: startTimeFormatted,
        booking_date: bookingDateFormatted,
        };
    });


    return NextResponse.json(formattedHistoryData);

    } catch (error) {
        console.error(error);
        return new NextResponse('Terjadi kesalahan', { status: 500 });
    }
}
