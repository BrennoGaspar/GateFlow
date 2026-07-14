"use client";

import Login from '@/util/signin';
import { useRouter } from "next/navigation";
import { useState } from 'react';

export default function LoginPage() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const submitEvent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // previne que o sistema recarregue a pagina ao submeter o formulário

    const {data, error} = await Login( email, password );

    if( error ) {
      alert(error.message);
      return;
    }

    if( data ) {
      router.push(`/home/user/packages`);
    }
  };

  return (

      <div className="flex-1 flex items-center justify-center">
        <form onSubmit={submitEvent} className="w-full max-w-md rounded-xl bg-[var(--card)] p-8 shadow-lg">

          <h1 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">
            Login
          </h1>

          <div className="mb-4 flex flex-col">
            <label htmlFor="email" className="mb-2 text-[var(--text-secondary)]">
              E-mail
            </label>
            <input id="email" type="email" value={email} onChange={handleChangeEmail} className="rounded-lg border border-[var(--border)] bg-transparent px-4 py-2 text-[var(--text-primary)] outline-none transition focus:border-[var(--primary)]"/>
          </div>

          <div className="mb-6 flex flex-col">
            <label htmlFor="password" className="mb-2 text-[var(--text-secondary)]">
              Senha
            </label>
            <input id="password" type="password" value={password} onChange={handleChangePassword} className="rounded-lg border border-[var(--border)] bg-transparent px-4 py-2 text-[var(--text-primary)] outline-none transition focus:border-[var(--primary)]"/>
          </div>

          <button type="submit" className="w-full rounded-lg bg-[var(--primary)] py-2 font-semibold text-white transition hover:bg-[var(--hover)]">
            Entrar
          </button>
        </form>
      </div>
    
  );
}
