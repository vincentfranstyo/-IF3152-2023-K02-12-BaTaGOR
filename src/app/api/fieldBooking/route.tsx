import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextApiRequest } from "next";

export async function PUT(req: Request, context : { params : {booking_id: string}}) {
    try {
        const session = await getServerSession(authOptions)
        
        // if (!session) throw Error()

        let booking;

        const userAccessLevel = session?.user.access_level;
        const userID = session?.user.id;

        const body = await req.json();

        if (userAccessLevel === 'Customer') {
            booking = await db.booking.update({
                where : { booking_id: body.booking_id },
                data: {
                    duration_minute: body.duration_minute,
                    start_time: body.start_time,
                    booking_date: body.booking_date,
                    total_price: body.total_price,
                    field_id: body.field_id,
                    user_id: userID
                }
            })
        }

        else if (userAccessLevel === 'Staff') {
            booking = await db.booking.update({
                where : { booking_id: body.booking_id },
                data: {
                    duration_minute: body.duration_minute,
                    start_time: body.start_time,
                    booking_date: body.booking_date,
                    total_price: body.total_price,
                    field_id: body.field_id,
                    user_id: userID
                }
            })
        } else {
            
        }

        db.$disconnect();
        return NextResponse.json('Booking Updated', { status: 200 });
    } catch (error) {
        console.log(error)
        return new NextResponse('Something went wrong', { status: 400 });
    }
}

export async function DELETE(req: Request, context : { params : {booking_id : string}}) {
    try {
        const session = await getServerSession(authOptions)
        
        // if (!session) throw Error()

        //subquery for getting current user id by username
        const booker = await db.user.findFirst({
            where : { username : session?.user.username}
        })

        const booker_id = Number(booker?.user_id);
        const bookingID = Number(context.params.booking_id);

        const booking = db.booking.delete({
            where : { booking_id : bookingID }
        })

        db.$disconnect();
        return NextResponse.json('Booking Deleted', { status: 200 });
    } catch (error) {
        console.log(error)
        return new NextResponse('Something went wrong', { status: 400 });
    }
}