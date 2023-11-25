import {field} from "@/types/models";

{/**Home Page and Landing Page */}
import Feed from "../components/Feed"
import {PrismaClient} from '@prisma/client';
import {getServerSession} from "next-auth"
import {authOptions} from "@/lib/auth"

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
    const fields: (field[]) = [
        {
            field_id: 1,
            field_name: "VF's Fields",
            street: "Jalan Tubagus Ismail Raya No.23",
            city: "Bandung",
            province: "Jawa Barat",
            postal_code: 42330,
            image_url: "/assets/images/futsal_placeholder_1.jpg",
            rate_per_hour: 10000,
            operational_status: "available",
            owner_id: 6
        },
        {
            field_id: 2,
            field_name: "Duke of Gawangan",
            street: "Jalan Ciheulang Baru No.12",
            city: "Bandung",
            province: "Jawa Barat",
            postal_code: 45331,
            image_url: "/assets/images/futsal_placeholder_2.jpg",
            rate_per_hour: 12000,
            operational_status: "available",
            owner_id: 6
        },
        {
            field_id: 3,
            field_name: "Farhan Algani GOR",
            street: "Jalan Cisitu Lama XVII No. 49",
            city: "Bandung",
            province: "Jawa Barat",
            postal_code: 42348,
            image_url: "/assets/images/futsal_placeholder_2.jpg",
            rate_per_hour: 15000,
            operational_status: "available",
            owner_id: 6
        },
        {
            field_id: 4,
            field_name: "VF's Fields",
            street: "Jalan Tubagus Ismail Raya No.23",
            city: "Bandung",
            province: "Jawa Barat",
            postal_code: 42330,
            image_url: "/assets/images/futsal_placeholder_1.jpg",
            rate_per_hour: 10000,
            operational_status: "available",
            owner_id: 6
        },
        {
            field_id: 5,
            field_name: "Duke of Gawangan",
            street: "Jalan Ciheulang Baru No.12",
            city: "Bandung",
            province: "Jawa Barat",
            postal_code: 45331,
            image_url: "/assets/images/futsal_placeholder_2.jpg",
            rate_per_hour: 12000,
            operational_status: "available",
            owner_id: 6
        },
        {
            field_id: 6,
            field_name: "Farhan Algani GOR",
            street: "Jalan Cisitu Lama XVII No. 49",
            city: "Bandung",
            province: "Jawa Barat",
            postal_code: 42348,
            image_url: "/assets/images/futsal_placeholder_2.jpg",
            rate_per_hour: 15000,
            operational_status: "available",
            owner_id: 6
        }
    ]
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
            <Feed fields={fields}/>
        </section>)
}

export default Home