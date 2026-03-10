import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { useContent } from "@/contexts/ContentContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

export function ClientsSection() {
  const { content } = useContent();
  const { clients } = content;

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: logosRef, isVisible: logosVisible } = useScrollAnimation({ threshold: 0.1 });

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <section className="section-padding bg-muted/30 overflow-hidden">
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

        {/* Stats - Centered flexible grid */}
        <div 
          ref={statsRef} 
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {clients.stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className={cn(
                "flex-1 min-w-[160px] max-w-[240px] text-center p-6 rounded-xl bg-card shadow-card transition-all duration-500 hover:scale-105",
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
          {clients.testimonials.map((testimonial, index) => (
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

        {/* Client logos with Carrossel */}
        <div 
          ref={logosRef}
          className={cn(
            "border-t border-border pt-12 transition-all duration-700",
            logosVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8"
          )}
        >
          <div className="flex justify-between items-end mb-10">
            <p className="text-sm text-muted-foreground">
              Empresas que confiam em nossa operação
            </p>
            {/* Custom Carousel Controls Container */}
            <div className="flex gap-2 relative">
              {/* O carrossel precisa ser declarado para que esses botões funcionem se usarmos os componentes padrão, 
                  mas para posicionar no topo direito, usaremos a API do Carousel do shadcn com os componentes filhos. */}
            </div>
          </div>
          
          <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.play}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
          >
            <div className="absolute -top-16 right-0 flex gap-2">
              <CarouselPrevious className="static translate-y-0 h-8 w-8" />
              <CarouselNext className="static translate-y-0 h-8 w-8" />
            </div>

            <CarouselContent className="-ml-4">
              {clients.logos.map((client, index) => (
                <CarouselItem key={client.name} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <div
                    className={cn(
                      "h-24 md:h-32 flex items-center justify-center transition-all duration-500 hover:scale-110",
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
                        className="h-full w-auto max-w-[150px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-none select-none" 
                      />
                    ) : (
                      <span className="text-lg font-medium text-muted-foreground whitespace-nowrap px-4 select-none">
                        {client.name}
                      </span>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
