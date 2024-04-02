import { signIn } from "@/auth";
import db from "@/db/db";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("LOGINBODY>>", body);

  const { email, password } = body;
  const existingUser = await db.user.findUnique({ where: { email } });
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return new NextResponse("Email does not exist", { status: 400 });
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    //send email
    // await sendVerificationEmail(
    //   verificationToken.email,
    //   verificationToken.token
    // );
    return NextResponse.json({
      message: "Confirmation email sent",
    });
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return new NextResponse("Invalid credentials", { status: 401 });

        default:
          return new NextResponse("Something went wrong", { status: 400 });
      }
    }
    throw error;
    // throw new error
  }
  return new NextResponse("Success", { status: 200 });
}
