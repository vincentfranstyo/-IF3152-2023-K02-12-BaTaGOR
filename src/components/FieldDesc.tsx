"use client";
import React from 'react';
import {field} from '@/types/models'
import {PrismaClient} from '@prisma/client';
import { CiLocationOn, CiStar, CiPhone } from "react-icons/ci";
import { GiSoccerField } from "react-icons/gi";
import { MdOutlineSchedule } from "react-icons/md";

const prisma = new PrismaClient();

interface FieldDescProps {
    field: field;
}

async function users() {
    const users = await prisma.user.findMany();
    await prisma.$disconnect();
    return {props: {users}};
}

const FieldDesc: React.FC<FieldDescProps> = ({field}) => {
    return (
        <div id="FieldDesc" className={"max-w-[1200px] mt-3 flex flex-col gap-5 mb-5"}>
            <div id={"title"} className={"flex font-extrabold text-3xl"}>
                {field?.field_name}
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