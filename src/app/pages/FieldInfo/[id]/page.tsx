"use client"
import React, {useEffect, useState} from 'react'
import {field} from '@/types/models'
import Image from 'next/image'
import FieldDesc from '@/components/FieldDesc'
import Link from 'next/link'

interface FieldInfoProps {
    params: {
        id: string,
    }
}

const FieldInfo: React.FC<FieldInfoProps> = ({params}: { params: { id: string } }) => {
    // TODO: Params = data field yang di get dari DB sesuai ID, feel free klo ga dipake
    const id = params.id;
    // console.log(id);

    const [field, setField] = useState<field>();

    useEffect(() => {
        fetch(`/api/fields/${id}`)
            .then(response => {
                // console.log('API response:', response);
                return response.json();
            })
            .then(data => {
                // console.log('API data:', data);
                setField(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [id]);


    return (
        <>
            <div className={"max-w-[1200px] mx-auto"}>
                <div className={"flex justify-center"}>
                    {field?.image_url
                        ?
                        <Image className={"w-[80%] rounded-lg"} src={field?.image_url} alt={`field ${field?.field_id}`}
                               width={1200} height={200}/>
                        : <div className={"w-[80%]"}>No Image found</div>
                    }
                </div>
                <FieldDesc field={field} />
                <div className={"border border-black"}/>
                <div className={"w-full h-12 flex items-center bg-blue-700 mt-5 mb-10 rounded"}>
                    <div className={"w-[75%] flex font-semibold ml-5 text-white"}>
                        <p>Rp {field?.rate_per_hour},- / hour / field</p>
                    </div>
                    <Link href={`/pages/FieldOrder/${field?.field_id}`} className={"w-[25%] h-7 font-bold bg-white" +
                        " cursor-pointer items-center text-center justify-center rounded px-3 hover:bg-yellow-300" +
                        " hover:text-white" +
                        " text-md sm:text-lg lg:text-xl mr-2"}>
                        Book Now!
                    </Link>
                </div>
            </div>
        </>
    )
}

export default FieldInfo;