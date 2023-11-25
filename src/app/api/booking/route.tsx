import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        
        if (!session) throw Error()

        //subquery for getting id by username
        const booker = await db.user.findFirst({
            where : { username : session?.user.username}
        })

        const bookings = await db.booking.findMany({
            where : { user_id: booker?.user_id },
            orderBy : { booking_id: "desc" }
        })

        await db.$disconnect();
        return NextResponse.json(bookings);
    } catch (error) {
        console.log(error)
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