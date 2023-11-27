import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextApiRequest } from "next";

export async function GET( req: NextApiRequest, context : {params : {field_id : string}} ) {
    try {
        const session = await getServerSession(authOptions)
        
        // if (!session) throw Error()

        // subquery for getting id by username
        const booker = await db.user.findFirst({
            where : { username : session?.user.username}
        })

        const field_id = Number(context.params.field_id);

        const bookings = await db.booking.findMany({
            where : { field_id:  field_id }
        })
        
        const formattedDateTimeBooking = bookings.map(booking => {
            const startTime = new Date(booking.start_time);
            const startTimeFormatted = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false})

            const bookingDate = new Date(booking.booking_date)
            const bookingDateFormatted = bookingDate.toLocaleDateString();

            return {
                ...booking,
                start_time: startTimeFormatted,
                booking_date: bookingDateFormatted,
            };
        });

        await db.$disconnect();
        return NextResponse.json(formattedDateTimeBooking);
    } catch (error) {
        console.error(error)
        return new NextResponse('Something went wrong', { status: 400 });
    }
}

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        
        if (!session) throw Error()

        //subquery for getting current user id by username
        const booker = await db.user.findFirst({
            where : { username : session.user.username}
        })

        const booker_id = Number(booker?.user_id);
        const body = await req.json();

        const booking = db.booking.update({
            where : { booking_id: body.booking_id },
            data: {
                duration_minute: body.duration_minute,
                start_time: body.start_time,
                booking_date: body.booking_date,
                total_price: body.total_price,
                field_id: body.field_id,
                user_id: booker_id
            }
        })

        db.$disconnect();
        return NextResponse.json('Booking Updated', { status: 200 });
    } catch (error) {
        console.log(error)
        return new NextResponse('Something went wrong', { status: 400 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        
        if (!session) throw Error()

        //subquery for getting current user id by username
        const booker = await db.user.findFirst({
            where : { username : session.user.username}
        })

        const booker_id = Number(booker?.user_id);
        const body = await req.json();

        const booking = db.booking.delete({
            where : { booking_id : body.booking_id }
        })

        db.$disconnect();
        return NextResponse.json('Booking Deleted', { status: 200 });
    } catch (error) {
        console.log(error)
        return new NextResponse('Something went wrong', { status: 400 });
    }
}