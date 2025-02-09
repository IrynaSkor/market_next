import prisma from "@/src/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    }
    catch (error) {
        return NextResponse.json({ error: "Users get error" }, { status: 500 });
    }
}