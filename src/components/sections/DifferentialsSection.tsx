import { 
  Shield, 
  Cpu, 
  BarChart3, 
  Clock, 
  MapPinned, 
  TrendingUp 
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const differentials = [
  {
    icon: Shield,
    title: "SLA Contratual",
    description: "Compromisso formalizado com indicadores de performance. Não é promessa, é contrato.",
  },
  {
    icon: Cpu,
    title: "Tecnologia Integrada",
    description: "TMS próprio com APIs para integração ERP, WMS e e-commerce. Dados em tempo real.",
  },
  {
    icon: BarChart3,
    title: "Gestão por Indicadores",
    description: "OTIF, lead time, ocorrências. Dashboards e relatórios para tomada de decisão.",
  },
  {
    icon: Clock,
    title: "Agilidade Operacional",
    description: "Processos lean e equipe dedicada para responder rápido às demandas da sua operação.",
  },
  {
    icon: MapPinned,
    title: "Cobertura Nacional",
    description: "+500 cidades atendidas com malha logística própria e parceiros homologados.",
  },
  {
    icon: TrendingUp,
    title: "Escalabilidade",
    description: "Estrutura para crescer junto com sua operação. Do piloto à escala nacional.",
  },
];

export function DifferentialsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 });

  return (
    <section className="section-padding bg-background">
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
            Diferenciais
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
            Por que escolher a Logtudo?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Logística se vende com processo, dados e previsibilidade. 
            Conheça o que nos diferencia.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((item, index) => (
            <div
              key={item.title}
              className={cn(
                "group relative transition-all duration-500",
                gridVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: gridVisible ? `${index * 80}ms` : "0ms" }}
            >
              <div className="flex flex-col items-start">
                <div className="mb-4 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <item.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
              {/* Subtle line separator for visual rhythm */}
              {index < differentials.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-0 bottom-0 w-px bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
