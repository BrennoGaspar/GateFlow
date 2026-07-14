import { Calendar, Package, User } from "lucide-react";

interface PackageCardProps {
  nomeNota: string;
  dataHora: string;
  status: string;
  apartamento: number;
}

export default function PackageCard({
  nomeNota,
  dataHora,
  status,
  apartamento,
}: PackageCardProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow transition hover:border-[var(--primary)]">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <Package
            size={24}
            className="mt-1 text-[var(--primary)]"
          />

          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              {nomeNota}
            </h2>

            <p className="text-sm text-[var(--text-secondary)]">
              Nova encomenda registrada
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            status === "Pendente"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-green-500/20 text-green-400"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
          <Calendar size={18} />
          {new Date(dataHora).toLocaleString("pt-BR")}
        </div>

        <div className="flex items-center gap-2 text-[var(--text-secondary)]">
          <User size={18} />
          Apartamento {apartamento}
        </div>
      </div>

      <div className="mt-6 border-t border-[var(--border)] pt-4">
        <button className="w-full rounded-lg bg-[var(--primary)] py-2 text-white transition hover:bg-[var(--hover)]">
          Ver detalhes
        </button>
      </div>
    </div>
  );
}