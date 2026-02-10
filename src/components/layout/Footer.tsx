import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Linkedin, Instagram } from "lucide-react";
import logoLogtudo from "@/assets/logo_logtudo.png";

const footerLinks = {
  empresa: [
    { name: "Sobre Nós", href: "/sobre#" },
    { name: "Soluções", href: "/#solucoes" },
    { name: "Diferenciais", href: "/#diferenciais" },
    { name: "Localização", href: "/#localizacao" },
  ],
  contato: [
    { name: "Solicitar Cotação", href: "/contato" },
    { name: "Seja Parceiro", href: "/contato#parceiro" },
    { name: "Trabalhe Conosco", href: "/contato#carreiras" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-tight section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src={logoLogtudo}
              alt="Logtudo"
              className="h-12 w-auto mb-6"
            />
            <p className="text-background/70 text-sm leading-relaxed mb-6 max-w-sm">
              Soluções logísticas de alta performance para operações B2B. 
              Tecnologia, escala e comprometimento com seu SLA.
            </p>
            <div className="space-y-3 text-sm text-background/70">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>Simões Filho, BA - Brasil</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+5571984288956" className="hover:text-background transition-colors">
                  (71) 98428-8956
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:comercial@logtudo.com.br" className="hover:text-background transition-colors">
                  sucessoaocliente@logtudo.com.br
                </a>
              </div>
            </div>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-background">Empresa</h4>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-background">Contato</h4>
            <ul className="space-y-2">
              {footerLinks.contato.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://linkedin.com/company/logtudo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/logtudologistica"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/60">
            © {new Date().getFullYear()} Logtudo. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-xs text-background/60">
            <Link to="/politica-de-privacidade" className="hover:text-background transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/termos-de-uso" className="hover:text-background transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
        <div className="mt-4 text-center">
          <a
            href="https://lealverse.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-background/60 hover:text-background transition-colors"
          >
            Criado por <span className="font-bold text-background">LealVerse</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
