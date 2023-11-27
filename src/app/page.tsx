// pages/app.tsx
"use client";
import {field, user} from "@/types/models";
import Feed from "../components/Feed";
import {useSession} from "next-auth/react";

import React, {useEffect, useState} from "react";
import {IoAddCircle} from "react-icons/io5";
import Link from "next/link";

const Home: React.FC = () => {
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
    }, []);

    const [fields, setFields] = useState<field[]>([]);
    // console.log(session)

    useEffect(() => {
        fetch('/api/fields')
            .then(response => {
                // console.log('API response:', response);
                return response.json();
            })
            .then(data => {
                // console.log('API data:', data);
                setFields(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div className={"flex flex-col max-w-[1200px] justify-center items-center mx-auto"}>
            <section className="w-full flex-start flex-col mx-16">
                {session?.user ? (
                    <div>
                        <h1 className="headline_text text-left blue_gradient pb-4">
                            Welcome, {session?.user.username}
                            <br/>
                        </h1>
                        {/*<Link href="/api/field/route">*/}
                        {/*    <button className="bg-white font-bold py-2 px-1 mx-auto border">*/}
                        {/*        test*/}
                        {/*    </button>*/}
                        {/*</Link>*/}
                        <h2 className="orange_gradient headline_subtext text-left">
                            Where would you like to play?
                        </h2>
                    </div>
                ) : (
                    <div>
                        <h1 className="headline_text text-left blue_gradient">
                            Welcome to BaTaGOR
                        </h1>
                        <h2 className="orange_gradient headline_subtext text-left">
                            Sign In to access our collection of football fields
                        </h2>
                    </div>
                )}
                <div className="feed_container">
                    {userData?.access_level === "Owner" && (
                        <Link href={"/pages/FieldAdd"}>
                            <button className={"w-full items-center justify-center" +
                                " border-none flex flex-col"}>
                                <IoAddCircle size={50}/>
                            </button>
                        </Link>
                    )
                    }
                    <Feed fields={fields}/>
                </div>
            </section>
        </div>
    );
};

export default Home;