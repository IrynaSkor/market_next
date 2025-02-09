import prisma from "@/src/db/prisma";
import { Role } from "@/src/types/Role";
import { error } from "console";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { it } from "node:test";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const itemId = Number(id);
    if (isNaN(itemId))
        return NextResponse.json({ error: "id format error" }, { status: 400 });
    const item = await prisma.item.findUnique({ where: { id: itemId } })
    if (!item)
        return NextResponse.json({ error: "Item not found" }, { status: 404 });

    return NextResponse.json(item);
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== Role.Admin)
        return NextResponse.json({ error: "User role does not have access!" }, { status: 403 });

    try {
        const { name, description, price } = await req.json();

        if (!name || !description || price === undefined || isNaN(Number(price)) || Number(price) == 0)
            return NextResponse.json({ error: "Not valid value" }, { status: 422 });

        const item = await prisma.item.create({ data: { name, description, price: Number(price) } });
        return NextResponse.json({ item }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Can`t creat item" + error }, { status: 500 });
    }
}

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== Role.Admin)
        return NextResponse.json({ error: "User role does not have access!" }, { status: 403 });

    const { id } = await context.params;
    const itemId = Number(id);
    if (isNaN(itemId))
        return NextResponse.json({ error: "id format error" }, { status: 400 });

    const cur_item = await prisma.item.findUnique({ where: { id: itemId } });
    const { name, description, price } = await req.json();
    if (!cur_item || !name || !price)
        return NextResponse.json({ error: "Item no data!" }, { status: 404 });

    const item = await prisma.item.update({
        where: { id: itemId },
        data: { name, description, price }
    });

    return NextResponse.json(item);
}