"use client"
import {useState, useEffect} from "react";
import {signIn, signOut, useSession, getProviders} from "next-auth/react";
import Image from "next/image"

const FieldCard2 = ({image, name, address, distance, rating, price}: {image: string, name: String, address: String, distance: number, rating: number, price: number}) => {
  return (
    <div className="card_container">
    	<Image className="card_image" src={image} alt="Card Image" width={300} height={240} />
  		<div className="px-4 py-2">
    		<h1 className="card_title">{name}</h1>
    		<p className="card_address">{address}</p>
  		</div>
  		<div className="card_details max-sm:hidden">
    		<div className="card_slot lg:visible">
					<Image src="/assets/icons/location_pin.png" alt="Distance" width={30} height={30} className="card_icon"/>
      		<p className="card_subtext">{distance} KM</p>
    		</div>
    		<div className="card_slot lg:visible">
					<Image src="/assets/icons/star_icon.webp" alt="Rating" width={30} height={30} className="card_icon"/>
      		<p className="card_subtext">{rating}/5.0 </p>
    		</div>
    		<div className="card_slot lg:visible">
					<Image src="/assets/icons/price_label.png" alt="Price" width={30} height={30} className="card_icon"/>
      		<p className="card_subtext">{price}/hour</p>
    		</div>
  		</div>
		</div>

  )
}

export default FieldCard2