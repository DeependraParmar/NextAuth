'use client';
import CardWrapper from './card-wrapper'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormLabel, FormMessage, FormItem } from '@/components/ui/form'
import * as z from "zod";
import { LoginSchema } from '@/schemas'
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';


export const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        console.log(values);
    }

    return (
        <CardWrapper headerLabel='Welcome Back' backButtonLabel="Don't have an account?" backButtonHref='/auth/register' showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <div className='space-y-4'>
                        <FormField control={form.control} name='email' render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} type='email' placeholder={'john.doe@example.com'} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='password' render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} type='password' placeholder={'**********'} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <Button typeof='submit' className='w-full'>Login</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}