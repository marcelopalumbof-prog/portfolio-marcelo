import { profile } from "@/data/profile";

export function Footer() {
  const whatsappUrl = `https://wa.me/${profile.social.whatsapp}?text=${encodeURIComponent(profile.social.whatsappMessage)}`;

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 dark:bg-gray-950 print:hidden">
      <div className="container-section">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-xl font-bold text-white">{profile.name}</h3>
            <p className="mt-2 text-sm">{profile.role}</p>
            <p className="mt-2 text-sm">{profile.company.city}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Navegação</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#sobre" className="hover:text-white transition-colors">Sobre</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors">Serviços</a></li>
              <li><a href="#cases" className="hover:text-white transition-colors">Cases</a></li>
              <li><a href="#precos" className="hover:text-white transition-colors">Preços</a></li>
              <li><a href="/tabela-de-preco" className="hover:text-white transition-colors">Tabela de Preço</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Serviços</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Criação de Sites</li>
              <li>Landing Pages</li>
              <li>E-commerce</li>
              <li>Tráfego Pago</li>
              <li>SEO</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Contato</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={`mailto:${profile.social.email}`} className="hover:text-white transition-colors">
                  {profile.social.email}
                </a>
              </li>
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp
                </a>
              </li>
              <li>{profile.company.cnpj}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} {profile.company.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
