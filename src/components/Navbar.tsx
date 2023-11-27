"use client"
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react"
import NavButtonSignout from "./NavButtonSignout"
import {useEffect, useState} from "react";
import {user} from "@/types/models";

const Navbar = () => {
    const {data: session} = useSession();
    const [userData, setUser] = useState<user>();
    useEffect(() => {
        fetch('/api/user')
            .then(response => {
                return response.json();
            })
            .then(data => {
                setUser(data);
            })
            .catch(err => {
                console.error('Error:', err);
            })
    },[]);

    return (
        <nav className="flex-between w-full mb-16 pt-4">
            <Link href="/" className="flex gap-4 flex-center">
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
                {session?.user ? (
                    <div className="flex-between gap-4 md:gap-8">
                        {/**Search Bar */}
                        {/*<input*/}
                        {/*    type="text"*/}
                        {/*    placeholder="Search for a football field"*/}
                        {/*    className="search_input peer"*/}
                        {/*    // todo implement functioning search bar*/}
                        {/*/>*/}
                        <NavButtonSignout/>
                        <Link href="/pages/History" className="blue_btn_2"> History </Link>
                        {userData?.access_level === "Owner" && (
                            <Link href="/pages/Income" className="yellow_btn_2"> Income </Link>
                        )}

                        <Link href="/dashboard/admin">
                            <Image
                                alt="Profile" src="/assets/images/profile_default.webp"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        </Link>
                    </div>
                ) : (	// else
                    // todo ganti ke sign in sama register option beneran
                    <div className="flex-between gap-4 md:gap-4">
                        <Link href="/auth/register" className="outline_btn">
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