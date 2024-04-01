import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import db from "@/db/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Body>>", body);

    const { email, password, name } = body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return new NextResponse("Email already in use", { status: 400 });
    }

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    //TODO: Generate verication token by email
    return NextResponse.json({
      message: "Confirmation email sent",
    });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
