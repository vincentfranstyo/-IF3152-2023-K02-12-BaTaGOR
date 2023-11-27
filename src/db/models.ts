import {user} from "@prisma/client"

interface User {
    users: user[]
}

export type { User }