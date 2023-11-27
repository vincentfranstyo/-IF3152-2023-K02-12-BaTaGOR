"use client";
import React, { useEffect, useState } from "react";
import {booking, field, schedule, days} from "@/types/models";
import Image from "next/image";
import FieldBook from "@/components/FieldBook";
import FieldDesc from "@/components/FieldDesc";

interface FieldBookProps {
    params : {
        id: string
    }
}

const currentDate: Date = new Date();
const currentMonth: string = currentDate.toLocaleString('en-US', { month: 'long' });
const currentYear: number = currentDate.getFullYear();

const FieldOrder: React.FC<FieldBookProps> = ( {params}: {params: {id: string}} ) => {
    const [bookings, setBookings] = useState<booking[]>([]);

    const id = params.id;
    // console.log(id);

    const [field, setField] = useState<field>();

    const generatedDays: days[] = [];

    useEffect(() => {
        fetch(`/api/fields/${id}`)
            .then(response => {
                // console.log('API response:', response);
                return response.json();
            })
            .then(data => {
                // console.log('API data:', data);
                setField(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

            const today = new Date();
            const twoWeeksLater = new Date();
            twoWeeksLater.setDate(today.getDate() + 13);
    
            for (let date = new Date(today); date <= twoWeeksLater; date.setDate(date.getDate() + 1)) {
                const formattedDate = date.getDate();
                const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
    
                console.log(formattedDate.toString())
    
                generatedDays.push({ date: formattedDate.toString(), day: dayOfWeek });
            }

            getBookings(params.id)
    }, [id]);

    const scheds: schedule[] = [
        {
            id: 1,
            time: "08.00",
            disabled: 1
        },
        {
            id: 2,
            time: "09.00",
            disabled: 0
        },
        {
            id: 3,
            time: "10.00",
            disabled: 0
        },
        {
            id: 4,
            time: "11.00",
            disabled: 0
        },
        {
            id: 5,
            time: "12.00",
            disabled: 0
        },
        {
            id: 6,
            time: "13.00",
            disabled: 0
        },
        {
            id: 7,
            time: "14.00",
            disabled: 0
        },
        {
            id: 8,
            time: "15.00",
            disabled: 0
        },
        {
            id: 9,
            time: "16.00",
            disabled: 0
        },
        {
            id: 10,
            time: "17.00",
            disabled: 0
        },
        {
            id: 11,
            time: "18.00",
            disabled: 0
        },
        {
            id: 12,
            time: "19.00",
            disabled: 0
        },
        {
            id: 13,
            time: "20.00",
            disabled: 0
        },
        {
            id: 14,
            time: "21.00",
            disabled: 0
        },
        {
            id: 15,
            time: "22.00",
            disabled: 0
        },
    ]
    
    // console.log(id);
    const getBookings = async (id: string) => {
        try {
            const response = await fetch(`/api/booking/${id}`);
            const result = await response.json();
            console.log(result);
            setBookings(result);
        } catch (error) {
            console.error('Something went wrong?', { autoClose: 3000 })
        }
    }

    // useEffect(() => {
    //     getBookings(params.id)
    // },[params.id])

    
    // useEffect(() => {
    //     const today = new Date();
    //     const twoWeeksLater = new Date();
    //     twoWeeksLater.setDate(today.getDate() + 13);

    //     for (let date = new Date(today); date <= twoWeeksLater; date.setDate(date.getDate() + 1)) {
    //         const formattedDate = date.getDate();
    //         const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);

    //         console.log(formattedDate.toString())

    //         generatedDays.push({ date: formattedDate.toString(), day: dayOfWeek });
    //     }
    // }, [])

    // for (const selectedDay of generatedDays) {
    //         for (const booking of bookings) {
    //             if (selectedDay.date === String(booking.booking_date).slice(0,2)) {
    //                 const formattedTime = String(booking.start_time).replace(':','.');
    //                 for (const sched of scheds) {
    //                     if (sched.time === formattedTime) {
    //                         sched.disabled = 1;
    //                     }
    //                 }
    //             }
    //         }
    //     }

    return (
        <>
            <div className={"max-w-[1200px] mx-auto"}>
                <FieldDesc field={field} />
                <FieldBook field={field} schedule={scheds} generatedDays={generatedDays} /> 
            </div>
        </>
    )
}

export default FieldOrder;