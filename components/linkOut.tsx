"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function LinkOut() {
    const router = useRouter();

    const handleOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        await signOut({ redirect: false });
        router.push("/");
        router.refresh();
    };

    return (
        <Link href="#" onClick={handleOut} className="navbar-brand">Sing Out</Link>
    );
}