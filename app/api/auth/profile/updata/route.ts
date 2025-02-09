import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/src/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../[...nextauth]/route";


export async function POST(req: Request) {
    try {
        const { email, password, new_password, first_name, last_name } = await req.json();
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const current_user = await prisma.user.findUnique({ where: { id: Number(session.user.id) } });
        if (!current_user) {
            return NextResponse.json({ error: "User not found!" }, { status: 401 });
        }

        const isPasswordCorrect = await bcrypt.compare(password, current_user?.password);
        if (!isPasswordCorrect)
            return NextResponse.json({ error: "Incorrect current password!" }, { status: 400 });

        const user = await prisma.user.findUnique({ where: { email } });
        if (user && current_user.id !== user.id) {
            return NextResponse.json({ error: "This email is already taken!" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(new_password, 10);
        const updatedUser = await prisma.user.update({
            where: { id: current_user.id },
            data: {
                first_name,
                last_name,
                email,
                password: hashedPassword
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        return NextResponse.json({ error: "Updata profile error!" }, { status: 500 });
    }
}
