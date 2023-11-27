import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextApiRequest } from "next";

export async function GET( req: NextApiRequest, context : {params : {user_id : string}} ) {
    try {
        const session = await getServerSession(authOptions)
        
        // if (!session) throw Error()

        // subquery for getting id by username
        const userData = await db.user.findFirst({
            where : { user_id : Number(context.params.user_id) }
        })

        const userAccessLevel = userData?.access_level;
        const ID = userData?.user_id;
        let bookings;

        if (userAccessLevel === 'Customer') {
            bookings = await db.booking.findMany({
                where : { user_id: ID }
            })
        } else if (userAccessLevel === 'Staff') {
            const staffID = await db.staff.findFirst({
                where : { user_id : Number(ID) }
            })
            bookings = await db.booking.findMany({
                where : { field_id: staffID?.field_id }
            })
        }
        else {

        }
        
        const formattedDateTimeBooking = bookings?.map(booking => {
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