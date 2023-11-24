"use client";
import FieldCard2 from "./FieldCard2"
import React from 'react'
import {field} from "@/types/models"
import Link from 'next/link'

const Feed: React.FC = () => {
    const fields: (field[]) = [
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
        },
        {
            field_id: 2,
            field_name: "Duke of Gawangan",
            street: "Jalan Ciheulang Baru No.12",
            city: "Bandung",
            province: "Jawa Barat",
            postal_code: 45331,
            image_url: "/assets/images/futsal_placeholder_2.jpg",
            rate_per_hour: 12000,
            operational_status: "available",
            owner_id: 6
        },
        {
            field_id: 3,
            field_name: "Farhan Algani GOR",
            street: "Jalan Cisitu Lama XVII No. 49",
            city: "Bandung",
            province: "Jawa Barat",
            postal_code: 42348,
            image_url: "/assets/images/futsal_placeholder_2.jpg",
            rate_per_hour: 15000,
            operational_status: "available",
            owner_id: 6
        },
        {
            field_id: 4,
            field_name: "VF's Fields",
            street: "Jalan Tubagus Ismail Raya No.23",
            city: "Bandung",
            province: "Jawa Barat",
            postal_code: 42330,
            image_url: "/assets/images/futsal_placeholder_1.jpg",
            rate_per_hour: 10000,
            operational_status: "available",
            owner_id: 6
        },
        {
            field_id: 5,
            field_name: "Duke of Gawangan",
            street: "Jalan Ciheulang Baru No.12",
            city: "Bandung",
            province: "Jawa Barat",
            postal_code: 45331,
            image_url: "/assets/images/futsal_placeholder_2.jpg",
            rate_per_hour: 12000,
            operational_status: "available",
            owner_id: 6
        },
        {
            field_id: 6,
            field_name: "Farhan Algani GOR",
            street: "Jalan Cisitu Lama XVII No. 49",
            city: "Bandung",
            province: "Jawa Barat",
            postal_code: 42348,
            image_url: "/assets/images/futsal_placeholder_2.jpg",
            rate_per_hour: 15000,
            operational_status: "available",
            owner_id: 6
        }
    ]
    return (
        <div className="feed_container">
            <section className="feed">
                {fields.map(field => (
                    <Link key={field?.field_id} href={`/pages/FieldInfo/${field?.field_id}`} className={"hidden" +
                        " lg:flex" +
                        " cursor-pointer"}>
                        <FieldCard2
                            image={field?.image_url}
                            name={field?.field_name}
                            address={field?.street}
                            distance={3}
                            rating={4.5}
                            price={field?.rate_per_hour}
                        />
                    </Link>
                ))}
            </section>
        </div>
    )
}

export default Feed