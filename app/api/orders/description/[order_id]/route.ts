import prisma from "@/src/db/prisma";
import { NextResponse } from "next/server";


export async function GET(req: Request, context: { params: Promise<{ order_id: string }> }) {
    try {
        const { order_id } = await context.params;
        const OrderId = Number(order_id);
        if (isNaN(OrderId))
            return NextResponse.json({ error: "id format error" }, { status: 400 });

        const details = await prisma.order_description.findMany({
            where: { order_id: OrderId },
            include: { item: true, order: true }
        });
        if (details.length === 0) {
            return NextResponse.json({ error: "Order details not found" }, { status: 400 });
        }
        return NextResponse.json(details);
    } catch (error) {
        return NextResponse.json({ error: "Cant get details" + error }, { status: 400 });
    }
}