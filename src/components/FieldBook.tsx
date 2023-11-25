"use client";
import React, {useState, useEffect} from 'react';
import {field} from '@/types/models';
import Link from "next/link";


interface FieldBookProps {
    field: field;
}

interface schedule {
    id: number,
    time: string,
    disabled: boolean,
}

interface days {
    date: string,
    day: string
}

const currentDate: Date = new Date();
const currentMonth: string = currentDate.toLocaleString('en-US', { month: 'long' });
const currentYear: number = currentDate.getFullYear();

const FieldBook: React.FC<FieldBookProps> = ({field: field}) => {
    // TODO: Value disabled disesuaikan dengan value yang diretrieve dari booking
    const scheds: schedule[] = [
        {
            id: 1,
            time: "08.00",
            disabled: true
        },
        {
            id: 2,
            time: "09.00",
            disabled: false
        },
        {
            id: 3,
            time: "10.00",
            disabled: false
        },
        {
            id: 4,
            time: "11.00",
            disabled: false
        },
        {
            id: 5,
            time: "12.00",
            disabled: false
        },
        {
            id: 6,
            time: "13.00",
            disabled: true
        },
        {
            id: 7,
            time: "14.00",
            disabled: false
        },
        {
            id: 8,
            time: "15.00",
            disabled: false
        },
        {
            id: 9,
            time: "16.00",
            disabled: false
        },
        {
            id: 10,
            time: "17.00",
            disabled: false
        },
        {
            id: 11,
            time: "18.00",
            disabled: true
        },
        {
            id: 12,
            time: "19.00",
            disabled: false
        },
        {
            id: 13,
            time: "20.00",
            disabled: false
        },
        {
            id: 14,
            time: "21.00",
            disabled: false
        },
        {
            id: 15,
            time: "22.00",
            disabled: false
        },
    ]
    const [days, setDays] = useState<Days[]>([]);

    useEffect(() => {
        const today = new Date();
        const twoWeeksLater = new Date();
        twoWeeksLater.setDate(today.getDate() + 13);

        const generatedDays: days[] = [];

        for (let date = new Date(today); date <= twoWeeksLater; date.setDate(date.getDate() + 1)) {
            const formattedDate = date.getDate();
            const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);

            generatedDays.push({ date: formattedDate.toString(), day: dayOfWeek });
        }

        setDays(generatedDays);
    }, []);
    return (
        <>
            <form id="Field Order" className="max-w-[1200px] mt-3 flex flex-col gap-5 mb-5">
                {/*TODO: Submit -> return value jam dan tanggal yang dipilih*/}
                <div id={"DateCont"} className={"w-full h-auto flex flex-col gap-5 text-center"}>
                    <div className={"w-full h-auto font-bold text-2xl mx-auto"}>{`${currentMonth} ${currentYear}`}</div>
                    <div id={"date"} className={"w-full h-auto grid grid-cols-7 gap-2"}>
                        {days.map((day, index) => (
                            <button key={index} className={"w-full h-auto text-center px-1 py-1 bg-white rounded" +
                                " font-bold shadow-sm hover:bg-gray-200 hover:shadow-xl flex flex-col"}>
                                <div id={"dayText"}>
                                    {`${day.day}`}
                                </div>
                                <div id={"dateText"}>
                                    {`${day.date}`}
                                </div>
                            </button>
                        ))}
                    {/*    TODO: focused button style and onclick effect*/}
                    </div>
                </div>
                <div id={"Time"} className={"w-full h-auto flex flex-col gap-5"}>
                    <div className={"w-full h-auto font-bold text-xl"}>Jadwal</div>
                    <div id={"schedule"} className={"w-full h-auto grid grid-cols-5 gap-2"}>
                        {scheds.map(schedule => (
                            <button
                                key={schedule.id}
                                className={`w-full h-auto text-center px-1 py-1 bg-white rounded font-bold shadow-sm  ${
                                    schedule.disabled ? 'bg-gray-400 text-white cursor-not-allowed' : 'hover:bg-gray-200' +
                                        ' hover:shadow-xl'
                                }`}
                                disabled={schedule.disabled}
                            >
                                {schedule.time}
                            </button>
                            //     TODO: Add OnClick Handler
                        ))}
                    </div>
                </div>

                <button
                    type={"submit"}>
                    <Link
                        href={`/pages/FieldInfo/${field.field_id}`}
                        className={"h-auto rounded bg-green-300" +
                            " text-black" +
                            " hover:text-white hover:bg-green-500 mx-auto px-3 py-1 w-[10%] text-center font-bold"}>
                        Confirm Booking
                    </Link>
                </button>
            </form>
        </>
    );
}

export default FieldBook;