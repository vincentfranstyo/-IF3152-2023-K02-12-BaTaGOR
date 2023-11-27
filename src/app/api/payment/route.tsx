import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        
        // if (!session) throw Error()

        //subquery for getting current user id by username
        const booker = await db.user.findFirst({
            where : { username : session?.user.username}
        })

        const booker_id = Number(booker?.user_id);
        const body = await req.json();

        // writing data to database
        const booking = await db.booking.create({
            data: {
                duration_minute: body.duration_minute,
                start_time: body.start_time,
                booking_date: body.booking_date,
                total_price: body.total_price,
                field_id: body.field_id,
                user_id: booker_id
            }
        }
        )

        // getting staff id that is in charge of the selected field
        const staff = await db.staff.findFirst({
            where : { field_id : body.field_id }
        })
        const staff_id = Number(staff?.user_id);

        // writing data to database
        const manage_booking = await db.manage_booking.create({
            data: {
                staff_id: staff_id,
                booking_id: booking.booking_id
            }
        })

        db.$disconnect();
        return NextResponse.json('Booking Complete', { status: 200 });
    } catch (error) {
        console.log(error)
        return new NextResponse('Something went wrong', { status: 400 });
    }
}