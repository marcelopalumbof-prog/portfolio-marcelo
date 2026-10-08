"use server";

/**
 * Server Actions da área restrita `/calculadora`.
 * Toda a validação acontece no servidor — a senha nunca chega ao cliente.
 */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  CALC_AUTH_COOKIE,
  expectedSessionHash,
  isValidPassword,
} from "@/lib/auth";

/** Validade da sessão: 12 horas. */
const SESSION_MAX_AGE = 60 * 60 * 12;

/**
 * Autentica o usuário. Em caso de falha redireciona com `?erro=1`
 * (nenhum dado sensível é exposto na URL).
 */
export async function loginAction(formData: FormData): Promise<void> {
  const password = String(formData.get("password") ?? "");

  if (!isValidPassword(password)) {
    redirect("/calculadora?erro=1");
  }

  const token = expectedSessionHash();
  if (!token) {
    // Nenhuma senha configurada no servidor: acesso negado.
    redirect("/calculadora?erro=1");
  }

  cookies().set(CALC_AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect("/calculadora");
}

/** Encerra a sessão e volta para a tela de login. */
export async function logoutAction(): Promise<void> {
  cookies().delete(CALC_AUTH_COOKIE);
  redirect("/calculadora");
}
