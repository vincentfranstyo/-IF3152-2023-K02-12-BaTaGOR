import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from "@/components/Navbar" 

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BaTaGOR',
  description: 'Your Football Partner',
}

{/*Everything here will be present in all pages */}

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <html lang="en">
        <body>
            <div className="main">
                <div className='gradient'/>
            </div>
            
            {/**Calls the navbar to be present in all the pages */}
            <main className='app'>
                <Navbar/>   
                {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout
