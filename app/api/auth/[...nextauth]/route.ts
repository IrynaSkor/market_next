import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/src/db/prisma";
import { Session } from "inspector/promises";
import { JWT } from "next-auth/jwt";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", required: true },
                password: { label: "Password", type: "password", required: true },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    throw new Error("User not found");
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) {
                    throw new Error("Incorrect password");
                }

                return {
                    id: user.id.toString(),
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.first_name = user.first_name;
                token.last_name = user.last_name;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = String(token.id);
                session.user.role = String(token.role);
                session.user.first_name = String(token.first_name);
                session.user.last_name = String(token.last_name);
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
