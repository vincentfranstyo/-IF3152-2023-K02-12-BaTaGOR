"use client";
import React, {useState, useEffect} from 'react';
import {field, schedule} from '@/types/models';
import {field, schedule} from '@/types/models';
import Link from "next/link";


interface FieldBookProps {
    field: field,
    scheds: schedule[]
}

const currentDate: Date = new Date();
const currentMonth: string = currentDate.toLocaleString('en-US', { month: 'long' });
const currentYear: number = currentDate.getFullYear();

const FieldBook: React.FC<FieldBookProps> = ({field, scheds}) => {
    // TODO: Value disabled disesuaikan dengan value yang diretrieve dari booking
    // const [bookings, setBookings] = useState<booking[]>([]);
    const [schedDetails, setSchedDetails] = useState<schedule[]>([]);
    // const [selectedSched, setSelectedSched] = useState<number[]>([]);

    console.log(scheds);
    useEffect(() => {
        // getBookings(String(fix1eld.field_id));
        // getBookings(String(fix1eld.field_id));
        // setSchedDetails(scheds?.map(schedule => ({...schedule})));

        // for (const selectedDay of generatedDays) {
        //     for (const booking of bookings) {
        //         if (selectedDay.date === String(booking.date).slice(8)) {
        //             const formattedTime = String(booking.start_time).slice(0,5).replace(':','.');
        //             for (const sched of schedDetails) {
        //                 if (sched.time === formattedTime) {
        //                     sched.disabled = 1;
        //                 }
        //             }
        //         }
        //     }
        // }\
        // setSchedDetails(scheds?.map(schedule => ({...schedule})));
        setSchedDetails(scheds)
        // console.log(schedDetails);
        //clearSelectedSched();
    }, [scheds]);
    console.log(schedDetails)

    const getClassNameForSchedule = (scheduleValue: number) => {
        let dynamicClass;
        if (scheduleValue === 0) {
            dynamicClass = 'w-full h-auto text-center px-1 py-1 bg-white rounded font-bold shadow-sm hover:bg-gray-200 hover:shadow-xl';
        } else if (scheduleValue === 1) {
            dynamicClass = 'w-full h-auto text-center px-1 py-1 bg-white rounded font-bold shadow-sm bg-gray-400 text-white cursor-not-allowed';
        } else {
            dynamicClass = 'w-full h-auto text-center px-1 py-1 text-white bg-green-500 rounded font-bold shadow-sm hover:bg-gray-200 hover:shadow-xl';
        }
        return dynamicClass
    }

    const clearSelectedSched = () => {
        const updatedSchedDetails = schedDetails.map(schedule => {
            if (schedule.disabled === 2) {
                return {...schedule, disabled: 0};
            }
            return schedule;
        })
        setSchedDetails(updatedSchedDetails);
    }

    const onSchedClick = (schedValue: number, key: number, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        
        const updatedSchedDetails = [...schedDetails];
        
        if (schedDetails) {
            if (schedValue == 1) {
                return;
            } else if (schedValue == 0) {
                updatedSchedDetails[key-1].disabled = 2;
            } else {
                updatedSchedDetails[key-1].disabled = 0;
            }
        }
        setSchedDetails(updatedSchedDetails);
        // console.log(schedDetails);
    }

    const schedSelected = () => {
        let arr: number[] = [];

        for (const s of schedDetails) {
            if (s.disabled == 2) {
                arr.push(s.id);
            }
        }
        arr.toSorted()

        for (let i = 0; i < arr.length; i++) {
            if (arr[i]+1 != arr[i+1]) {
                return false;
            }
        }
    }

    const selectedTime = () => {
        let time;

        for (const s of schedDetails) {
            if (s.disabled == 2) {
                time = (s.time);
            }
        }
        return time
    }

    useEffect(() => {
        const isConsecutive = schedSelected();
    },[])

    const onBookingSubmit = async (values: booking) => {
        const response = await fetch("/api/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                booking_id : values.booking_id,
                duration_minute: values.duration_minute,
                start_time: values.start_time,
                booking_date: values.booking_date,
                total_price: values.total_price,
                user_id: values.user_id,
                field_id: values.field_id
            })
        })
        if (response.ok) {
            console.log('Updated')
        }else {
            return NextResponse.json('Error')
        }
    }
    
    const totalTime = 60;
    // const numMonth = currentDate.toLocaleString('en-US', { month: '2-digit' })
    // const formattedSched = String(currentYear).concat('-').concat(String(numMonth)).concat('-').concat(String(currentDate.getDate)).concat('T').concat()
    // const bookedTime = selectedTime()

    const data: booking = {
        booking_id: 0,
        duration_minute : totalTime,
        start_time : selectedTime(),
        booking_date : currentDate.toLocaleDateString(),
        total_price: field?.rate_per_hour * totalTime,
        user_id: 8,
        field_id: field?.field_id
    }

    // const toggleSchedSelection = (scheduleId: number) => {
    //     const index = selectedSched.indexOf(scheduleId);
    //     if (index === -1) {
    //         setSelectedSched([...selectedSched, scheduleId]);
    //     } else {
    //         const updatedSelectedSched = [...selectedSched];
    //         updatedSelectedSched.splice(index,1);
    //         setSelectedSched(updatedSelectedSched);
    //     }
    // };

    // const renderSched = () => {
    //     return schedDetails.map((schedule, index) => (
    //         <button
    //             key={schedule.id}
    //             className={getClassNameForSchedule(schedule.disabled)}
    //             onClick={() => onSchedClick(schedule.disabled, index)}
    //         >
    //             <span>{schedule.time}</span>
    //             {selectedSched.includes(schedule.id) && <span> (Selected) </span>}
    //         </button>
    //     ));
    // };

    // <div id={"date"} className={"w-full h-auto grid grid-cols-7 gap-2"}>
    //                     {generatedDays.map((day, index) => (
    //                         <button key={index} className={"w-full h-auto text-center px-1 py-1 bg-white rounded" +
    //                             " font-bold shadow-sm hover:bg-gray-200 hover:shadow-xl flex flex-col justify-center items-center"}>
    //                             <div id={"dayText"} className='w-full'>
    //                                 {`${day.day}`}
    //                             </div>
    //                             <div id={"dateText"} className="w-full">
    //                                 {`${day.date}`}
    //                             </div>
    //                         </button>
    //                     ))}
    //                 {/*    TODO: focused button style and onclick effect*/}
    //                 </div>

    console.log(schedDetails)
    return (
        <>
            <form id="Field Order" className="max-w-[1200px] mt-3 flex flex-col gap-5 mb-5">
                {/*TODO: Submit -> return value jam dan tanggal yang dipilih*/}
                <div id={"DateCont"} className={"w-full h-auto flex flex-col gap-5 text-center"}>
                    <div className={"w-full h-auto font-bold text-2xl mx-auto"}>{`${currentDate.getDate()} ${currentMonth} ${currentYear}`}</div>
                </div>
                <div id={"Time"} className={"w-full h-auto flex flex-col gap-5"}>
                    <div className={"w-full h-auto font-bold text-xl"}>Jadwal</div>
                    <div id={"schedule"} className={"w-full h-auto grid grid-cols-5 gap-2"}>
                        {schedDetails?.map((schedule) => (
                            <button
                                key={schedule.id}
                                // className={`w-full h-auto text-center px-1 py-1 bg-white rounded font-bold shadow-sm  ${
                                //     schedule.disabled ? 'bg-gray-400 text-white cursor-not-allowed' : 'hover:bg-gray-200' +
                                //         ' hover:shadow-xl'
                                // }`}
                                // disabled={schedule.disabled}
                                className={getClassNameForSchedule(schedule.disabled)} onClick={(event) => onSchedClick(schedule.disabled, schedule.id, event)}
                            >
                                {schedule.time}
                            </button>
                            //     TODO: Add OnClick Handler
                        ))}
                    </div>
                </div>

                <button
                    type={"button"} onClick={() => onBookingSubmit(data)}>
                    <Link
                        href={`/pages/FieldInfo/${field?.field_id}`}
                        className={"h-auto rounded bg-green-300" +
                            " text-black" +
                            `hover:text-white hover:bg-green-500 mx-auto px-3 py-1 w-[10%] text-center font-bold ${schedSelected() ? 'cursor-not-allowed' : ''}`}>
                        Confirm Booking
                    </Link>
                </button>
            </form>
        </>
    );
}

export default FieldBook;