import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

// 1. Importe suas logos aqui (ajuste o nome do arquivo conforme salvou em assets)
import logoCliente1 from "@/assets/logo-amazon.webp";
import logoCliente2 from "@/assets/logo-Latam.png";
import logoCliente3 from "@/assets/Logo-lactalis.webp";
import logoCliente4 from "@/assets/logo-itambe.png";
import logoCliente5 from "@/assets/3-coracoes.png";

const stats = [
  { value: "+150", label: "Clientes Ativos" },
  { value: "12+", label: "Anos de Mercado" },
  { value: "+2M", label: "Entregas/Mês" },
  { value: "98,5%", label: "SLA Médio" },
];

const testimonials = [
  {
    quote: "A Logtudo transformou nossa operação last mile. Reduzimos devoluções em 40% e o SLA saltou de 92% para 98%.",
    author: "Carlos Mendes",
    role: "Diretor de Supply Chain",
    company: "E-commerce Nacional",
  },
  {
    quote: "Parceria estratégica que nos permitiu escalar de 50 mil para 300 mil entregas/mês sem perder qualidade.",
    author: "Ana Paula Costa",
    role: "Head de Operações",
    company: "Distribuidora B2B",
  },
];

const clientLogos = [
  // 2. Substitua 'null' pela variável da logo importada (ex: logo: logoCliente1)
  { name: "E-Commerce A", logo: logoCliente1 },
  { name: "Indústria B", logo: logoCliente2 },
  { name: "Varejo C", logo: logoCliente3 },
  { name: "Marketplace D", logo: logoCliente4 },
  { name: "Distribuidora E", logo: logoCliente5 }
];

export function ClientsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: logosRef, isVisible: logosVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-tight">
        {/* Header */}
        <div 
          ref={headerRef}
          className={cn(
            "text-center mb-12 md:mb-16 transition-all duration-700",
            headerVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8"
          )}
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Resultados Comprovados
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
            Quem confia na Logtudo
          </h2>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className={cn(
                "text-center p-6 rounded-xl bg-card shadow-card transition-all duration-500 hover:scale-105",
                statsVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: statsVisible ? `${index * 100}ms` : "0ms" }}
            >
              <p className="text-3xl md:text-4xl font-bold text-primary">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.author} 
              className={cn(
                "bg-card border-border shadow-card transition-all duration-500 hover:shadow-card-hover",
                testimonialsVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: testimonialsVisible ? `${index * 150}ms` : "0ms" }}
            >
              <CardContent className="p-6 md:p-8">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-foreground leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Client logos placeholder */}
        <div 
          ref={logosRef}
          className={cn(
            "border-t border-border pt-12 transition-all duration-700",
            logosVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-center text-sm text-muted-foreground mb-8">
            Empresas que confiam em nossa operação
          </p>
          <div className="grid grid-cols-2 gap-4 md:flex md:flex-nowrap md:justify-center md:gap-8 items-center">
            {clientLogos.map((client, index) => (
              <div
                key={client.name}
                className={cn(
                  "h-40 px-4 flex items-center justify-center rounded-lg transition-all duration-500 hover:scale-105",
                  logosVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: logosVisible ? `${index * 50}ms` : "0ms" }}
              >
                {client.logo ? (
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="h-full w-auto object-contain" 
                  />
                ) : (
                  <span className="text-sm font-medium text-muted-foreground">{client.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
