"use client";
import React from "react";
import {field} from "@/types/models";
import Image from "next/image";
import FieldBook from "@/components/FieldBook";
import FieldDesc from "@/components/FieldDesc";

const FieldOrder: React.FC<field> = ( {params} ) => {
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
                <FieldDesc field={field} />
                <FieldBook field={field} />
            </div>
        </>
    )
}

export default FieldOrder;