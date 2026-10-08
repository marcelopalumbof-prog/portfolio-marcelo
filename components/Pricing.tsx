"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { pricingPlans, pricingNote, type PricingTab } from "@/data/pricing";
import { profile } from "@/data/profile";

export function Pricing() {
  const [activeTab, setActiveTab] = useState<PricingTab>("sites");

  const filteredPlans = pricingPlans.filter((p) => p.tab === activeTab);

  const whatsappUrl = (planName: string) =>
    `https://wa.me/${profile.social.whatsapp}?text=${encodeURIComponent(`Olá, Marcelo! Gostaria de solicitar um orçamento para: ${planName}`)}`;

  return (
    <section id="precos" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="section-title">Tabela de Preços</h2>
          <p className="section-subtitle">
            Valores transparentes e sem surpresas. Escolha o plano ideal para seu projeto.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-lg bg-gray-200 dark:bg-gray-800 p-1">
            <button
              onClick={() => setActiveTab("sites")}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                activeTab === "sites"
                  ? "bg-white dark:bg-gray-900 text-brand-600 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900"
              }`}
            >
              Criação de Sites
            </button>
            <button
              onClick={() => setActiveTab("trafego")}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                activeTab === "trafego"
                  ? "bg-white dark:bg-gray-900 text-brand-600 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900"
              }`}
            >
              Tráfego Pago
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`card relative flex flex-col ${
                plan.popular
                  ? "ring-2 ring-brand-500 border-brand-500"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-brand-600 text-white text-xs font-semibold">
                    Mais Procurado
                  </span>
                </div>
              )}

              <div className="flex-1">
                <h3 className="font-display text-lg font-bold">{plan.name}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {plan.description}
                </p>

                <div className="mt-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">a partir de</span>
                  <div className="font-display text-3xl font-bold text-brand-600">
                    {plan.price}
                    {plan.period && (
                      <span className="text-base font-normal text-gray-500">{plan.period}</span>
                    )}
                  </div>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 mt-0.5 text-brand-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Prazo: {plan.timeline}
                  </div>
                </div>
              </div>

              <a
                href={whatsappUrl(plan.name)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 w-full text-center ${
                  plan.popular ? "btn-primary" : "btn-secondary"
                }`}
              >
                Solicitar orçamento
              </a>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          {pricingNote}
        </p>

        {/* Link para a tabela pública completa (Módulo A) */}
        <div className="mt-6 text-center">
          <a href="/tabela-de-preco" className="btn-secondary">
            Ver tabela completa de serviços e prazos →
          </a>
        </div>
      </div>
    </section>
  );
}
