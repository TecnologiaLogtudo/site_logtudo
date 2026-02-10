import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-90" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container-tight py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="w-2 h-2 rounded-full bg-[hsl(142,70%,50%)] animate-pulse" />
            <span className="text-sm font-medium text-primary-foreground/90">
              Operações em todo o Nordeste
            </span>
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight tracking-tight mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Mais do que transportar,{" "}
            <span className="text-[hsl(197,70%,70%)]">conectamos</span>{" "}
            <br className="hidden md:block" />
            <span className="md:whitespace-nowrap">negócios com inteligência</span>
          </h1>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-8 mb-10">
            {[
              { value: "98,5%", label: "SLA de Entrega", delay: "0.4s" },
              { value: "+500", label: "Cidades Atendidas", delay: "0.5s" },
              { value: "+2M", label: "Entregas/Mês", delay: "0.6s" },
            ].map((stat) => (
              <div 
                key={stat.label} 
                className="text-center md:text-left animate-fade-in"
                style={{ animationDelay: stat.delay }}
              >
                <p className="text-2xl md:text-4xl font-bold text-primary-foreground">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-primary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contato" className="flex items-center gap-2">
                Solicitar Cotação
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block animate-fade-in" style={{ animationDelay: '1s' }}>
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
