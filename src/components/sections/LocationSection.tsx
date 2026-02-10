import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card, CardContent } from "@/components/ui/card";

export function LocationSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="localizacao"
      className="py-16 md:py-24 bg-muted/30"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nossa Localização
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Venha nos visitar ou entre em contato. Estamos prontos para atender você.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Card */}
          <Card
            className={`lg:col-span-1 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <CardContent className="p-6 space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Endereço</h3>
                  <p className="text-muted-foreground text-sm">
                    Via Urbana, s/n - CIA Sul
                    <br />
                    Simões Filho - BA, 43721-450
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Telefone</h3>
                  <a
                    href="tel:+5571984288956"
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    (71) 98428-8956
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">E-mail</h3>
                  <a
                    href="mailto:contato@logtudo.com.br"
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    sucessoaocliente@logtudo.com.br
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Horário</h3>
                  <p className="text-muted-foreground text-sm">
                    Segunda a Sexta: 08h às 17h
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Google Maps Embed */}
          <div
            className={`lg:col-span-2 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="w-full h-full min-h-[350px] md:min-h-[400px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                // SUBSTITUA O LINK ABAIXO PELO LINK GERADO NO GOOGLE MAPS (Compartilhar -> Incorporar um mapa)
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.1467523319366!2d-38.40305822417118!3d-12.833791957055041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7166ca983022f57%3A0x1effdd946daece50!2zTG9ndHVkbyBTb2x1w6fDtWVzIExvZ8Otc3RpY2E!5e0!3m2!1spt-BR!2sbr!4v1770225663885!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "350px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização LogTudo"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}