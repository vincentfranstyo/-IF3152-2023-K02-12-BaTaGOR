"use client";
import React, {useState} from 'react';
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

const FieldBook: React.FC<FieldBookProps> = ({field: field}) => {
    // TODO: Value disabled disesuaikan dengan value yang diretrieve dari booking
    const morning: schedule[] = [
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
    ]
    const afternoon: schedule[] = [
        {
            id: 1,
            time: "13.00",
            disabled: true
        },
        {
            id: 2,
            time: "14.00",
            disabled: false
        },
        {
            id: 3,
            time: "15.00",
            disabled: false
        },
        {
            id: 4,
            time: "16.00",
            disabled: false
        },
        {
            id: 5,
            time: "17.00",
            disabled: false
        },
    ]
    const evening: schedule[] = [
        {
            id: 1,
            time: "18.00",
            disabled: true
        },
        {
            id: 2,
            time: "19.00",
            disabled: false
        },
        {
            id: 3,
            time: "20.00",
            disabled: false
        },
        {
            id: 4,
            time: "21.00",
            disabled: false
        },
        {
            id: 5,
            time: "22.00",
            disabled: false
        },
    ]
    return (
        <>
            <form id="Field Order" className="max-w-[1200px] mt-3 flex flex-col gap-5 mb-5">
                {/*TODO: Submit -> return value jam yang dipilih*/}
                <div id={"Date"}>
                </div>
                <div id={"Time"} className={"w-full h-auto flex flex-col gap-5"}>
                    <div id={"morning"} className={"w-full h-auto font-bold text-xl"}>Jadwal</div>
                    <div id={"morning"} className={"w-full h-auto grid grid-cols-5 gap-2"}>
                        {morning.map(schedule => (
                            <button
                                key={schedule.id}
                                className={`w-full h-auto text-center px-1 py-1 bg-white rounded ` +
                                    `font-bold shadow-sm ${
                                        schedule.disabled ? 'bg-gray-300 text-white cursor-not-allowed' : 'hover:bg-gray-200 hover:shadow-xl'
                                    }`}>
                                {schedule.time}
                            </button>
                            //     TODO: Add OnClick Handler
                        ))}
                    </div>
                    <div id={"afternoon"} className={"w-full h-auto grid grid-cols-5 gap-2"}>
                        {afternoon.map(schedule => (
                            <button
                                key={schedule.id}
                                className={`w-full h-auto text-center px-1 py-1 bg-white rounded ` +
                                    `font-bold shadow-sm ${
                                        schedule.disabled ? 'bg-gray-300 text-white cursor-not-allowed' : 'hover:bg-gray-200 hover:shadow-xl'
                                    }`}>
                                {schedule.time}
                            </button>
                            //     TODO: Add OnClick Handler
                        ))}
                    </div>
                    <div id={"evening"} className={"w-full h-auto grid grid-cols-5 gap-2"}>
                        {evening.map(schedule => (
                            <button
                                key={schedule.id}
                                className={`w-full h-auto text-center px-1 py-1 bg-white rounded ` +
                                    `font-bold shadow-sm ${
                                        schedule.disabled ? 'bg-gray-300 text-white cursor-not-allowed' : 'hover:bg-gray-200 hover:shadow-xl'
                                    }`}>
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