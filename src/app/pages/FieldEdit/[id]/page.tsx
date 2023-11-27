"use client"
import React from 'react'
import {field} from '@/types/models'
import Image from 'next/image'
import FieldEdit from '@/components/FieldEdit'
import Link from 'next/link'


const FieldInfo: React.FC<field> = ( {params} ) => {
    // TODO: Params = data field yang di get dari DB sesuai ID, feel free klo ga dipake
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
                        : <div className={"w-[80%]"}>No Image found</div>
                    }
                </div>
                <FieldEdit field={field} />
            </div>
        </>
    )
}

export default FieldInfo;