// Income Page
"use client";
import {field} from "@/types/models";
import {useSession} from "next-auth/react";
import IncomeTable from "@/app/pages/Income/IncomeTable";

import React, {useEffect, useState} from "react";
import Link from "next/link";


const Home: React.FC = () => {
    const { data: session } = useSession();
    const [fields, setFields] = useState<field[]>([]);

    return (
        <section className="w-full flex-start flex-col mx-16">
            {session?.user ? (
                <div className="w-full">
                    <h1 className="headline_text text-left blue_gradient pb-4">
                        {session?.user.username}'s Income Page
                        <br />
                    </h1>
                    <h2 className="orange_gradient headline_subtext text-left">
                        Have a look at your fields' earnings
                    </h2>
                    <div className="w-3/4 bg-white/50 shadow-md justify-center my-8 mx-4 items-center rounded-md border-spacing-2">
                        {/**Table goes here */}
                        <IncomeTable/>
                    </div>
                </div>
            ) : (
                <div>
                    <h1 className="headline_text text-left blue_gradient">
                        You shouldn't be here D:
                    </h1>
                    <h2 className="orange_gradient headline_subtext text-left">
                        Sign In to your owner account to access your income page
                    </h2>
                </div>
            )}
            
        </section>
    );
};

export default Home;