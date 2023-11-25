"use client";
import React from 'react'
import Link from 'next/link'

import {field, history, booking} from "@/types/models";

interface HistoryProps {
    histories: history[],
    userRole: string | undefined;
}

const History: React.FC<HistoryProps> = ({histories, userRole}) => {
    const addHours = (date: Date, hours: number): Date => {
        const result = new Date(date);
        result.setHours(result.getHours() + hours);
        return result;
    };

    return (
        <>
        {userRole === 'customer'}
            <div id={"historyContainer"} className={"max-w-[1200px] flex flex-col h-auto gap-5"}>
                <div id={"title"} className={"text-xl font-bold"}>Your History</div>
                {histories.map(history => {
                    const startTime: Date = new Date(history.start_time);
                    const duration: number = parseInt((history.duration_minutes / 60).toFixed(1))
                    const endTime: Date = addHours(startTime, (duration));
                    return (
                        <div key={history.history_id} id={`history-${history.history_id}`}
                             className={"glassmorphism flex justify-between" +
                                 " w-full"}>
                            <div
                                id={"righty"} className={"flex flex-col gap-1"}
                            >
                                <div className={"text-xl font-bold"}>
                                    {history.field_name}
                                </div>
                                <div className={"text-lg"}>
                                    {`${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()}`}
                                </div>
                                <div className={"text-lg"}>
                                    {duration} jam
                                </div>
                            </div>
                            <div
                                id={"lefty"} className={"flex flex-col gap-1"}
                            >
                                <div className={"text-lg"}>
                                    {history.date}
                                </div>
                                <div className={"text-lg text-red-500 font-bold"}>
                                    Rp {history.price},-
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default History