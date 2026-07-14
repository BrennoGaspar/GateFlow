"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Package, Users, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

const menuItems = [
    {
    title: "Encomendas",
    href: "/home/user/packages",
    icon: Package,
    },
    {
    title: "Moradores",
    href: "/home/user/residents",
    icon: Users,
    }
];

export default function Sidebar() {

    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        const {error} = await supabase.auth.signOut();

        if( error ) {
            alert(error.message);
            return;
        }

        router.replace("/");
        router.refresh();
    }

    const [usuario, setUsuario] = useState<{nome: string; tipo: string} | null>(null);

    useEffect(() => {
        async function carregarUsuario() {
            const {
            data: { user },
            } = await supabase.auth.getUser();

            if (!user) return;

            const { data, error } = await supabase
                .from("usuario")
                .select("nome, tipo")
                .eq("id", user.id)
                .single();

            if (!error) {
                setUsuario(data);
            }
        }

        carregarUsuario();
    }, []);

    return (
        <aside className="flex h-screen w-64 flex-col border-r border-[var(--border)] bg-[var(--card)]">

            <div className="border-b border-[var(--border)] p-6">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                Gate<span className="text-[var(--text-secundary)]">Flow</span>
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
                Sistema para Condomínio
            </p>
            </div>

            {/* Menu */}
            <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
                {menuItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                    <li key={item.href}>
                    <Link href={item.href} className={`flex items-center gap-3 rounded-lg px-4 py-3 transition
                        ${
                            active
                            ? "bg-[var(--primary)] text-white"
                            : "text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--text-primary)]"
                        }`}
                    >
                        <Icon size={20} />
                        {item.title}
                    </Link>
                    </li>
                );
                })}
            </ul>
            </nav>

            {/* Usuário */}
            <div className="border-t border-[var(--border)] p-4">
            <div className="mb-4">
                <p className="font-semibold text-[var(--text-primary)]">
                    {usuario?.nome ?? "..."}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                    {usuario?.tipo ?? "..."}
                </p>
            </div>

            <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-400 transition hover:bg-red-500/10">
                <LogOut size={20} />
                Sair
            </button>
            </div>
        </aside>
    );
}