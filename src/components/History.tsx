"use client";
import React from 'react'

import {history} from "@/types/models";
import formatDateString from "@/lib/utils";

interface HistoryProps {
    histories: history[],
}

const History: React.FC<HistoryProps> = ({histories}) => {
    const addHours = (date: string, hours: number): string => {
        const startTime = parseInt(date.substring(0, 2))
        return (startTime + hours).toLocaleString();
    };

    return (
        <>
            <div id="historyContainer" className="max-w-[1200px] flex flex-col h-auto gap-5 mx-auto">
                <div id="title" className="text-xl font-bold">Your History</div>
                {histories.map(history => {
                    const duration = parseInt((history.duration_minute / 60).toFixed(1));
                    let endTime = addHours(history.start_time, duration);
                    parseInt(endTime) < 10 ? endTime = "0" + endTime : endTime

                    return (
                        <div key={history.history_id} id={`history-${history.history_id}`}
                             className="glassmorphism flex w-[600px] border gap-x-5 justify-between">
                            <div id="lefty" className="flex flex-col gap-1">
                                <div className="text-xl font-bold">
                                    {history.field_name}
                                </div>
                                <div className="text-lg">
                                    {`${history.start_time} - ${endTime}.00`}
                                </div>
                                <div className="text-lg">
                                    {duration} jam
                                </div>
                            </div>
                            <div id="righty" className="flex flex-col gap-1 text-right">
                                <div className="text-lg">
                                    {formatDateString(history.booking_date)}
                                </div>
                                <div className="text-lg text-red-500 font-bold justify-right">
                                    Rp {history.total_price.toLocaleString('id-ID')},-
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default History