"use client";
import React from "react";
import {PrismaClient} from "@prisma/client";
import {field, history, booking} from "@/types/models";
import History from "@/components/History";
import {useSession} from "next-auth/react";

const prisma = new PrismaClient();

const HistoryPage: React.FC = () => {
    const {data: session} = useSession();
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

    return (
        <section className="w-full flex-start flex-col mx-16">
            {session?.user.access_level === "customer" && (
                <History histories={histories}/>
            )}

            {session?.user.access_level === "staff" && (
                <History histories={histories}/>
            )}
        </section>
    );
}

export default HistoryPage;