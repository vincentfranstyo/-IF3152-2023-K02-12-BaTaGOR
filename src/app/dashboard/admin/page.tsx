import{authOptions} from "@/lib/auth"
import {getServerSession} from "next-auth"

const page = async () => {
  const session = await getServerSession(authOptions)

  if(session?.user){
    return <h2 className="orange_gradient font-inter text-4xl">Admin Page - Welcome back {session?.user.username}</h2>
  } 

  return <h2 className="orange_gradient font-inter text-4xl">Please log in to access this feature</h2>
  
}

export default page