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
import {useToast} from "@/components/ui/use-toast"

const FormSchema = z
    .object({
        username: z.string().min(1, "Username is required").max(30),
        fullName: z.string(),
        phoneNum: z.string(),
        email: z.string().min(1, "Email is required").email("Invalid email format"),
        password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters long"),
        confirmPassword: z.string().min(1, "Password Confirmation is required").min(8, "Password must be at least 8 characters long")

    })
    .refine((data) => data.password === data.confirmPassword, {  // password and confirmation has to be the same
        path: ["confirmPassword"],
        message: "Passwords do not match",
    })

// The registration form
const RegisterForm = () => {
    // router start
    const router = useRouter();
    // toast for password error notification
    const {toast} = useToast()
    // form resolver + default values
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            fullName: "",
            phoneNum: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    // Function to call the POST function to the user database
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const response = await fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: values.username,
                name: values.fullName,
                phone_num: values.phoneNum,
                email: values.email,
                unhashed_pass: values.password,
                access_level: "Customer"
            })
        })
        if (response.ok) {
            router.push("/auth/SignIn")
        } else {
            toast({
                title: "Error",
                description: "Registration failed, please try again",
            })
        }
    }

    return (
        <div className="relative flex flex-col items-center justify-center  overflow-hidden">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                <div className="mb-2 justify-center items-center flex">
                    <Image
                        alt="Logo"
                        src="/assets/icons/football.png"
                        width={40}
                        height={40}
                        className="rounded-full object-contain"
                    />
                </div>
                <h1 className="text-3xl font-bold text-center blue_gradient mb-4">BaTaGOR</h1>

                {/**Form section */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="font-inter">Username</FormLabel>
                                        <FormControl>
                                            <Input type="username" placeholder="Enter your username" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="font-inter">Full Name</FormLabel>
                                        <FormControl>
                                            <Input type="fullName" placeholder="Enter your full name" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phoneNum"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="font-inter">Phone Number</FormLabel>
                                        <FormControl>
                                            <Input type="phoneNum" placeholder="Enter your phone number" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="font-inter">Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="mail@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="font-inter">Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter your password" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="font-inter">Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Re-enter your password" {...field} />
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
                        <p className="mt-4 text-sm text-center text-gray-700 font-inter">
                            Already have an account?{" "}
                            <Link
                                href="/auth/SignIn"
                                className="font-medium text-blue-600 hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                    </form>
                </Form>
            </div>
            <br/>
            <br/>
        </div>

    );
}

export default RegisterForm