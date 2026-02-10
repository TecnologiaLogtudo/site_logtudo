import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/contexts/ContentContext";
import heroBgImg from "@/assets/hero.png";

export function HeroSection() {
  const { content } = useContent();
  const { hero } = content;

  // Usa a imagem do banco se existir e for uma URL/Base64 válida, caso contrário usa a local
  const backgroundImage = hero.backgroundImage && (hero.backgroundImage.startsWith('http') || hero.backgroundImage.startsWith('data:image')) 
    ? hero.backgroundImage 
    : heroBgImg;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 hero-gradient" style={{ opacity: hero.overlayOpacity || 0.3 }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container-tight py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="w-2 h-2 rounded-full bg-[hsl(142,70%,50%)] animate-pulse" />
            <span className="text-sm font-medium text-primary-foreground/90">
              {hero.badge}
            </span>
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight tracking-tight mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {hero.headlinePart1}
            <span className="text-[hsl(197,70%,70%)]">{hero.headlineHighlight}</span>{" "}
            <br className="hidden md:block" />
            <span className="md:whitespace-nowrap">{hero.headlinePart2}</span>
          </h1>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-8 mb-10">
            {hero.stats.map((stat) => (
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
