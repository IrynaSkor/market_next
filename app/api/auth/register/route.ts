import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/src/db/prisma";
import { Role } from "@/src/types/Role";


export async function POST(req: Request) {
    try {
        const { email, password, first_name, last_name, role = Role.User } = await req.json();

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "Email - alrady exist!" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, first_name, last_name, role },
        });

        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ error: "Registration error!" }, { status: 500 });
    }
}
