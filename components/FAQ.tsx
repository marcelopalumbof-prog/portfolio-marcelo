"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Qual o prazo médio de entrega?",
    answer: "Depende do projeto. Landing pages ficam prontas em 5 a 7 dias, sites institucionais em 10 a 15 dias, e e-commerces em 20 a 40 dias. Sempre combino um prazo claro antes de começar.",
  },
  {
    question: "Quais as formas de pagamento?",
    answer: "Aceito Pix, transferência bancária e cartão de crédito. Para projetos maiores, parcelamento em até 3x sem juros. O pagamento é dividido: 50% na aprovação do design e 50% na entrega final.",
  },
  {
    question: "O site fica hospedado onde?",
    answer: "Recomendo a Vercel para sites em Next.js (gratuita para projetos pequenos) ou hospedagem tradicional para WordPress. O primeiro ano de hospedagem está incluso em todos os planos de criação de sites.",
  },
  {
    question: "Quantas revisões estão incluídas?",
    answer: "Incluo 2 rodadas de revisões em cada etapa (design e desenvolvimento). Revisões adicionais podem ser combinadas com um valor extra, mas sempre com transparência.",
  },
  {
    question: "Você faz apenas o site ou também o conteúdo?",
    answer: "Posso cuidar de tudo: textos, imagens, design e desenvolvimento. Se você já tem o conteúdo pronto, também trabalho com ele. O importante é entregar um site completo e funcional.",
  },
  {
    question: "Como funciona a gestão de tráfego pago?",
    answer: "Você paga a verba de anúncios diretamente ao Meta ou Google. Eu cuido da criação, gestão e otimização das campanhas. A taxa de setup é cobrada apenas uma vez, e a mensalidade cobre a gestão contínua.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20">
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="section-title">Perguntas Frequentes</h2>
          <p className="section-subtitle">
            Tire suas dúvidas sobre prazos, pagamento e funcionamento.
          </p>
        </motion.div>

        <div className="mt-12 max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card !p-0 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 shrink-0 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
