"use client"

import Link from "next/link";
import Image from "next/image"
import * as z from "zod"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "./ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "./ui/input";
import {Button} from "./ui/button";
import {signIn} from "next-auth/react"
import {useRouter} from "next/navigation"
import {useToast} from "@/components/ui/use-toast"

const FormSchema = z.object({
    username: z.string(),
    password: z.string().min(1, "Password is required")
})

const SignInForm = () => {
    //router setup
    const router = useRouter();

    // toast for password error notification
    const {toast} = useToast()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    // signing in the user upon submission
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const signInData = await signIn('credentials', {     // credentials is the provider, can be replaced with google etc
            username: values.username,
            password: values.password,
            redirect: false,
        });
        console.log(signInData)

        if (signInData?.error) {
            toast({
                title: "Error",
                description: "Sorry, invalid credentials",
            })
        } else {
            router.push("/");
            router.refresh();
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
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input type="username" placeholder="Enter your username" {...field} />
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
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter your password" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mt-8">
                            <Button type="submit"
                                    className="w-full px-4 py-6 tracking-wide text-white transition-colors duration-200 transform bg-orange-400 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-gray-600 text-md">Sign In</Button>
                        </div>
                        <p className="mt-4 text-sm text-center text-gray-700">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/auth/Register"
                                className="font-medium text-blue-600 hover:underline"
                            >
                                Register here
                            </Link>
                        </p>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default SignInForm