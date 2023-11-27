import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {field} from "@/types/models"
import {PrismaClient} from "@prisma/client"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const prisma = new PrismaClient();
