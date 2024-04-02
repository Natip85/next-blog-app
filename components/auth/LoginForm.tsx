"use client";
import * as z from "zod";
import Link from "next/link";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different account"
      : "";
  const [isLoading, setIsLoading] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    setError("");
    setSuccess("");
    axios
      .post("/api/login", values)
      .then((data) => {
        if (data.status === 200) {
          setSuccess(data.data.message);
          form.reset();
        }
      })
      .catch((res) => {
        setError(res.response.data);
        setIsLoading(false);
        form.reset();
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <AuthCardWrapper
      headerLabel="Welcome back."
      backButtonLabel="Dont't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="123456"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
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
                      <Button
                        size={"sm"}
                        variant={"link"}
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href={"/auth/reset"}>Forgot password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button disabled={isLoading} type="submit" className="w-full">
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </AuthCardWrapper>
  );
};

export default LoginForm;
