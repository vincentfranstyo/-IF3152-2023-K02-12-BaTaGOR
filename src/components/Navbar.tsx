import Link from "next/link";
import Image from "next/image";
import{authOptions} from "@/lib/auth"
import {getServerSession} from "next-auth"
import NavButtonSignout from "./NavButtonSignout"

const Navbar = async () => {
	// user login data status
	const session = await getServerSession(authOptions)

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
				{session?.user ? ( // If the user is logged in, show the option to check their history, sign out, and 
					<div className="flex-between gap-4 md:gap-8">
						{/**Search Bar */}
						<input
						type="text"
						placeholder="Search for a football field"
						className="search_input peer"
						// todo implement functioning search bar
						/>
						<NavButtonSignout/>
						
						<Link href="/history" className="blue_btn_2"> History </Link>	
						<Link href="/dashboard/admin">
							<Image 
								alt="Profile"
								src="/assets/images/profile_default.webp"
								width={40}
								height={40}
								className="rounded-full"
							/>
						</Link>

					</div>
					
				): (	// if the user is signed out, only show them the option to sign in and register
					
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