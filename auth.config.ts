import { NextAuthConfig } from "next-auth";
import {
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "./routes";
import db from "./db/db";
import { UserRole } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { LoginSchema } from "./validations";
import bcryptjs from "bcryptjs";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        console.log("CREDENTIALS>>>>", credentials);
        const validatedFields = LoginSchema.safeParse(credentials);
        console.log("VAL>>", validatedFields);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          console.log("HERE>>", email);

          const user = await db.user.findUnique({ where: { email } });
          console.log("USER>>>", user);

          if (!user || !user.password) return null;

          const passwordsMatch = await bcryptjs.compare(
            password,
            user.password
          );
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
      const isAuthRoute = authRoutes.includes(nextUrl.pathname);
      if (isApiAuthRoute) {
        return true;
      }

      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return true;
      }
      if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl));
      }
      return true;
    },
    async signIn({ user, account }) {
      //allow oauth without email verif
      console.log("USER>", user, "ACC>>", account);

      if (account?.provider !== "credentials") return true;
      const existingUser = await db.user.findUnique({
        where: { id: user.id },
      });
      //Prevent sign in witout email verif
      if (!existingUser?.emailVerified) return false;
      //add 2FA check
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique(
          {
            where: { userId: existingUser.id },
          }
        );
        if (!twoFactorConfirmation) return false;

        //Delete two factor conformation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    // async jwt({ token }) {
    //   if (!token.sub) return token;
    //   const existingUser = await db.user.findUnique({
    //     where: { id: token.sub },
    //   });

    //   if (!existingUser) return token;
    //   const existingAccount = await db.account.findFirst({
    //     where: { userId: existingUser.id },
    //   });
    //   token.isOAuth = !!existingAccount;
    //   token.name = existingUser.name;
    //   token.email = existingUser.email;
    //   token.role = existingUser.role;
    //   token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
    //   return token;
    // },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
  },

  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: { emailVerified: new Date() },
      });
    },
  },
} satisfies NextAuthConfig;
