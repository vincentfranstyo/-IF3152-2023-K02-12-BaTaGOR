"use client"
import React, {useEffect, useState} from 'react'
import {field} from '@/types/models'
import FieldEditForm from "@/components/FieldEditForm"
import FieldDesc from "@/components/FieldDesc"
interface FieldInfoProps {
    params: {
        id: string
    }
}

const FieldEdit: React.FC<FieldInfoProps> = ({params}: { params: { id: string } }) => {
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
            <div className={"max-w-full mx-auto"}>
                <FieldDesc field={field}/>
                <FieldEditForm />
            </div>
        </>
    )
}

export default FieldEdit;