"use client";

import {useState, useEffect} from "react";
import FieldCard from "./FieldCard"
import FieldCard2 from "./FieldCard2"

const Feed = () => {
  return (
    <div className="feed_container">
        <section className="feed">
            <FieldCard2
                image="/assets/images/futsal_placeholder_1.jpg"
                name="Vincent's Football Field"
                address="Jalan Tubagus Ismail Raya No.23"
                distance={3}
                rating={4.5}
                price={10000}
            />
            
            <div className="hidden lg:flex">
                <FieldCard2
                    image="/assets/images/futsal_placeholder_2.jpg"
                    name="Duke of Gawangan"
                    address="Jalan Ciheulang Baru No.12"
                    distance={2}
                    rating={3.9}
                    price={10000}
                />
            </div>

            <div className="hidden lg:flex">
                <FieldCard2
                    image="/assets/images/futsal_placeholder_1.jpg"
                    name="Farhan Algani GOR"
                    address="Jalan Ciheulang Baru No.12"
                    distance={2}
                    rating={1.2}
                    price={10000}
                />
            </div>
        
        </section>

        <section className="feed">
            <FieldCard2
                image="/assets/images/futsal_placeholder_1.jpg"
                name="Vincent's Football Field"
                address="Jalan Tubagus Ismail Raya No.23"
                distance={3}
                rating={4.5}
                price={10000}
            />

            <div className="hidden lg:flex">
                <FieldCard2
                    image="/assets/images/futsal_placeholder_2.jpg"
                    name="Duke of Gawangan"
                    address="Jalan Ciheulang Baru No.12"
                    distance={2}
                    rating={3.9}
                    price={10000}
                />
            </div>

            <div className="hidden lg:flex">
            <FieldCard2
                image="/assets/images/futsal_placeholder_1.jpg"
                name="Farhan Algani GOR"
                address="Jalan Ciheulang Baru No.12"
                distance={2}
                rating={1.2}
                price={10000}
            /> 
            </div>
            
        </section>

    </div>
    


  )
}

export default Feed