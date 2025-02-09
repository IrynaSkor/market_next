import prisma from "@/src/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const orders = await prisma.order.findMany();
        return NextResponse.json(orders);
    }
    catch (error) {
        return NextResponse.json({ error: "Orders get error" }, { status: 500 });
    }
}