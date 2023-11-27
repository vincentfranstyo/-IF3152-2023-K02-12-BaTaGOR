import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/lib/utils";
import {NextResponse} from "next/server";
import {field} from "@/types/models";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {db} from "@/db/db";
import {hash} from "bcrypt";
import * as z from "zod"


export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const fields = await prisma.field.findMany({
            orderBy: {
                field_id: 'asc',
            },
        });
        // console.log('Fetched Fields:', fields);
        return NextResponse.json(fields, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching fields:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
}

const FieldSchema = z.object({
    field_id: z.number().min(1, "ID is required"),
    field_name: z.string(),
    street: z.string(),
    city: z.string(),
    province: z.string().min(1, "Province is required"),
    postal_code: z.number().min(1, "Postal code is required"),
    image_url: z.string().min(1, "Image URL is required"),
    rate_per_hour: z.number().min(1, "Rate per hour is required"),
    operational_status: z.string().min(1, "Operational status is required"),
    owner_id: z.number().min(1),
  });
  
  export async function POST(req: Request, res: NextApiResponse) {
    try {
      const body = await req.json();
      const {
        field_id,
        field_name,
        street,
        city,
        province,
        postal_code,
        image_url,
        rate_per_hour,
        operational_status,
        owner_id,
      } = FieldSchema.parse(body);
  
      // Check if the field_id already exists
      const existingFieldById = await db.field.findUnique({
        where: { field_id: field_id },
      });
  
      if (existingFieldById !== null) {
        return NextResponse.json(
          { field: null, message: "This field ID has already been registered" },
          { status: 409 }
        );
      }
  
      const newField = await db.field.create({
        data: {
          field_id,
          field_name,
          street,
          city,
          province,
          postal_code,
          image_url,
          rate_per_hour,
          operational_status,
          owner_id,
        },
      });
  
      return NextResponse.json(newField);
    } catch (error: any) {
      console.error("Error", error);
      return new Response("An error occurred", { status: 500 });
    }
  }