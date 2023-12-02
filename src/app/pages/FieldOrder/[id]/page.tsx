"use client";
import React, { useEffect, useState } from "react";
import {booking, field, schedule, days} from "@/types/models";
import Image from "next/image";
import FieldBook from "@/components/FieldBook";
import FieldDesc from "@/components/FieldDesc";

interface FieldBookPageProps {
    params : {
        id: string
    }
}

const currentDate: Date = new Date();
const currentMonth: string = currentDate.toLocaleString('en-US', { month: '2-digit' });
const currentYear: number = currentDate.getFullYear();

const FieldOrder: React.FC<FieldBookPageProps> = ( {params}: {params: {id: string}} ) => {
    const [bookings, setBookings] = useState<booking[]>([]);

    const id = params.id;
    // console.log(id);

    const [field, setField] = useState<field>();

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
    }, [id]);

    const scheds: schedule[] = [
        {
            id: 1,
            time: "08.00",
            disabled: 0
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
    ];
    
    // console.log(id);
    const getBookings = async (id: string) => {
        try {
            const response = await fetch(`/api/fieldBooking/${id}`);
            const result = await response.json();
            console.log(result);
            setBookings(result);
        } catch (error) {
            console.error('Something went wrong?', { autoClose: 3000 })
        }
    }

    useEffect(() => {
        getBookings(params.id)
    },[params.id])

    const formattedCurrentDate = currentMonth.toString().concat('/').concat(currentDate.getDate().toString()).concat('/').concat(currentYear.toString());
    console.log(formattedCurrentDate);

    useEffect(() => {
        for (const booking of bookings) {
            if (String(booking.booking_date) == formattedCurrentDate) {
                for (const schedTime of scheds) {
                    console.log(schedTime.time)
                    console.log(String(booking.start_time).replace(':','.'))
                    console.log(schedTime.time === String(booking.start_time))
                    if (schedTime.time == String(booking.start_time)) {
                        console.log('uwuwuw')
                        schedTime.disabled = 1;
                        console.log(schedTime.disabled)
                    }
                }
            }
        }
    }, [scheds, bookings])
    console.log(scheds)

    // const [days, setDays] = useState<days[]>([]);

    // useEffect(() => {
    //     const today = new Date();
    //     const twoWeeksLater = new Date();
    //     twoWeeksLater.setDate(today.getDate() + 13);

    //     const generatedDays: days[] = [];

    //     for (let date = new Date(today); date <= twoWeeksLater; date.setDate(date.getDate() + 1)) {
    //         const formattedDate = date.getDate();
    //         const formattedMonth = date.getMonth();
    //         // console.log(formattedDate)
    //         const dayOfWeek = new Intl.DateTimeFormat('en-US').format(date);

    //         generatedDays.push({ date: formattedDate.toString(), month: formattedMonth.toString(), day: dayOfWeek });
    //     }

    //     setDays(generatedDays);
    // }, []);

    // for (const selectedDay of generatedDays) {
    //         for (const booking of bookings) {
    //             if (selectedDay.date === String(booking.date).slice(8)) {
    //                 const formattedTime = String(booking.start_time).slice(0,5).replace(':','.');
    //                 for (const sched of schedDetails) {
    //                     if (sched.time === formattedTime) {
    //                         sched.disabled = 1;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // useEffect(() => {
    //     console.log(bookings)
    //     for (const selectedDay of days) {
    //         for (const booking of bookings) {
    //             console.log(booking.booking_date)
    //             console.log(String(booking.booking_date).slice(3,5))
    //             console.log(String(booking.booking_date).slice(0,2))
    //             console.log(selectedDay.date)
    //             console.log((Number(selectedDay.month).toString))
    //             if (selectedDay.date === String(booking.booking_date).slice(3,5) && Number(selectedDay.month).toString() === String(booking.booking_date).slice(0,2)) {
    //                 const time = String(booking.start_time).replace(':','.');
    //                 for (const schedTime of scheds) {
    //                     if (schedTime.time === time) {
    //                         schedTime.disabled = 1;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }, [bookings])
    console.log(bookings)

    return (
        <>
            <div className={"max-w-[1200px] mx-auto"}>
                <FieldDesc field={field} />
                <FieldBook field={field} scheds={scheds}/> 
            </div>
        </>
    )
}

export default FieldOrder;