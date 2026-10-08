"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Briefing",
    description: "Conversa inicial para entender seu negócio, objetivos e necessidades.",
  },
  {
    number: "02",
    title: "Proposta",
    description: "Proposta detalhada com escopo, prazo e investimento.",
  },
  {
    number: "03",
    title: "Design",
    description: "Criação do layout visual com foco em conversão e experiência.",
  },
  {
    number: "04",
    title: "Desenvolvimento",
    description: "Codificação com as melhores práticas de performance e SEO.",
  },
  {
    number: "05",
    title: "Entrega",
    description: "Publicação do site e treinamento para gerenciamento.",
  },
  {
    number: "06",
    title: "Suporte",
    description: "Acompanhamento contínuo e otimizações pós-lançamento.",
  },
];

export function Process() {
  return (
    <section id="processo" className="py-20">
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="section-title">Processo de Trabalho</h2>
          <p className="section-subtitle">
            Metodologia comprovada que garante entregas no prazo e com qualidade.
          </p>
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card"
            >
              <div className="font-display text-4xl font-bold text-brand-200 dark:text-brand-800">
                {step.number}
              </div>
              <h3 className="mt-3 font-display text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
