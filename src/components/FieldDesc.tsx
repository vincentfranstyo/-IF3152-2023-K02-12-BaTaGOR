"use client";
import React, { useState } from 'react';
import {field} from '@/types/models'
import {PrismaClient} from '@prisma/client';
import { CiLocationOn, CiStar, CiPhone } from "react-icons/ci";
import { GiSoccerField } from "react-icons/gi";
import { MdOutlineSchedule } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link"
import {useRouter} from "next/navigation"


const prisma = new PrismaClient();

interface FieldDescProps {
    field: field;
}

const FieldDesc: React.FC<FieldDescProps> = ({field}) => {

    const router = useRouter();

    // CRACKHOUSE ASS CODEEEEEEEEE SIALAN KAU REACT NEXTJS 
    const idbknint = window.location.pathname.split("/").slice(-1)[0] // JELEKKKKKKKKKKK TAPI YANG PENTING BISA
    const id = parseInt(idbknint)

    console.log(id);
    

    const handleDelete = async () => {
        const response = await fetch(`/api/fields/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            router.push(`/`)
        }
    }


    return (
        <div id="FieldDesc" className={"max-w-[1200px] mt-3 flex flex-col gap-5 mb-5"}>
            <div className={"flex w-full h-auto justify-between"}>
                <div id={"title"} className={"flex font-extrabold text-3xl"}>
                    {field?.field_name}
                </div>
                <Link
                    id={"edit"}
                    className={"flex h-auto bg-gray-100 shadow-sm" +
                    " hover:bg-gray-500 hover:text-white hover:shadow-xl px-2" +
                    " items-center justify-center font-semibold text-lg" +
                    " rounded"}
                    href={`/pages/FieldEdit/${field?.field_id}`}
                >edit</Link>
                {/*TODO: Onclick edit, isOwner: visible, the rest: hidden, tambahin property hidden di className kalau
                 bukan owner*/}
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
            {/*    TODO : valuenya di get dari staff yang corresponding dengan si field*/}
            </div>
            {/*TODO: ganti phoneNumber*/}
            <div className={"flex w-full h-auto justify-between"}>
                <div id={"schedule"} className={"flex gap-5"}>
                    <MdOutlineSchedule size={30}/>
                    <div className={"font-[14px]"}>08.00 - 22.00 WIB</div>
                </div>
                <Link href="/" className={"flex h-auto shadow-sm" +
                    " hover:bg-red-600 hover:shadow-xl px-2 py-1" +
                    " items-center justify-center" +
                    " rounded border border-red-600"}>
                    <MdDeleteOutline size={30} onClick={handleDelete}/>
                    {/*TODO: Onclick delete, isOwner: visible, the rest: hidden, tambahin property hidden di className
                     kalau
                     bukan owner*/}
                </Link>
            </div>
        </div>
    );
};

export default FieldDesc;