import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request ) {
    try {

        const session = await getServerSession(authOptions)
        if (!session) throw Error()

        //subquery for getting current user id by username
        const userData = await db.user.findFirst({
            where : { username : session.user.username}
        })

        const ID = Number(userData?.user_id);
        const userAccessLevel  = userData?.access_level;

        /* const ID = 7;
        const userAccessLevel  = "Customer"; */
        
        const body = await req.json();

        if (1 == 1) {
        // writing data to database

        const WAKTU = body.start_time;
        const [hours, minutes] = WAKTU.split(':').map(Number);

    // Create a new Date object with the current date and extracted hours and minutes
    const currentTime = new Date();
    currentTime.setHours(hours);
    currentTime.setMinutes(minutes);

    // Convert the Date object to ISO-8601 format
    const isoTimeString = currentTime.toISOString();

    const bookingDate = body.booking_date;
    const isoBookingDate = new Date(bookingDate).toISOString();

        const updateBooking = await db.booking.create({
            data: {
                duration_minute: body.duration_minute,
                start_time: isoTimeString,
                booking_date: isoBookingDate,
                total_price: body.total_price,
                field_id: body.field_id,
                user_id: ID
            }
        }
        )
        return NextResponse.json({booking: updateBooking, message: "Booking created successfully"}, {status : 200});

    } else if (userAccessLevel === "Staff") {
        /* const IDFieldStaff = await db.staff.findFirst({
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
    }); */



    }
    } catch (error) {
        console.log(error)
        return new NextResponse('Something went wrong', { status: 400 });
    }
}