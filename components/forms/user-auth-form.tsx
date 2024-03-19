"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import React from "react";
import * as z from "zod";
import GoogleSignInButton from "../github-auth-button";
import Link from "next/link";
const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});
import crypto from 'crypto';
import { set } from "date-fns";

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const defaultValues = {
    email: "demo@demo.com.br",
    password: "12345678Demo!",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true)
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl:  callbackUrl ?? "/dashboard",
      redirect: false
    });

    if(result?.error){
      console.log(result)
      setLoading(false)
      return
    }
    
    router.replace('/dashboard')
    setLoading(false)


  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Digite sua senha..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading}  className="ml-auto w-full" type="submit">
           { loading ?     
           <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"

            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg> : 'Login' }
          </Button>
        </form>
      </Form>
      <div className="relative" >
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continue com
          </span>
        </div>
      </div>
      <GoogleSignInButton />
    </>
  );
}
