{/**Home Page and Landing Page */}
import Feed from "../components/Feed"
import {PrismaClient} from '@prisma/client';
import {getServerSession} from "next-auth"
import {authOptions} from "@/lib/auth"
import {field} from "@/types/models"

const prisma = new PrismaClient();

export async function users() {
    const users = await prisma.user.findMany();
    await prisma.$disconnect();
    return {props: {users}};
}

export async function fields() {
    const fields = await prisma.field.findMany();
    await prisma.$disconnect();
    return {props: {fields}};
}

const Home = async () => {
    // logged in user data
    const session = await getServerSession(authOptions)

    return (
        <section className="w-full flex-start flex-col mx-16">
            {session?.user ? (<div>
                    <h1 className="headline_text text-left blue_gradient pb-4">
                        Welcome, {session?.user.username}
                        <br/>
                    </h1>
                    <h2 className="orange_gradient headline_subtext text-left">Where would you like to play?</h2>
                </div>) : (   //todo implement default page
                <div>
                    <h1 className="headline_text text-left blue_gradient">
                        Welcome to BaTaGOR
                        <br/>
                    </h1>
                    <h2 className="orange_gradient headline_subtext text-left">Sign In to access our collection of football fields</h2>
                </div>
            )}
            <Feed />
        </section>)
}

export default Home