"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Criação de Sites",
    description: "Sites institucionais, landing pages, e-commerce e sistemas web sob medida.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    items: ["Site Institucional", "Landing Page", "E-commerce", "Sistema Web"],
  },
  {
    title: "Tráfego Pago",
    description: "Gestão de Meta Ads e Google Ads para gerar leads e vendas qualificados.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    items: ["Meta Ads", "Google Ads", "Remarketing", "CRO"],
  },
];

export function Services() {
  return (
    <section id="servicos" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="section-title">Serviços</h2>
          <p className="section-subtitle">
            Soluções completas para sua presença digital — do site à captação de clientes.
          </p>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card"
            >
              <div className="w-14 h-14 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400">
                {service.icon}
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">{service.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{service.description}</p>
              <ul className="mt-4 space-y-2">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
