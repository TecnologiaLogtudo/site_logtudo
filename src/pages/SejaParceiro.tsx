import { FormEvent, useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { useToast } from "@/hooks/use-toast";
import { useContent } from "@/contexts/ContentContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import "./SejaParceiro.css";

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "Quem pode se cadastrar como motorista parceiro?",
    answer:
      "Motoristas autônomos, agregados e operadores com veículo próprio podem se cadastrar para análise e direcionamento operacional.",
  },
  {
    question: "Quais dados são necessários para o cadastro?",
    answer:
      "Solicitamos nome, telefone, CPF/CNPJ, ANTT, RNTRC, placa do veículo, cidade, tipo de veículo, experiência e rota de interesse.",
  },
  {
    question: "O que acontece depois do envio?",
    answer:
      "Nossa equipe faz a triagem do perfil, valida os dados e retorna com o direcionamento para as próximas etapas de ativação.",
  },
  {
    question: "Em quanto tempo recebo retorno?",
    answer:
      "A equipe de cadastro responde em até 48 horas úteis, podendo variar conforme volume de solicitações.",
  },
];

export default function SejaParceiro() {
  const { toast } = useToast();
  const { content } = useContent();
  const { company } = content;

  const [openFaq, setOpenFaq] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const whatsappLeadText =
    "Olá, vim da página Seja Parceiro e quero me cadastrar como motorista/agregado.";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      partner_type: "Motorista/Agregado",
      _subject: `Novo cadastro de parceiro Logtudo: ${String(data.nome || "")}`,
      _template: "table",
      _captcha: "false",
    };

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${company.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Falha no envio do formulário");
      }

      setIsSubmitted(true);
      toast({
        title: "Cadastro enviado com sucesso!",
        description: "Recebemos seus dados e nossa equipe entrará em contato em breve.",
      });
      (e.currentTarget as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao enviar cadastro",
        description: "Tente novamente em instantes ou fale com nossa equipe no WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToCadastro = () => {
    const cadastro = document.getElementById("cadastro");
    if (cadastro) {
      cadastro.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", "#cadastro");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main id="conteudo" className="sp-page pt-16 md:pt-20">
        <a className="sp-skip-link" href="#conteudo-seja-parceiro">
          Pular para o conteúdo
        </a>

        <section id="conteudo-seja-parceiro" className="sp-hero">
          <div className="sp-container sp-hero-grid">
            <div>
              <span className="sp-eyebrow">Operações em todo o Brasil</span>
              <h1>Seja motorista parceiro de uma logística com demanda real.</h1>
              <p className="sp-lead">
                Se você é motorista parceiro ou agregado, conecte seu veículo a uma operação com
                suporte, processo e previsibilidade para crescer com segurança.
              </p>

              <div className="sp-hero-actions">
                <Button
                  type="button"
                  size="lg"
                  className="w-full sm:w-auto whitespace-normal text-center leading-tight h-auto py-3"
                  onClick={goToCadastro}
                >
                  Quero me cadastrar como motorista
                </Button>
              </div>

              <div className="sp-proof-bar" aria-label="Indicadores da operação Logtudo">
                <article className="sp-proof-card">
                  <strong>98,5%</strong>
                  <span>SLA médio de entrega</span>
                </article>
                <article className="sp-proof-card">
                  <strong>+200</strong>
                  <span>Cidades atendidas</span>
                </article>
                <article className="sp-proof-card">
                  <strong>+55 mil</strong>
                  <span>Entregas por mês</span>
                </article>
                <article className="sp-proof-card">
                  <strong>12+ anos</strong>
                  <span>Experiência de mercado</span>
                </article>
              </div>
            </div>

            <div className="sp-hero-visual" aria-hidden="true">
              <article className="sp-floating-card sp-card-primary">
                <span className="sp-eyebrow">Rede parceira</span>
                <h2 className="sp-hero-visual-title">
                  Capilaridade com controle, tecnologia e ritmo operacional.
                </h2>
                <div className="sp-map-grid">
                  <div>BA</div>
                  <div>SE</div>
                  <div>AL</div>
                  <div>PE</div>
                  <div>PB</div>
                  <div>RN</div>
                  <div>CE</div>
                  <div>MA</div>
                </div>
                <div className="sp-tag-row">
                  <span className="sp-tag">Rotas urbanas</span>
                  <span className="sp-tag">Transferências</span>
                  <span className="sp-tag">Distribuição Urbana</span>
                  <span className="sp-tag">Operações Dedicadas</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="perfis" className="sp-section-soft">
          <div className="sp-container">
            <div className="sp-section-head">
              <div>
                <span className="sp-eyebrow">Para motoristas</span>
                <h2>Uma jornada objetiva para começar a rodar.</h2>
              </div>
            </div>

            <div className="sp-audience-layout">
              <article className="sp-audience-card">
                <span className="sp-eyebrow">Cadastro direto</span>
                <h3>Entre em uma operação séria, com suporte e oportunidades reais.</h3>
                <p>
                  Ideal para agregados e motoristas com utilitário, toco, 3/4, truck, Fiorino ou
                  frota leve que buscam recorrência e organização operacional.
                </p>
                <div className="sp-chip-row">
                  <span className="sp-chip">Rotas urbanas</span>
                  <span className="sp-chip">Transferências</span>
                  <span className="sp-chip">Operações dedicadas</span>
                  <span className="sp-chip">Suporte operacional</span>
                </div>
              </article>
              <article className="sp-audience-card">
                <span className="sp-eyebrow">Etapas claras</span>
                <h3>Cadastro, análise e direcionamento.</h3>
                <p>
                  Você informa dados de contato, documentos e perfil de veículo, e a equipe
                  direciona sua entrada conforme a necessidade operacional da região.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="sp-section-base">
          <div className="sp-container">
            <div className="sp-section-head">
              <div>
                <span className="sp-eyebrow">Por que fazer parte</span>
                <h2>Vantagens para quem quer crescer na operação.</h2>
              </div>
            </div>

            <div className="sp-benefits-grid">
              <article className="sp-benefit-card">
                <div className="sp-icon-pill">A</div>
                <h3>Demanda recorrente</h3>
                <p>
                  Atue com previsibilidade e constância em uma rede logística que opera com ritmo e
                  planejamento.
                </p>
              </article>
              <article className="sp-benefit-card">
                <div className="sp-icon-pill">B</div>
                <h3>Suporte operacional</h3>
                <p>
                  Conte com acompanhamento da equipe para alinhamento de rotas, necessidades e
                  performance.
                </p>
              </article>
              <article className="sp-benefit-card">
                <div className="sp-icon-pill">C</div>
                <h3>Entrada estruturada</h3>
                <p>
                  Cadastro claro, análise rápida e direcionamento objetivo para ativação conforme o
                  seu perfil.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="sp-highlight-band sp-section-tint">
          <div className="sp-container">
            <div className="sp-section-head">
              <div>
                <span className="sp-eyebrow">Como funciona</span>
                <h2>Uma jornada simples para ativar seu cadastro.</h2>
              </div>
            </div>

            <div className="sp-steps-grid">
              <article className="sp-step">
                <div className="sp-step-number">01</div>
                <h3>Preencha o cadastro</h3>
                <p>
                  Informe seus dados de contato, documentação principal e perfil de atuação
                  logística.
                </p>
              </article>
              <article className="sp-step">
                <div className="sp-step-number">02</div>
                <h3>Análise de perfil</h3>
                <p>
                  A equipe valida as informações e verifica aderência da sua disponibilidade às
                  rotas ativas.
                </p>
              </article>
              <article className="sp-step">
                <div className="sp-step-number">03</div>
                <h3>Contato de retorno</h3>
                <p>
                  Você recebe orientação sobre próximos passos, requisitos complementares e início da
                  operação.
                </p>
              </article>
              <article className="sp-step">
                <div className="sp-step-number">04</div>
                <h3>Ativação operacional</h3>
                <p>
                  Com o perfil aprovado, seguimos para integração e alinhamento de execução na
                  malha disponível.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="operacao" className="sp-section-soft">
          <div className="sp-container">
            <div className="sp-section-head">
              <div>
                <span className="sp-eyebrow">Prova operacional</span>
                <h2>Números que reforçam confiança para quem vai rodar.</h2>
              </div>
            </div>

            <div className="sp-metrics-grid">
              <article className="sp-metric-tile">
                <span>Compromisso de performance</span>
                <strong>98,5% SLA</strong>
                <span>
                  Organização operacional para reduzir falhas e manter previsibilidade no dia a dia.
                </span>
              </article>
              <article className="sp-metric-tile">
                <span>Capilaridade operacional</span>
                <strong>+200 cidades</strong>
                <span>
                  Cobertura ampla para gerar oportunidades em diferentes regiões do Nordeste.
                </span>
              </article>
              <article className="sp-metric-tile">
                <span>Volume recorrente</span>
                <strong>+55 mil entregas</strong>
                <span>
                  Ritmo de operação que favorece recorrência e continuidade para parceiros ativos.
                </span>
              </article>
              <article className="sp-metric-tile">
                <span>Experiência acumulada</span>
                <strong>12+ anos</strong>
                <span>
                  Histórico de mercado que reforça segurança para quem busca parceria de longo prazo.
                </span>
              </article>
            </div>
          </div>
        </section>

        <section className="sp-section-base">
          <div className="sp-container">
            <div className="sp-section-head">
              <div>
                <span className="sp-eyebrow">Perguntas frequentes</span>
                <h2>Dúvidas comuns antes do primeiro contato.</h2>
              </div>
            </div>

            <div className="sp-faq-grid">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <article key={item.question} className={`sp-faq-item ${isOpen ? "open" : ""}`}>
                    <button
                      className="sp-faq-button"
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq((current) => (current === index ? -1 : index))}
                    >
                      <span>{item.question}</span>
                      <span>+</span>
                    </button>
                    {isOpen ? <div className="sp-faq-content">{item.answer}</div> : null}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="cadastro" className="sp-section-soft">
          <div className="sp-container grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-2">
              <div className="sp-section-head sp-contact-head">
                <div>
                  <span className="sp-eyebrow">Cadastro inteligente</span>
                  <h2>Formulário de cadastro para motorista parceiro.</h2>
                </div>
              </div>
            </div>

            <article className="lg:col-span-2">
              {isSubmitted ? (
                <div className="bg-card rounded-xl p-5 sm:p-6 md:p-12 shadow-card text-center">
                  <div className="w-16 h-16 rounded-full bg-[hsl(142,70%,45%)]/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-[hsl(142,70%,45%)]" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Cadastro enviado com sucesso!</h3>
                  <p className="text-muted-foreground mb-6">
                    Obrigado pelo interesse. Nossa equipe avaliará suas informações e retornará o
                    contato em breve.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)}>Enviar novo cadastro</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card rounded-xl p-5 sm:p-6 md:p-12 shadow-card">
                  <h3 className="text-xl font-semibold text-foreground mb-6">Informações do Motorista</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome completo *</Label>
                      <Input id="nome" name="nome" placeholder="Seu nome" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone / WhatsApp *</Label>
                      <Input id="telefone" name="telefone" placeholder="(71) 99999-9999" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cpf_cnpj">CPF/CNPJ *</Label>
                      <Input id="cpf_cnpj" name="cpf_cnpj" placeholder="Informe seu CPF ou CNPJ" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="antt">ANTT *</Label>
                      <Input id="antt" name="antt" placeholder="Número ANTT" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rntrc">RNTRC *</Label>
                      <Input id="rntrc" name="rntrc" placeholder="Número RNTRC" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="placa_veiculo">Placa do veículo *</Label>
                      <Input id="placa_veiculo" name="placa_veiculo" placeholder="ABC1D23" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cidade">Cidade / UF</Label>
                      <Input id="cidade" name="cidade" placeholder="Simões Filho - BA" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="veiculo">Modelo do veículo</Label>
                      <Select name="veiculo">
                        <SelectTrigger id="veiculo">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HR">HR</SelectItem>
                          <SelectItem value="utilitario">Utilitário</SelectItem>
                          <SelectItem value="fiorino">Fiorino</SelectItem>
                          <SelectItem value="toco">Toco</SelectItem>
                          <SelectItem value="tres-quartos">3/4</SelectItem>
                          <SelectItem value="truck">Truck</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tipo_veiculo">Tipo de veículo</Label>
                      <Select name="tipo_veiculo">
                        <SelectTrigger id="tipo_veiculo">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="seco">Seco</SelectItem>
                          <SelectItem value="refrigerado">Refrigerado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mei">Possui CNPJ / MEI?</Label>
                      <Select name="mei">
                        <SelectTrigger id="mei">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sim">Sim</SelectItem>
                          <SelectItem value="nao">Não</SelectItem>
                          <SelectItem value="em-processo">Em processo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experiencia">Experiência em logística</Label>
                      <Select name="experiencia">
                        <SelectTrigger id="experiencia">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sem-experiencia">Sem experiência</SelectItem>
                          <SelectItem value="ate-1-ano">Até 1 ano</SelectItem>
                          <SelectItem value="1-a-3-anos">1 a 3 anos</SelectItem>
                          <SelectItem value="mais-3-anos">Mais de 3 anos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="regiao">Região / rota de interesse</Label>
                      <Textarea
                        id="regiao"
                        name="regiao"
                        placeholder="Ex.: Salvador e RMS, interior da Bahia, rotas dedicadas..."
                      />
                    </div>
                  </div>

                  <div className="sp-mini-actions">
                    <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Enviando..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Enviar cadastro
                        </>
                      )}
                    </Button>
                    <Button variant="whatsapp" size="lg" className="w-full md:w-auto" asChild>
                      <a
                        href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(whatsappLeadText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Falar no WhatsApp
                      </a>
                    </Button>
                  </div>
                </form>
              )}
            </article>

            <aside className="space-y-8 lg:col-start-3 lg:row-start-2">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Fale Conosco</h3>
                <br />
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Telefone</p>
                      <a
                        href={`tel:${company.phoneLink}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {company.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">E-mail</p>
                      <a
                        href={`mailto:${company.email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {company.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Endereço</p>
                      <p className="text-muted-foreground whitespace-pre-line">{company.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                <h4 className="font-semibold text-foreground mb-2">Resposta Rápida</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Nossa equipe de cadastro responde todas as solicitações em até 48 horas úteis.
                </p>
                <Button variant="whatsapp" className="w-full" asChild>
                  <a
                    href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
                      "Olá, gostaria de mais informações sobre cadastro de motorista parceiro."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chamar no WhatsApp
                  </a>
                </Button>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
