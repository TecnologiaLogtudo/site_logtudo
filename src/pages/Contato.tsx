import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contato() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Solicitação enviada!",
      description: "Nossa equipe entrará em contato em até 48 horas.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero */}
        <section className="hero-gradient py-16 md:py-24">
          <div className="container-tight">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                Solicite uma Cotação
              </h1>
              <p className="text-lg text-primary-foreground/80">
                Preencha o formulário e receba uma proposta personalizada 
                para sua operação logística em até 48 horas.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="section-padding">
          <div className="container-tight">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-2">
                {isSubmitted ? (
                  <div className="bg-card rounded-xl p-8 md:p-12 shadow-card text-center">
                    <div className="w-16 h-16 rounded-full bg-[hsl(142,70%,45%)]/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-8 w-8 text-[hsl(142,70%,45%)]" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      Solicitação Enviada!
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Recebemos sua solicitação e nossa equipe comercial entrará 
                      em contato em até 48 horas úteis.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)}>
                      Enviar Nova Solicitação
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-card rounded-xl p-8 md:p-12 shadow-card">
                    <h2 className="text-xl font-semibold text-foreground mb-6">
                      Informações da Solicitação
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo *</Label>
                        <Input id="name" required placeholder="Seu nome" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Empresa *</Label>
                        <Input id="company" required placeholder="Nome da empresa" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail Corporativo *</Label>
                        <Input id="email" type="email" required placeholder="email@empresa.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone *</Label>
                        <Input id="phone" type="tel" required placeholder="(11) 99999-9999" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cargo">Cargo</Label>
                        <Input id="cargo" placeholder="Seu cargo" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="segment">Segmento</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ecommerce">E-commerce</SelectItem>
                            <SelectItem value="industria">Indústria</SelectItem>
                            <SelectItem value="varejo">Varejo</SelectItem>
                            <SelectItem value="marketplace">Marketplace</SelectItem>
                            <SelectItem value="distribuidora">Distribuidora</SelectItem>
                            <SelectItem value="farma">Farma & Saúde</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-6 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="service">Tipo de Serviço</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o serviço desejado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="middle-mile">Middle Mile</SelectItem>
                            <SelectItem value="last-mile">Last Mile</SelectItem>
                            <SelectItem value="distribuicao">Distribuição Urbana</SelectItem>
                            <SelectItem value="dedicada">Operação Dedicada</SelectItem>
                            <SelectItem value="personalizada">Solução Personalizada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="volume">Volume Estimado (entregas/mês)</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ate-1000">Até 1.000</SelectItem>
                              <SelectItem value="1000-5000">1.000 - 5.000</SelectItem>
                              <SelectItem value="5000-20000">5.000 - 20.000</SelectItem>
                              <SelectItem value="20000-50000">20.000 - 50.000</SelectItem>
                              <SelectItem value="50000-100000">50.000 - 100.000</SelectItem>
                              <SelectItem value="acima-100000">Acima de 100.000</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="regions">Regiões de Atuação</Label>
                          <Input id="regions" placeholder="Ex: SP, RJ, MG" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Detalhes da Operação</Label>
                        <Textarea 
                          id="message" 
                          rows={4} 
                          placeholder="Descreva sua necessidade, tipo de produto, prazos, etc."
                        />
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Enviando..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Solicitar Cotação
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Fale Conosco
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Telefone</p>
                        <a href="tel:+5511999999999" className="text-muted-foreground hover:text-primary transition-colors">
                          (11) 99999-9999
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">E-mail</p>
                        <a href="mailto:comercial@logtudo.com.br" className="text-muted-foreground hover:text-primary transition-colors">
                          comercial@logtudo.com.br
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Endereço</p>
                        <p className="text-muted-foreground">
                          São Paulo, SP - Brasil
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                  <h4 className="font-semibold text-foreground mb-2">
                    Resposta Rápida
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Nossa equipe comercial responde todas as solicitações 
                    em até 48 horas úteis.
                  </p>
                  <Button variant="whatsapp" className="w-full" asChild>
                    <a 
                      href="https://wa.me/5511999999999?text=Olá, gostaria de uma cotação" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Chamar no WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
