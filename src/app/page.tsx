{/**Home Page and Landing Page */}
import Feed from "../components/Feed"
import {PrismaClient} from '@prisma/client';
import { User } from '@/db/models'

const prisma = new PrismaClient();

export async function users() {
  const users = await prisma.user.findMany();

  // Close the connection to the database
  await prisma.$disconnect();

  return {props: {users}};
}

const Home = () => {
  // variable to keep the user status
  const isUserLogged = true;

  return (
    <section className="w-full flex-start flex-col mx-16">
      {isUserLogged?(
        <div>
          <h1 className="headline_text text-left blue_gradient">
          Welcome, Kean!  
          <br/>
        </h1>
        <h2 className="orange_gradient headline_subtext text-left">Where would you like to play?</h2>
        </div>
      ):(   //todo implement default page
        <div>
          <h1 className="headline_text text-left blue_gradient">
          Welcome to BaTaGOR
          <br/>
        </h1>
        <h2 className="orange_gradient headline_subtext text-left">Sign In to access our collection of football fields</h2>

        
        </div>
        
      )}

      <Feed />

      
    </section>
  )
}

export default Home