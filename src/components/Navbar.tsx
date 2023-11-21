"use client"

import Link from "next/link";
import Image from "next/image";
import {useState, useEffect} from "react";
import {signIn, signOut, useSession, getProviders} from "next-auth/react";

const Navbar = () => {
	// user login data status, dummy for now
	const isUserLogged = true

	// popup button state
	const [buttonPopup, setbuttonPopup] = useState(false)
  return (
    <nav className="flex-between w-full mb-16 pt-4">
			{/**Clickable logo: Image wraped in link */}
			<Link href="/" className="flex gap-4 flex-center" >
				<Image 
					src="/assets/icons/football.png"
					alt="BaTaGOR Logo"
					width={40}
					height={40}
					className="object-contain"
				/>

				<p className="logo_text">BATAGOR</p>
			</Link>

			

			{/*Desktop Navigation */}
			<div className="sm:flex hidden">
				{isUserLogged? ( // todo change to session check, change profile pic
					<div className="flex-between gap-4 md:gap-8">
						{/**Search Bar */}
						<input
						type="text"
						placeholder="Search for a football field"
						className="search_input peer"
						// todo implement functioning search bar
						/>
						<button type = "button"  onClick={()=> {}} className="outline__btn">
              Sign Out
            </button>
						<Link href="/history" className="blue_btn_2"> History </Link>	
						<Link href="/profile">
							<Image 
								alt="Profile"
								src="/assets/images/profile_default.webp"
								width={40}
								height={40}
								className="rounded-full"
							/>
						</Link>

					</div>
					
				): (	// else
					// todo ganti ke sign in sama register option beneran
					<div className="flex-between gap-4 md:gap-4">
						<Link href="/auth/Register" className="outline_btn">
            	Register
          	</Link>
						<Link href="/auth/SignIn" className="blue_btn_2">
            	Sign In
          	</Link>
					</div>
					
				)}
				
			</div>

		</nav>
  )
}

export default Navbar