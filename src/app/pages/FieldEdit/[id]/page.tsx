"use client"
import React, {useEffect, useState} from 'react'
import {field} from '@/types/models'
import Image from 'next/image'
import FieldDesc from '@/components/FieldDesc'
import Link from 'next/link'
import FieldEditForm from "@/components/FieldEditForm"
interface FieldInfoProps {
    params: {
        id: string
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
                <FieldDesc field={field}/>
                <FieldEditForm />
            </div>
        </>
    )
}

export default FieldInfo;