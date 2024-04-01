"use client";
import * as z from "zod";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import AuthCardWrapper from "./AuthCardWrapper";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    axios
      .post("/api/register", values)
      .then((data) => {
        if (data.status === 200) {
          setSuccess(data.data.message);
        }
      })
      .catch((res) => {
        setError(res.response.data);
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <AuthCardWrapper
      headerLabel="Create an account."
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="username"
                      {...field}
                      disabled={isLoading}
                      placeholder="John Doe"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="user-email"
                      {...field}
                      disabled={isLoading}
                      placeholder="john.doe@example.com"
                      type="email"
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="current-password"
                      {...field}
                      placeholder="******"
                      type="password"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isLoading} type="submit" className="w-full">
            Create account
          </Button>
        </form>
      </Form>
    </AuthCardWrapper>
  );
};

export default RegisterForm;
