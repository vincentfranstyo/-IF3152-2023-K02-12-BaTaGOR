import type {Metadata} from 'next'
import './globals.css'
import Navbar from "@/components/Navbar"
import {Toaster} from "@/components/ui/toaster"
import Provider from "@/components/Provider"
import React from "react";

export const metadata: Metadata = {
    title: 'BaTaGOR',
    description: 'Your Football Partner',
}

{/*Everything here will be present in all pages */
}

const RootLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <html lang="en">
        <body>
        <Provider>
            <div className="main">
                <div className='gradient'/>
            </div>
            {/**Calls the navbar to be present in all the pages */}
            <main className='app'>
                <Navbar/>
                {children}
            </main>
            <Toaster/>
        </Provider>
        </body>
        </html>
    )
}

export default RootLayout
