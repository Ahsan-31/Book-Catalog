import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user || !user.password) {
            return null;
          }

          // Additional check to ensure email exists (since DB might allow null)
          if (!user.email) {
            return null;
          }

          const isValid = await compare(credentials.password, user.password);
          if (!isValid) {
            return null;
          }

          // Return user object that matches your NextAuth User type
          return {
            id: user.id,
            email: user.email, // TypeScript now knows this is string, not string | null
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // When user signs in for the first time
      if (user && account) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Make sure all required fields are present
      if (token && token.id && token.email) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string | null,
          image: token.image as string | null,
        };
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
