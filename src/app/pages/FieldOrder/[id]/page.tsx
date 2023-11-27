"use client";
import React, {useEffect, useState} from "react";
import {field} from "@/types/models";
import Image from "next/image";
import FieldBook from "@/components/FieldBook";
import FieldDesc from "@/components/FieldDesc";

interface FieldOrderProps {
    params: {
        id: string
    }
}

const FieldOrder: React.FC<FieldOrderProps> = ( {params}: { params: { id: string } } ) => {
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
                <FieldDesc field={field} />
                <FieldBook field={field} />
            </div>
        </>
    )
}

export default FieldOrder;