import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  // ✅ Para Credentials, usar JWT es lo más estable
  session: { strategy: "jwt" },

  pages: {
    signIn: "/admin/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password ?? "";

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return { id: user.id, email: user.email, name: user.name ?? "Admin" };
      },
    }),
  ],

  callbacks: {
    // ✅ Guardamos id en el token cuando el usuario inicia sesión
    async jwt({ token, user }) {
      if (user) {
        (token as any).id = (user as any).id;
      }
      return token;
    },

    // ✅ Pasamos id a session.user.id desde token
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = (token as any).id ?? token.sub;
      }
      return session;
    },
  },
};
