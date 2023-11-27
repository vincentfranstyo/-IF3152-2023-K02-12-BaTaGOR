"use client"

import Link from "next/link";
import Image from "next/image"
import * as z from "zod"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "./ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "./ui/input";
import {Button} from "./ui/button";
import {useRouter} from "next/navigation"
import {db} from "@/db/db";
import { prisma } from "@/lib/utils";


interface FieldEditProps{
    params:{
        id: string
    }
}

const FormSchema = z
    .object({
        fieldName: z.string().max(100),
        fieldStreet: z.string(),
        fieldCity: z.string(),
        fieldProvince: z.string(),
        postalCode: z.number().int(),
        imageURL: z.string(),
        fieldPrice: z.number().int(),
        fieldStatus: z.string(),

    })

// The registration form
const RegisterForm = () => {
    // router start
        
    const router = useRouter();

    // CRACKHOUSE ASS CODEEEEEEEEE SIALAN KAU REACT NEXTJS 
    const idbknint = window.location.pathname.split("/").slice(-1)[0] // JELEKKKKKKKKKKK TAPI YANG PENTING BISA
    const id = parseInt(idbknint)

    // form resolver + default values
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fieldName: "",
            fieldStreet: "",
            fieldCity: "",
            fieldProvince: "",
            postalCode: 0,
            imageURL: "",
            fieldPrice: 0,
            fieldStatus: "",
        }
    })

    // Function to call the POST function to the user database
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        
        const response = await fetch(`/api/fields/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                field_id           : id,
                field_name         : values.fieldName,
                street             : values.fieldStreet,
                city               : values.fieldCity,
                province           : values.fieldProvince,
                postal_code        : values.postalCode,
                image_url          : values.imageURL,
                rate_per_hour      : values.fieldPrice,
                operational_status : values.fieldStatus,
            })
        })
        if (response.ok) {
            router.push(`/pages/FieldInfo/${id}`)
        }
        
    }

  

    return (
        <div className="relative flex flex-col items-center justify-center  overflow-hidden">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-bold text-center blue_gradient mb-4">Edit Field</h1>

                {/**Form section */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="fieldName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="font-inter">Field Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the field name" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fieldStreet"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="font-inter">Field Street</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the field's street" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="fieldCity"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="font-inter">Field City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the field's city" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="fieldProvince"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="font-inter">Field City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the field's city" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="postalCode"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="font-inter">Postal Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the field's postal code" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="imageURL"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="font-inter">Image URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the field's image URL" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="fieldPrice"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="font-inter">Price per Hour</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the field's price per hour" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="fieldStatus"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="font-inter">Field Status</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the field's active status" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mt-8">
                            <Button type="submit"
                                    className="font-inter w-full px-4 py-6 tracking-wide text-white transition-colors duration-200 transform bg-orange-400 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-gray-600 text-md">Register</Button>
                        </div>
            
                    </form>
                </Form>
            </div>
            <br/>
            <br/>
        </div>

    );
}

export default RegisterForm