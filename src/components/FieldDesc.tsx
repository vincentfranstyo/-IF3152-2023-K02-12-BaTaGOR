"use client";
import React, { useState } from 'react';
import {field} from '@/types/models'
import {PrismaClient} from '@prisma/client';
import { CiLocationOn, CiStar, CiPhone } from "react-icons/ci";
import { GiSoccerField } from "react-icons/gi";
import { MdOutlineSchedule } from "react-icons/md";
import Link from "next/link"

const prisma = new PrismaClient();

interface FieldDescProps {
    field: field;
}

const FieldDesc: React.FC<FieldDescProps> = ({field}) => {
    return (
        <div id="FieldDesc" className={"max-w-[1200px] mt-3 flex flex-col gap-5 mb-5"}>
            <div className={"flex w-full h-auto justify-between"}>
                <div id={"title"} className={"flex font-extrabold text-3xl"}>
                    {field?.field_name}
                </div>
                <Link
                    id={"edit"}
                    className={"flex h-fit bg-gray-100 shadow-sm" +
                    " hover:bg-gray-500 hover:text-white hover:shadow-xl px-2" +
                    " items-center justify-center font-semibold text-lg" +
                    " rounded"}
                    href={`/pages/FieldEdit/${field.field_id}`}
                >edit</Link>
                {/*TODO: Onclick edit, isOwner: visible, the rest: hidden */}
            </div>
            <div id={"location"} className={"flex gap-5"}>
                <CiLocationOn size={30} />
                <div className={"font-[14px]"}>{field?.street}, {field?.city}, {field?.province}</div>
            </div>
            <div id={"rating"} className={"flex gap-5"}>
                <CiStar size={30} />
                <div className={"font-[14px]"}>4.5/5.0</div>
            </div>
            {/*TODO: Manage ratings*/}
            <div id={"type"} className={"flex gap-5"}>
                <GiSoccerField size={30} />
                <div className={"font-[14px]"}>Lapangan rumput</div>
            </div>
            <div id={"phoneNumber"} className={"flex gap-5"}>
                <CiPhone size={30} />
                <div className={"font-[14px]"}>+654676346543</div>
            </div>
            {/*TODO: ganti phoneNumber*/}
            <div id={"schedule"} className={"flex gap-5"}>
                <MdOutlineSchedule size={30}/>
                <div className={"font-[14px]"}>07.00 - 22.00 WIB</div>
            </div>
        </div>
    );
};

export default FieldDesc;