"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Button from "./Button";
import "./globals.css";

export default function Header() {
    const { status, data: session } = useSession();

    if (status !== "authenticated" || !session) {
        return null;
    }

    const userName = session.user.name;
    const firstName = userName ? userName.split(" ")[0] : "";

    return (
        <div className="flex flex-col gap-4 justify-center p-4 items-center">
        <div className="">
        <strong className="text-zinc-700 flex gap-8 flex-wrap justify-center">
                                <Link href="/"> Voçe esta logado!! </Link>
                            </strong>
                            <strong className="text-zinc-700 flex gap-8 flex-wrap justify-center">
                                <Link href="/LoginUsuario"> Pagina Principal </Link>
                            </strong>
        </div>
        <span className="">
            {`Olá ${firstName}`}
        </span>
    
    
    
        <Button
    text="Sair"
    className="bg-orange-600 text-white rounded p-2 cursor-pointer"
    onClick={() => signOut({ callbackUrl: "/login" })}
/>
        </div>

    );
}
