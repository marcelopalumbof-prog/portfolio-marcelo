/**
 * Autenticação simples da área restrita `/calculadora`.
 *
 * A senha vem da variável de ambiente `CALCULATOR_PASSWORD` (nunca é
 * embutida no bundle do cliente). A sessão é um cookie httpOnly contendo o
 * hash SHA-256 da senha — assim o valor em claro nunca trafega nem fica
 * armazenado no navegador.
 *
 * ATENÇÃO: esta é uma proteção de conveniência (esconder a ferramenta
 * interna do público), não um sistema de contas multiusuário.
 */

import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Contrato mínimo do `cookieStore` do Next usado aqui.
 * Evita importar tipos de internals (`next/dist/...`), que mudam entre versões.
 */
interface CookieReader {
  get(name: string): { value: string } | undefined;
}

/** Nome do cookie de sessão da calculadora. */
export const CALC_AUTH_COOKIE = "zinck_calc_auth";

/** Hash SHA-256 (hex) de um valor. */
export function hashValue(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

/** Comparação em tempo constante (evita timing attacks triviais). */
export function safeEquals(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Senha configurada no servidor (undefined se ausente). */
export function getConfiguredPassword(): string | undefined {
  const password = process.env.CALCULATOR_PASSWORD;
  return password && password.length > 0 ? password : undefined;
}

/** Valida a senha enviada pelo formulário. */
export function isValidPassword(attempt: string): boolean {
  const expected = getConfiguredPassword();
  if (!expected) return false;
  return safeEquals(hashValue(attempt), hashValue(expected));
}

/** Hash que deve estar no cookie para a sessão ser considerada válida. */
export function expectedSessionHash(): string | undefined {
  const expected = getConfiguredPassword();
  return expected ? hashValue(expected) : undefined;
}

/** Verifica se o cookie atual autoriza o acesso. */
export function isAuthorized(cookieStore: CookieReader): boolean {
  const expected = expectedSessionHash();
  if (!expected) return false;
  const token = cookieStore.get(CALC_AUTH_COOKIE)?.value;
  if (!token) return false;
  return safeEquals(token, expected);
}
