"use client"
import {useState, useEffect} from "react";
import {signIn, signOut, useSession, getProviders} from "next-auth/react";
import Image from "next/image"

const FieldCard = ({name, address, distance, rating, price}: {name: String, address: String, distance: number, rating: number, price: number}) => {
	
  return (
    <div className="field_card">
			<div className="flex justify-between items-start gap-5">
				<div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
					<Image 
						src=""
						alt="field image"
						width={120}
						height={80}
						className="object-contain"
					/>

					<br/>

					<div className="flex flex-col">
						<h1 className="font-satoshi font-semibold text-gray-900">{name}</h1>	{/**Ganti ke data football field */}
						<br/>

						<p className="font-inter text=sm text-gray-500">{address}</p> {/**Ganti ke data football field */}
						<br/>
					</div>
					
				</div>
			</div>

		</div>
  )
}

export default FieldCard