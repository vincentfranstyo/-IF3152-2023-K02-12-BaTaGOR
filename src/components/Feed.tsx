"use client";
import FieldCard2 from "./FieldCard2"
import React, {useEffect, useState} from 'react'
import {field} from "@/types/models"
import Link from 'next/link'

interface FeedProps {
    fields: field[];
}


const Feed: React.FC<FeedProps> = ({fields}) => {
    return (
        <div className="feed_container">
            <section className="feed flex flex-col gap-2">
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