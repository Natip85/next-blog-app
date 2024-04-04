"use client";
import * as z from "zod";
import { profile } from "@/actions/profile";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProfileSchema } from "@/validations";
import { useState, useTransition } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@prisma/client";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Image from "next/image";
import { User2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const ProfilePage = () => {
  const user = useCurrentUser();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });
  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    startTransition(() => {
      profile(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            update();
            toast.success(data.success);
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleOpenDialog = () => {
    setOpen(!open);
  };
  return (
    <div className="container max-w-7xl flex justify-between gap-10">
      <div className="w-full sm:w-2/3 p-5">
        <h1 className="text-3xl sm:text-5xl font-semibold my-10">
          {user?.name}
        </h1>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="about">
              <TabsList className="bg-transparent">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              <Separator className="-mt-1" />
              <TabsContent value="about">
                Make changes to your about here.
              </TabsContent>
              <TabsContent value="account">
                <div className="space-y-4 px-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex justify-between items-center">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="John Doe"
                            disabled={isPending}
                            className="w-1/2 border-none focus-visible:ring-1 focus-visible:ring-offset-0 bg-gray-50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Role</FormLabel>
                        <Select
                          disabled={isPending}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-1/2 ring-offset-0 focus:outline-none focus:ring-0  focus:ring-offset-0">
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={UserRole.ADMIN}>
                              Admin
                            </SelectItem>
                            <SelectItem value={UserRole.USER}>User</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <div
                    onClick={handleOpenDialog}
                    className="flex items-center justify-between hover:cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        Profile information
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Edit your photo, name, bio, etc.
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>{user?.name}</span>
                      <span className="relative aspect-video">
                        {user?.image ? (
                          <Image
                            src={user?.image || ""}
                            alt="user profile picture"
                            width={30}
                            height={30}
                            className="object-cover rounded-full"
                          />
                        ) : (
                          <div className="bg-amber-400 rounded-full size-8 flex justify-center items-center">
                            <User2 className="rounded-full" />
                          </div>
                        )}
                      </span>
                    </div>
                  </div> */}
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger className="w-full">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-medium">
                            Profile information
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Edit your photo, name, bio, etc.
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span>{user?.name}</span>
                          <span className="relative aspect-video">
                            {user?.image ? (
                              <Image
                                src={user?.image || ""}
                                alt="user profile picture"
                                width={30}
                                height={30}
                                className="object-cover rounded-full"
                              />
                            ) : (
                              <div className="bg-amber-400 rounded-full size-8 flex justify-center items-center">
                                <User2 className="rounded-full" />
                              </div>
                            )}
                          </span>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
                <Separator className="mt-5" />
                <div className="flex justify-end my-5">
                  <Button
                    variant={"outline"}
                    disabled={isPending}
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="security">
                {user?.isOAuth === false && (
                  <div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex justify-between items-center">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="john.doe@example.com"
                              disabled={isPending}
                              type="email"
                              className="w-1/2 border-none focus-visible:ring-1 focus-visible:ring-offset-0 bg-gray-50"
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
                        <FormItem className="flex justify-between items-center">
                          <FormLabel>Current password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="******"
                              disabled={isPending}
                              type="password"
                              className="w-1/2 border-none focus-visible:ring-1 focus-visible:ring-offset-0 bg-gray-50"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem className="flex justify-between items-center">
                          <FormLabel>New password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="******"
                              disabled={isPending}
                              type="password"
                              className="w-1/2 border-none focus-visible:ring-1 focus-visible:ring-offset-0 bg-gray-50"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="mt-5 flex items-center justify-between">
                      <span>Two Factor Authentication</span>
                      <FormField
                        control={form.control}
                        name="isTwoFactorEnabled"
                        render={({ field }) => (
                          <FormItem className="flex w-1/2 items-center justify-between rounded-md border p-3 gap-3 shadow-sm">
                            <FormDescription className="text-xs">
                              Enable two factor authentication for your account
                            </FormDescription>

                            <FormControl>
                              <Switch
                                disabled={isPending}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
                <div className="flex justify-end my-5">
                  <Button
                    variant={"outline"}
                    disabled={isPending}
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </div>
      <div className="hidden sm:flex flex-col h-screen flex-1 border-l p-5">
        <span>
          {user?.image ? (
            <Image
              src={user?.image || ""}
              alt="user profile picture"
              width={100}
              height={100}
              className="object-cover rounded-full"
            />
          ) : (
            <div className="bg-amber-400 rounded-full size-24 flex justify-center items-center">
              <User2 className="rounded-full" size={75} />
            </div>
          )}
        </span>
        <h3 className="font-semibold mt-5">{user.name}</h3>
      </div>
    </div>
  );
};

export default ProfilePage;
