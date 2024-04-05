import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ProfileSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { User2 } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { UploadButton } from "@/components/uploadthing";
import { toast } from "sonner";

export type UserImage = {
  key: string;
  name: string;
  url: string;
  size: number;
  serverData: ServerData;
};

type ServerData = {
  uploadedBy: string;
};
interface ProfileEditFormProps {
  closeDialog: () => void;
}
const ProfileEditForm = ({ closeDialog }: ProfileEditFormProps) => {
  const user = useCurrentUser();

  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState<UserImage[]>();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
      bio: user?.bio || undefined,
    },
  });
  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    console.log({ values });

    startTransition(() => {
      console.log("statrted transition");
    });
  };
  return (
    <>
      <div>
        <span className="text-sm text-muted-foreground">Photo</span>
        <div className="flex items-center gap-5 mt-2">
          <div>
            <span className="relative aspect-video">
              {user?.image ? (
                <Image
                  src={user?.image || ""}
                  alt="user profile picture"
                  width={100}
                  height={100}
                  className="object-cover rounded-full"
                />
              ) : (
                <div className="bg-amber-400 rounded-full size-20 flex justify-center items-center">
                  <User2 className="rounded-full" />
                </div>
              )}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm">
                <UploadButton
                  endpoint="imageUploader"
                  appearance={{
                    button: "bg-transparent text-green-600",
                    allowedContent: "hidden",
                  }}
                  onClientUploadComplete={(res) => {
                    setImages((prevImages) => {
                      if (prevImages && prevImages.length > 0) {
                        return [...prevImages, ...res];
                      } else {
                        return res;
                      }
                    });
                    toast("Upload complete");
                  }}
                  onUploadError={(error: Error) => {
                    closeDialog();
                    toast.error(error.message);
                  }}
                />
              </span>
              <span className="text-sm text-destructive">Remove</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per
              side.
            </div>
          </div>
        </div>
      </div>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 px-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
                      disabled={isPending}
                      className="w-full rounded-none bg-transparent border-t-0 border-r-0 border-l-0 border-b-[1.5px] border-black focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Appears on your Profile page, as your byline, and in your
                    comments.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      className="w-full rounded-none bg-transparent border-t-0 border-r-0 border-l-0 border-b-[1.5px] border-black focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Appears on your Profile and next to your stories.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              onClick={closeDialog}
              type="button"
              variant={"outline"}
              className="rounded-3xl"
            >
              Cancel
            </Button>
            <Button onClick={() => onSubmit} className="rounded-3xl">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProfileEditForm;
