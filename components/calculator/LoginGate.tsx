"use client";

/**
 * Tela de login da área restrita `/calculadora`.
 * Usa Server Action (`loginAction`) — a senha é validada apenas no servidor.
 */

import { loginAction } from "@/app/calculadora/actions";

export function LoginGate({ hasError }: { hasError: boolean }) {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-gray-50 py-20 dark:bg-gray-900/50">
      <div className="container-section max-w-md">
        <div className="card">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 12.75v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>

          <h1 className="mt-5 text-center font-display text-2xl font-bold">
            Área restrita
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Calculadora de precificação e divisão — acesso exclusivo dos sócios.
          </p>

          <form action={loginAction} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                autoFocus
                aria-invalid={hasError}
                aria-describedby={hasError ? "login-error" : undefined}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                placeholder="••••••••"
              />
            </div>

            {hasError && (
              <p
                id="login-error"
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400"
              >
                Senha incorreta. Tente novamente.
              </p>
            )}

            <button type="submit" className="btn-primary w-full">
              Entrar
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-gray-500 dark:text-gray-400">
            A senha é definida na variável de ambiente{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-800">
              CALCULATOR_PASSWORD
            </code>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
