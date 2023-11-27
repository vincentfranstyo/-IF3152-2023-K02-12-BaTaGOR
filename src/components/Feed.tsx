"use client";
import FieldCard2 from "./FieldCard2"
import React, {useEffect, useState} from 'react'
import {field} from "@/types/models"
import Link from 'next/link'
import {IoAddCircle} from "react-icons/io5";

interface FeedProps {
    fields: field[];
}


const Feed: React.FC<FeedProps> = ({fields}) => {
    const [randomRating, setRandomRating] = useState(0);
    const [randomDistance, setRandomDistance] = useState(0);
    useEffect(() => {
        setRandomRating((Math.random() + 3.7) * 5);
        setRandomDistance(Math.random() * 100);
    }, []);

    return (
        <div className="feed_container">
            <button className={"w-full items-center justify-center border-none flex flex-col"}>
                <IoAddCircle size={50}/>
            </button>
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