import { NextResponse } from "next/server";
import prisma from "@/src/db/prisma";

export async function GET() {
    try {
        const items = await prisma.item.findMany();
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: "Items get error" }, { status: 500 });
    }
}