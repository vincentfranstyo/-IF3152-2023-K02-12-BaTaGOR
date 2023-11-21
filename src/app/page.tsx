import {PrismaClient} from '@prisma/client';
import { User } from '@/db/models'

const prisma = new PrismaClient();

export async function users() {
    const users = await prisma.user.findMany();

    // Close the connection to the database
    await prisma.$disconnect();

    return {props: {users}};
}

function Home({ users }: User) {
    return (
        <div>
            {users.map(user => (
                <div key={user.user_id}>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            ))}
        </div>
    );
}

export default Home;
