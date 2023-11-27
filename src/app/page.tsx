// pages/app.tsx
"use client";
import {field} from "@/types/models";
import Feed from "../components/Feed";
import {useSession} from "next-auth/react";

import React, {useEffect, useState} from "react";
import Link from "next/link";


const Home: React.FC = () => {
    const { data: session } = useSession();
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
        <section className="w-full flex-start flex-col mx-16">
            {session?.user ? (
                <div>
                    <h1 className="headline_text text-left blue_gradient pb-4">
                        Welcome, {session?.user.username}
                        <br />
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
            <Feed fields={fields} />
        </section>
    );
};

export default Home;