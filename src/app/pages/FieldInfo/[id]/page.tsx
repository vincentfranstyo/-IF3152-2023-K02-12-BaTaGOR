"use client"
import React from 'react'
import {field} from '@/types/models'
import Image from 'next/image'
import FieldDesc from '@/components/FieldDesc'


const FieldInfo: React.FC<field> = ( {params} ) => {
    const field: (field) =
        {
            field_id: 1,
            field_name: "VF's Fields",
            street: "Jalan Tubagus Ismail Raya No.23",
            city: "Bandung",
            province: "Jawa Barat",
            postal_code: 42330,
            image_url: "/assets/images/futsal_placeholder_1.jpg",
            rate_per_hour: 10000,
            operational_status: "available",
            owner_id: 6
        }
    return (
        <>
            <div className={"max-w-[1200px] mx-auto"}>
                <div className={"flex justify-center"}>
                    {field?.image_url
                        ? <Image className={"w-[80%] rounded-lg"} src={field?.image_url} alt={`field ${field?.field_id}`} width={1200} height={200}/>
                        // <div> {field?.field_name} </div>
                        : <div className={"w-[80%]"}>No Image found</div>
                    }
                </div>
                <FieldDesc field={field} />
                <div className={"border border-black"} />
                <div className={"w-full h-12 flex items-center bg-blue-700 mt-5 mb-10 rounded"}>
                    <div className={"w-[80%] flex font-semibold ml-5 text-white"}>
                        <p>Rp{field.rate_per_hour},- / hour / field</p>
                    </div>
                    <button className={"w-[15%] h-6 font-bold bg-white mr-3"}>
                        <p>Book Now!</p>
                    </button>
                </div>
            </div>
        </>
    )
}

export default FieldInfo;