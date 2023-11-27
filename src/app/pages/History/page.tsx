"use client";
import React from "react";
import {getServerSession} from "next-auth"
import {authOptions} from "@/lib/auth"
import {PrismaClient} from "@prisma/client";
import {field, history, booking} from "@/types/models";
import History from "@/components/History";

const prisma = new PrismaClient();

export async function users() {
    const users = await prisma.user.findMany();
    await prisma.$disconnect();
    return {props: {users}};
}


const HistoryPage: React.FC = () => {
    const histories: history[] = [
        {
            history_id: 1,
            booking_id: 1,
            field_id: 1,
            field_name: 'OBC Futsal',
            start_time: '09.00',
            date: 'Minggu, 1 Oktober 2023',
            price: 100000,
            duration_minutes: 120
        },
        {
            history_id: 2,
            booking_id: 2,
            field_id: 1,
            field_name: 'OBC Futsal',
            start_time: '09.00',
            date: 'Minggu, 1 Oktober 2023',
            price: 100000,
            duration_minutes: 120
        },
        {
            history_id: 3,
            booking_id: 2,
            field_id: 1,
            field_name: 'OBC Futsal',
            start_time: '09.00',
            date: 'Minggu, 1 Oktober 2023',
            price: 100000,
            duration_minutes: 120
        }
    ]
    const fields: (field[]) = [
        {
            field_id: 1,
            field_name: "VF's Fields",
            street: "Jalan Tubagus Ismail Raya No.23",
            city: "Bandung",
            province: "Jawa Barat",
            postal_code: 42330,
            image_url: "/assets/images/futsal_placeholder_1.jpg",
            rate_per_hour: 10000,
            operational_status: "available",
            owner_id: 6
        },
        {
            field_id: 2,
            field_name: "Duke of Gawangan",
            street: "Jalan Ciheulang Baru No.12",
            city: "Bandung",
            province: "Jawa Barat",
            postal_code: 45331,
            image_url: "/assets/images/futsal_placeholder_2.jpg",
            rate_per_hour: 12000,
            operational_status: "available",
            owner_id: 6
        },
        {
            field_id: 3,
            field_name: "Farhan Algani GOR",
            street: "Jalan Cisitu Lama XVII No. 49",
            city: "Bandung",
            province: "Jawa Barat",
            postal_code: 42348,
            image_url: "/assets/images/futsal_placeholder_2.jpg",
            rate_per_hour: 15000,
            operational_status: "available",
            owner_id: 6
        },
    ]
    const booking: booking[] = [
        {
            booking_id: 1,
            duration_minute: 120,
            start_time: "16:55:30",
            date: "2023-10-29",
            total_price: 110000,
            field_id: 1,
            user_id: 8
        }
    ]

    return (
        <>
            <section className="w-full flex-start flex-col mx-16">
                <History histories={histories} userRole={"customer"} />
            </section>
        </>
    )
}

export default HistoryPage;