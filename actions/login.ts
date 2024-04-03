"use server";
import * as z from "zod";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { LoginSchema } from "@/validations";
import db from "@/db/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, code } = validatedFields.data;
  const existingUser = await db.user.findUnique({ where: { email } });

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" };
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email sent" };
  }
  // if (existingUser.isTwoFactorEnabled && existingUser.email) {
  //   if (code) {
  //     //verify 2fa code
  //     const twoFactorToken = await db.twoFactorToken.findFirst({
  //       where: { email: existingUser.email },
  //     });

  //     if (!twoFactorToken) {
  //       return { error: "Invalid code" };
  //     }
  //     if (twoFactorToken.token !== code) {
  //       return { error: "Invalid code" };
  //     }
  //     const hasExpired = new Date(twoFactorToken.expires) < new Date();
  //     if (hasExpired) {
  //       return { error: "Code expired" };
  //     }
  //     await db.twoFactorToken.delete({
  //       where: { id: twoFactorToken.id },
  //     });

  //     const existingConfirmation = await db.twoFactorConfirmation.findUnique({
  //       where: { userId: existingUser.id },
  //     });
  //     if (existingConfirmation) {
  //       await db.twoFactorConfirmation.delete({
  //         where: { id: existingConfirmation.id },
  //       });
  //     }

  //     await db.twoFactorConfirmation.create({
  //       data: { userId: existingUser.id },
  //     });
  //   } else {
  //     const twoFactorToken = await generateTwoFactorToken(existingUser.email);
  //     await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
  //     return { twoFactor: true };
  //   }
  // }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };

        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};