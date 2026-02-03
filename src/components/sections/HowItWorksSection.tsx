import { Search, FileText, Cog, Radio, LineChart } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Diagnóstico",
    description: "Análise detalhada da sua operação: volumes, regiões, prazos e requisitos específicos.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Planejamento",
    description: "Desenho da solução logística sob medida com rotas, frota e indicadores definidos.",
  },
  {
    icon: Cog,
    step: "03",
    title: "Operação",
    description: "Execução com processos padronizados, equipe treinada e tecnologia integrada.",
  },
  {
    icon: Radio,
    step: "04",
    title: "Monitoramento",
    description: "Rastreamento em tempo real, gestão de ocorrências e comunicação proativa.",
  },
  {
    icon: LineChart,
    step: "05",
    title: "Otimização",
    description: "Análise contínua de dados para melhoria de performance e redução de custos.",
  },
];

export function HowItWorksSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollAnimation({ threshold: 0.05 });

  return (
    <section className="section-padding hero-gradient">
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
          <span className="text-sm font-semibold text-primary-foreground/70 uppercase tracking-wider">
            Como Funciona
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-primary-foreground">
            Da análise à entrega em 5 etapas
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Processo estruturado para garantir previsibilidade e resultado 
            desde o primeiro dia de operação.
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          {/* Connection line */}
          <div 
            className={cn(
              "hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-primary-foreground/20 transition-all duration-1000 origin-left",
              stepsVisible ? "scale-x-100" : "scale-x-0"
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((item, index) => (
              <div 
                key={item.title} 
                className={cn(
                  "relative text-center transition-all duration-500",
                  stepsVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-12"
                )}
                style={{ transitionDelay: stepsVisible ? `${index * 150}ms` : "0ms" }}
              >
                {/* Icon circle */}
                <div className="relative z-10 mx-auto mb-4 w-20 h-20 rounded-full bg-primary-foreground/10 border-2 border-primary-foreground/30 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                
                {/* Step number */}
                <span className="inline-block text-xs font-bold text-primary-foreground/50 mb-2">
                  {item.step}
                </span>
                
                {/* Title */}
                <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                  {item.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-primary-foreground/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
