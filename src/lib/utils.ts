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


export const getRandomRating = (field: field) => {
    const minRating = 3.5;
    const maxRating = 4.8;

    // Seed the random number generator based on fieldId
    const seed = parseInt(String(field.field_id), 10);
    const randomRating = Math.random() * (maxRating - minRating) + minRating + seed;

    // Ensure the rating is within the specified range
    return parseFloat(randomRating.toFixed(1));
};
