import prisma from "@/src/db/prisma";
import { Role } from "@/src/types/Role";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const userId = Number(id);
    if (isNaN(userId))
        return NextResponse.json({ error: "id format error" }, { status: 400 });
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user)
        return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user);
}


export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== Role.Admin)
        return NextResponse.json({ error: "User role does not have access!" }, { status: 403 });

    const { id } = await context.params;
    const userId = Number(id);
    if (isNaN(userId))
        return NextResponse.json({ error: "id format error" }, { status: 400 });

    const cur_user = await prisma.user.findUnique({ where: { id: userId } });
    const { first_name, last_name, role } = await req.json();
    if (!cur_user || !first_name || !last_name)
        return NextResponse.json({ error: "User no data!" }, { status: 404 });

    const item = await prisma.user.update({
        where: { id: userId },
        data: { first_name, last_name, role }
    });

    return NextResponse.json(item);
}