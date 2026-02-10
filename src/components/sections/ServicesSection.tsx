import { Truck, Package, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Truck,
    title: "Middle Mile",
    description:
      "Transferência de cargas entre centros de distribuição com rastreabilidade total e janelas de entrega garantidas.",
    benefits: ["Rotas otimizadas", "Monitoramento GPS", "SLA contratual"],
  },
  {
    icon: Package,
    title: "Last Mile",
    description:
      "Entrega final ao destinatário com capilaridade em todo o nordeste, tecnologia de roteirização e comprovação digital.",
    benefits: ["Prova de entrega", "Notificações ao cliente", "Tentativas múltiplas"],
  },
  {
    icon: MapPin,
    title: "Distribuição Urbana",
    description:
      "Operações em centros urbanos com veículos adequados, equipe treinada e gestão de restrições de tráfego.",
    benefits: ["Veículos leves", "Zonas de restrição", "Janelas flexíveis"],
  },
  {
    icon: Users,
    title: "Operações Dedicadas",
    description:
      "Estrutura exclusiva para sua operação: frota, equipe e processos customizados às suas necessidades.",
    benefits: ["Frota exclusiva", "KPIs personalizados", "Integração de sistemas"],
  },
];

export function ServicesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.05 });

  return (
    <section id="solucoes" className="section-padding bg-muted/50">
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
            Soluções
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
            Logística completa para sua operação
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Do centro de distribuição até o cliente final. Cada etapa com 
            tecnologia, processo e comprometimento com resultado.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className={cn(
                "group bg-card border-border shadow-card hover:shadow-card-hover transition-all duration-500",
                cardsVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: cardsVisible ? `${index * 100}ms` : "0ms" }}
            >
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <service.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.benefits.map((benefit) => (
                        <span
                          key={benefit}
                          className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
