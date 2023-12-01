"use client"
import * as z from "zod"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "./ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "./ui/input";
import {Button} from "./ui/button";
import {useRouter} from "next/navigation"


const FormSchema = z
    .object({
        fieldName: z.string().max(100),
        fieldStreet: z.string(),
        fieldCity: z.string(),
        fieldProvince: z.string(),
        postalCode: z.string(),
        imageURL: z.string(),
        fieldPrice: z.string(),
        fieldStatus: z.string(),

    })

// The registration form
const AddForm = () => {
    // router start

    const router = useRouter();

    // form resolver + default values
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fieldName: "",
            fieldStreet: "",
            fieldCity: "",
            fieldProvince: "",
            postalCode: "",
            imageURL: "",
            fieldPrice: "",
            fieldStatus: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const fieldResponse = await fetch("/api/fields", {
            method: "GET"
        });

        const fieldsData = await fieldResponse.json();
        const length = fieldsData.length;

        const response = await fetch(`/api/fields`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                field_id           : length + 1,
                field_name         : values.fieldName,
                street             : values.fieldStreet,
                city               : values.fieldCity,
                province           : values.fieldProvince,
                postal_code        : Number(values.postalCode),
                image_url          : values.imageURL,
                rate_per_hour      : Number(values.fieldPrice),
                operational_status : values.fieldStatus,
                owner_id: 6
            })
        })
        if (response.ok) {
            router.push(`/`)
        }
    }

    return (
        <div className="relative flex flex-col items-center justify-center  overflow-hidden">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-bold text-center blue_gradient mb-4">Add Field</h1>

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
                                        <FormLabel className="font-inter">Field Province</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the field's province" {...field} />
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
                                    className="font-inter w-full px-4 py-6 tracking-wide text-white transition-colors duration-200 transform bg-orange-400 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-gray-600 text-md">Add</Button>
                        </div>

                    </form>
                </Form>
            </div>
            <br/>
            <br/>
        </div>

    );
}

export default AddForm