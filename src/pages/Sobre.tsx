import { Link } from "react-router-dom";
<<<<<<< HEAD
import { useEffect } from "react";
=======
>>>>>>> 0c15175d5ca8226e0fae9b2f2a631f39182b1f13
import { ArrowRight, MessageCircle, Target, Eye, Heart, Play } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/sections/CTASection";
import { LocationSection } from "@/components/sections/LocationSection";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
<<<<<<< HEAD
import malhaLogistica from "@/assets/malha-logistica.png";

=======
import malhaLogistica from "@/assets/malha-logistica.jpg";
import equipeLogtudo from "@/assets/equipe-logtudo.jpg";
>>>>>>> 0c15175d5ca8226e0fae9b2f2a631f39182b1f13

function AboutHero() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding hero-gradient">
      <div className="container-tight">
        <div
          ref={ref}
          className={cn(
            "max-w-3xl mx-auto text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-block text-sm font-semibold tracking-wider uppercase text-primary-foreground/70 mb-4">
            Sobre Nós
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            A Logtudo
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
            Somos uma empresa especializada em logística. Temos como objetivo fornecer uma rede de suporte
            para todas as etapas na área de armazenagem, transporte, distribuição, movimentação de carga,
            cross docking e coleta/entrega.
          </p>
        </div>
      </div>
    </section>
  );
}

function AboutDescription() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <div
          ref={ref}
          className={cn(
            "max-w-3xl mx-auto text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            Buscamos sempre as melhores condições para maximizar a rentabilidade, minimizar riscos,
            eliminar perdas e reduzir custos nas operações logísticas.
          </p>
        </div>
      </div>
    </section>
  );
}

function MissionVisionValues() {
  const { ref, isVisible } = useScrollAnimation();

  const items = [
    {
      icon: Target,
      title: "Missão",
      description:
        "Agregar valor aos nossos clientes, colaboradores, fornecedores e comunidade, promovendo soluções logísticas customizadas e flexíveis.",
    },
    {
      icon: Eye,
      title: "Visão",
      description:
        "Ser o melhor provedor de inteligência logística do Nordeste.",
    },
    {
      icon: Heart,
      title: "Valores",
      description:
        "Compromisso com o resultado, Integridade, Coesão, Ética nas Relações, Responsabilidade Social, Crescimento Humano e Respeito ao Meio Ambiente.",
    },
  ];

  return (
    <section className="section-padding bg-secondary">
      <div className="container-tight">
        <div
          ref={ref}
          className={cn(
            "grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {items.map((item, index) => (
            <Card
              key={item.title}
              className={cn(
                "text-center border-none shadow-card transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <div
          ref={ref}
          className={cn(
            "text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Vídeo Institucional
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            Conheça mais sobre a Logtudo e como transformamos a logística dos nossos clientes.
          </p>

          <div
            className={cn(
              "relative max-w-4xl mx-auto rounded-xl overflow-hidden bg-muted aspect-video transition-all duration-700 delay-200",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
          >
<<<<<<< HEAD
            {/* Embed do YouTube */}
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/3F1vVFlK4MU"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
=======
            {/* Placeholder for institutional video - replace src with actual YouTube/Vimeo embed */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-foreground/5">
              <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center mb-4 cursor-pointer hover:bg-primary transition-colors">
                <Play className="h-8 w-8 text-primary-foreground ml-1" />
              </div>
              <p className="text-muted-foreground text-sm">
                Insira aqui o link do vídeo institucional
              </p>
            </div>
>>>>>>> 0c15175d5ca8226e0fae9b2f2a631f39182b1f13
          </div>
        </div>
      </div>
    </section>
  );
}

function LogisticsNetwork() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding bg-secondary">
      <div className="container-tight">
        <div
          ref={ref}
          className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nossa Malha Logística
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Cobertura estratégica com pontos de distribuição que garantem agilidade e eficiência em toda a operação.
            </p>
          </div>

          <div
            className={cn(
              "rounded-xl overflow-hidden shadow-card transition-all duration-700 delay-200",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
          >
            <img
              src={malhaLogistica}
              alt="Malha logística da Logtudo com pontos de distribuição no Brasil"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

<<<<<<< HEAD

const Sobre = () => {
   useEffect(() => {
    // Rola para o topo da página quando o componente é montado
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Para rolagem suave, use "smooth"
    });
  }, []); // O array vazio garante que este efeito execute apenas uma vez quando o componente é montado
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="sobre" className="pt-16 md:pt-20">
=======
function TeamSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <div
          ref={ref}
          className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nossa Equipe
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Profissionais comprometidos com a excelência operacional e a satisfação dos nossos clientes.
            </p>
          </div>

          <div
            className={cn(
              "rounded-xl overflow-hidden shadow-card transition-all duration-700 delay-200",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
          >
            <img
              src={equipeLogtudo}
              alt="Equipe da Logtudo em ambiente de trabalho"
              className="w-full h-auto object-cover max-h-[500px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const Sobre = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 md:pt-20">
>>>>>>> 0c15175d5ca8226e0fae9b2f2a631f39182b1f13
        <AboutHero />
        <AboutDescription />
        <MissionVisionValues />
        <VideoSection />
        <LogisticsNetwork />
<<<<<<< HEAD
=======
        <TeamSection />
>>>>>>> 0c15175d5ca8226e0fae9b2f2a631f39182b1f13
        <CTASection />
        <LocationSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Sobre;
