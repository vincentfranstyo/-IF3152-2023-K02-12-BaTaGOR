import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {field} from "@/types/models"
import {PrismaClient} from "@prisma/client"

export const prisma = new PrismaClient()

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export default function formatDateString(dateString: string): string {
    const [month, day, year] = dateString.split("/");
    return `${day}/${month}/${year}`;
}