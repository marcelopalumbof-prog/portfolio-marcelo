"use client";

/**
 * MÓDULO A — Seção pública "Tabela de Preço".
 *
 * Abas por categoria + cards de serviço (nome, "a partir de R$",
 * entregáveis, prazo médio e CTA "Solicitar proposta").
 * Reutiliza o design system existente: `container-section`, `section-title`,
 * `card`, `btn-primary`/`btn-secondary` e a paleta `brand`.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import {
  agencyPricingNote,
  agencyServices,
  pricingCategories,
  type PricingCategoryId,
} from "@/data/agency-pricing";
import { profile } from "@/data/profile";
import { formatBRL } from "@/lib/format";

/** Ícone de check reutilizado do componente `Pricing` original. */
function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-brand-500"
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/** Ícone de relógio (prazo médio). */
function ClockIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export function PricingTable() {
  const [activeTab, setActiveTab] = useState<PricingCategoryId>("sites");

  const activeCategory =
    pricingCategories.find((category) => category.id === activeTab) ??
    pricingCategories[0];

  const services = agencyServices.filter(
    (service) => service.category === activeTab,
  );

  /** Link de WhatsApp já preenchido com o serviço escolhido. */
  const proposalUrl = (serviceName: string) =>
    `https://wa.me/${profile.social.whatsapp}?text=${encodeURIComponent(
      `Olá, ${profile.name}! Gostaria de solicitar uma proposta para: ${serviceName}.`,
    )}`;

  return (
    <section id="tabela-precos" className="bg-gray-50 py-20 dark:bg-gray-900/50">
      <div className="container-section">
        {/* Cabeçalho da seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="section-title">Tabela de Preço</h1>
          <p className="section-subtitle">
            Conheça nossos serviços, entregáveis e prazos médios. Escolha a
            categoria e solicite uma proposta personalizada.
          </p>
        </motion.div>

        {/* Abas por categoria (acessíveis: role=tablist + teclado) */}
        <div className="mt-8 flex justify-center">
          <div
            role="tablist"
            aria-label="Categorias de serviços"
            className="inline-flex flex-wrap justify-center gap-1 rounded-lg bg-gray-200 p-1 dark:bg-gray-800"
          >
            {pricingCategories.map((category) => {
              const isActive = category.id === activeTab;
              return (
                <button
                  key={category.id}
                  role="tab"
                  id={`tab-${category.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${category.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(category.id)}
                  className={`rounded-md px-5 py-2.5 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                    isActive
                      ? "bg-white text-brand-600 shadow-sm dark:bg-gray-900"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Descrição da categoria ativa */}
        <p
          id={`panel-${activeCategory.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeCategory.id}`}
          className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          {activeCategory.description}
        </p>

        {/* Grid de cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`card relative flex flex-col ${
                service.popular ? "border-brand-500 ring-2 ring-brand-500" : ""
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                    Mais procurado
                  </span>
                </div>
              )}

              <div className="flex-1">
                <h2 className="font-display text-lg font-bold">{service.name}</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {service.description}
                </p>

                {/* Valor */}
                <div className="mt-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    a partir de
                  </span>
                  <div className="font-display text-3xl font-bold text-brand-600 dark:text-brand-400">
                    {formatBRL(service.basePrice)}
                    {service.period && (
                      <span className="text-base font-normal text-gray-500">
                        {service.period}
                      </span>
                    )}
                  </div>
                </div>

                {/* Entregáveis */}
                <h3 className="mt-6 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Entregáveis
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prazo médio */}
              <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-800">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <ClockIcon />
                  Prazo médio: {service.avgTimeline}
                </div>
              </div>

              {/* CTA */}
              <a
                href={proposalUrl(service.name)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 w-full text-center ${
                  service.popular ? "btn-primary" : "btn-secondary"
                }`}
                aria-label={`Solicitar proposta para ${service.name}`}
              >
                Solicitar proposta
              </a>
            </motion.article>
          ))}
        </div>

        {/* Observação obrigatória */}
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-gray-500 dark:text-gray-400">
          {agencyPricingNote}
        </p>
      </div>
    </section>
  );
}
