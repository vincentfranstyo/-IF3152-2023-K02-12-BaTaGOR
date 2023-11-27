"use client";
import React, {useEffect, useState} from "react";
import {field, history, booking, user} from "@/types/models";
import History from "@/components/History";
import {useSession} from "next-auth/react";

const HistoryPage: React.FC = () => {
    const {data: session} = useSession();
    const [userData, setUser] = useState<user>();
    const [histories, setHistories] = useState<history[]>([]);
    useEffect(() => {
        fetch('/api/archives')
            .then(response => {
                // console.log('API response:', response);
                return response.json();
            })
            .then(data => {
                console.log('API data:', data);
                setHistories(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

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
        <section className="w-full flex-start flex-col mx-16">
            {userData?.access_level === "Customer" && (
                <History histories={histories}/>
            )}
            {userData?.access_level === "Staff" && (
                <History histories={histories}/>
            )}
        </section>
    );
}

export default HistoryPage;