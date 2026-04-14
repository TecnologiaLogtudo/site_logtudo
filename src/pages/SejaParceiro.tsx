import { FormEvent, useEffect, useMemo, useState } from "react";
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

type ProfileType = "motoristas" | "empresas";
type FormType = "driver" | "client";

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "Que tipo de parceiro pode se cadastrar?",
    answer:
      "Motoristas parceiros, agregados com veículos leves ou utilitários, operadores com frota e empresas que desejam contratar uma operação logística B2B podem usar esta página como porta de entrada.",
  },
  {
    question: "A página serve apenas para motoristas?",
    answer:
      "Não. Ela foi desenhada para captar tanto motoristas e agregados quanto empresas que precisam de apoio logístico, com mensagem e formulário adaptados para cada público.",
  },
  {
    question: "Quais informações ajudam a qualificar melhor o lead?",
    answer:
      "Para motoristas, cidade, veículo, tipo de operação e disponibilidade. Para empresas, volume, segmento, região, modelo logístico e prazo desejado para início.",
  },
  {
    question: "Como o visitante continua após preencher?",
    answer:
      "A proposta da página já prepara o próximo passo: triagem operacional, validação comercial, contato via WhatsApp ou abertura de conversa para piloto e operação dedicada.",
  },
];

export default function SejaParceiro() {
  const { toast } = useToast();
  const { content } = useContent();
  const { company } = content;

  const [profile, setProfile] = useState<ProfileType>("motoristas");
  const [formType, setFormType] = useState<FormType>("driver");
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const whatsappLeadText = useMemo(
    () =>
      formType === "driver"
        ? "Olá, vim da página Seja Parceiro e quero me cadastrar como motorista/agregado."
        : "Olá, vim da página Seja Parceiro e quero solicitar uma operação logística para minha empresa.",
    [formType]
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      partner_type: formType === "driver" ? "Motorista/Agregado" : "Empresa/Cliente",
      _subject:
        formType === "driver"
          ? `Novo cadastro de parceiro Logtudo: ${String(data.nome || "")}`
          : `Nova solicitação empresa Logtudo: ${String(data.empresa || "")}`,
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

  const isDriver = formType === "driver";
  const goToCadastro = (nextForm: FormType, nextProfile: ProfileType) => {
    setFormType(nextForm);
    setProfile(nextProfile);

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
              <h1>Seja parceiro de uma logística que cresce com previsibilidade.</h1>
              <p className="sp-lead">
                Se você é motorista parceiro, agregado ou operador com frota, conecte seu veículo a
                uma operação com suporte, processo e demanda real. Se sua empresa precisa escalar
                entregas B2B, fale com uma estrutura preparada para SLA, capilaridade e performance.
              </p>

              <div className="sp-hero-actions">
                <Button type="button" size="lg" onClick={() => goToCadastro("driver", "motoristas")}>
                  Quero ser motorista parceiro
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="border-primary/30 text-primary hover:text-primary"
                  onClick={() => goToCadastro("client", "empresas")}
                >
                  Quero contratar a Logtudo
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
                  <span className="sp-tag">Middle Mile</span>
                  <span className="sp-tag">Last Mile</span>
                  <span className="sp-tag">Distribuição Urbana</span>
                  <span className="sp-tag">Operações Dedicadas</span>
                </div>
              </article>

            </div>
          </div>
        </section>

        <section id="perfis">
          <div className="sp-container">
            <div className="sp-section-head">
              <div>
                <span className="sp-eyebrow">Escolha seu caminho</span>
                <h2>Uma única página, dois caminhos.</h2>
              </div>
            </div>

            <div className="sp-selector" role="tablist" aria-label="Perfis de parceria">
              <button
                type="button"
                className={profile === "motoristas" ? "active" : ""}
                role="tab"
                aria-selected={profile === "motoristas"}
                onClick={() => setProfile("motoristas")}
              >
                Sou motorista parceiro
              </button>
              <button
                type="button"
                className={profile === "empresas" ? "active" : ""}
                role="tab"
                aria-selected={profile === "empresas"}
                onClick={() => setProfile("empresas")}
              >
                Sou empresa contratante
              </button>
            </div>

            {profile === "motoristas" ? (
              <div className="sp-panel">
                <div className="sp-audience-layout">
                  <article className="sp-audience-card">
                    <span className="sp-eyebrow">Para motoristas</span>
                    <h3>Entre em uma operação séria, com suporte e oportunidades reais.</h3>
                    <p>
                      Ideal para agregados, motoristas com utilitário, toco, 3/4, truck, Fiorino ou frota leve que
                      buscam recorrência, acompanhamento operacional e entrada em uma rede logística
                      organizada.
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
                      O fluxo proposto reduz dúvidas: você informa cidade, tipo de veículo,
                      experiência e região de interesse, e a equipe direciona sua entrada conforme a
                      necessidade operacional.
                    </p>
                  </article>
                </div>
              </div>
            ) : (
              <div className="sp-panel">
                <div className="sp-audience-layout">
                  <article className="sp-audience-card">
                    <span className="sp-eyebrow">Para empresas</span>
                    <h3>Escalone sua operação com uma malha preparada para demanda B2B.</h3>
                    <p>
                      Empresas podem usar a página para iniciar conversas sobre distribuição urbana,
                      middle mile, last mile ou operações dedicadas com desenho logístico,
                      monitoramento e metas de performance.
                    </p>
                    <div className="sp-chip-row">
                      <span className="sp-chip">Capilaridade regional</span>
                      <span className="sp-chip">SLA contratual</span>
                      <span className="sp-chip">Planejamento de malha</span>
                      <span className="sp-chip">Escalabilidade</span>
                    </div>
                  </article>
                  <article className="sp-audience-card">
                    <span className="sp-eyebrow">Entrada consultiva</span>
                    <h3>Lead mais qualificado desde o primeiro contato.</h3>
                    <p>
                      Em vez de cair em um contato genérico, o prospect informa volume, segmento,
                      regiões e modelo de operação, o que acelera triagem comercial e proposta.
                    </p>
                  </article>
                </div>
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="sp-container">
            <div className="sp-section-head">
              <div>
                <span className="sp-eyebrow">Por que fazer parte</span>
                <h2>Argumentos certos para cada perfil.</h2>
              </div>
            </div>

            <div className="sp-benefits-grid">
              <article className="sp-benefit-card">
                <div className="sp-icon-pill">A</div>
                <h3>Para motoristas</h3>
                <p>
                  Posicione a Logtudo como uma rede confiável, com demanda organizada, comunicação
                  operacional e possibilidade de atuação em diferentes modalidades.
                </p>
              </article>
              <article className="sp-benefit-card">
                <div className="sp-icon-pill">B</div>
                <h3>Para agregados</h3>
                <p>
                  Destaque onboarding claro, análise rápida, oportunidades por região e melhor
                  alinhamento entre perfil de veículo e necessidade da operação.
                </p>
              </article>
              <article className="sp-benefit-card">
                <div className="sp-icon-pill">C</div>
                <h3>Para empresas</h3>
                <p>
                  Mostre cobertura, capacidade de absorver picos, desenho sob medida e integração
                  entre frota, processo e acompanhamento de indicadores.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="sp-highlight-band">
          <div className="sp-container">
            <div className="sp-section-head">
              <div>
                <span className="sp-eyebrow">Como funciona</span>
                <h2>Uma jornada simples e autoexplicativa.</h2>
              </div>
            </div>

            <div className="sp-steps-grid">
              <article className="sp-step">
                <div className="sp-step-number">01</div>
                <h3>Escolha o perfil</h3>
                <p>
                  Motorista parceiro, agregado ou empresa contratante. O conteúdo e o formulário se
                  adaptam ao tipo de perfil.
                </p>
              </article>
              <article className="sp-step">
                <div className="sp-step-number">02</div>
                <h3>Informe os dados</h3>
                <p>
                  Preenchimento guiado com dados relevantes para operação, comercial ou análise de
                  cadastro.
                </p>
              </article>
              <article className="sp-step">
                <div className="sp-step-number">03</div>
                <h3>Receba direcionamento</h3>
                <p>
                  A equipe identifica aderência por região, tipo de operação, volume e estrutura
                  disponível.
                </p>
              </article>
              <article className="sp-step">
                <div className="sp-step-number">04</div>
                <h3>Avance para ativação</h3>
                <p>
                  O próximo passo pode ser cadastro operacional, contato comercial, piloto logístico
                  ou negociação de operação dedicada.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="empresas">
          <div className="sp-container">
            <div className="sp-section-head">
              <div>
                <span className="sp-eyebrow">Prova operacional</span>
                <h2>Números que sustentam a proposta de parceria.</h2>
              </div>
            </div>

            <div className="sp-metrics-grid">
              <article className="sp-metric-tile">
                <span>Compromisso de performance</span>
                <strong>98,5% SLA</strong>
                <span>
                  Proposta forte para clientes que precisam previsibilidade e também para parceiros
                  que valorizam processo e organização.
                </span>
              </article>
              <article className="sp-metric-tile">
                <span>Capilaridade operacional</span>
                <strong>+200 cidades</strong>
                <span>
                  Mostra amplitude de cobertura e espaço para conectar diferentes perfis de parceiros
                  no Nordeste.
                </span>
              </article>
              <article className="sp-metric-tile">
                <span>Volume recorrente</span>
                <strong>+55 mil entregas</strong>
                <span>
                  Ajuda a comunicar maturidade, ritmo operacional e capacidade de absorver demandas
                  contínuas.
                </span>
              </article>
              <article className="sp-metric-tile">
                <span>Experiência acumulada</span>
                <strong>12+ anos</strong>
                <span>
                  Reforça credibilidade institucional e reduz a sensação de risco na entrada de novos
                  parceiros.
                </span>
              </article>
            </div>
          </div>
        </section>

        <section>
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

        <section id="cadastro">
          <div className="sp-container grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <div className="sp-section-head sp-contact-head">
                <div>
                  <span className="sp-eyebrow">Cadastro inteligente</span>
                  <h2>Formulário dinâmico para captar motoristas e clientes.</h2>
                </div>
              </div>

              <div className="sp-selector" role="tablist" aria-label="Tipo de formulário">
                <button
                  type="button"
                  className={isDriver ? "active" : ""}
                  onClick={() => setFormType("driver")}
                >
                  Motorista / Agregado
                </button>
                <button
                  type="button"
                  className={!isDriver ? "active" : ""}
                  onClick={() => setFormType("client")}
                >
                  Empresa / Cliente
                </button>
              </div>
            </div>

            <article className="lg:col-span-2">
              {isSubmitted ? (
                <div className="bg-card rounded-xl p-8 md:p-12 shadow-card text-center">
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
                <form onSubmit={handleSubmit} className="bg-card rounded-xl p-8 md:p-12 shadow-card">
                  <h3 className="text-xl font-semibold text-foreground mb-6">Informações da Solicitação</h3>

                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 ${!isDriver ? "sp-hidden" : ""}`}>
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome completo *</Label>
                      <Input id="nome" name="nome" placeholder="Seu nome" required={isDriver} disabled={!isDriver} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone / WhatsApp *</Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        placeholder="(71) 99999-9999"
                        required={isDriver}
                        disabled={!isDriver}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cidade">Cidade / UF</Label>
                      <Input id="cidade" name="cidade" placeholder="Simões Filho - BA" disabled={!isDriver} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="veiculo">Tipo de veículo</Label>
                      <Select name="veiculo" disabled={!isDriver}>
                        <SelectTrigger id="veiculo">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="moto">Moto</SelectItem>
                          <SelectItem value="utilitario">Utilitário</SelectItem>
                          <SelectItem value="van">Van</SelectItem>
                          <SelectItem value="vuc">VUC</SelectItem>
                          <SelectItem value="tres-quartos">3/4</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mei">Possui CNPJ / MEI?</Label>
                      <Select name="mei" disabled={!isDriver}>
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
                      <Select name="experiencia" disabled={!isDriver}>
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
                        disabled={!isDriver}
                      />
                    </div>
                  </div>

                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 ${isDriver ? "sp-hidden" : ""}`}>
                    <div className="space-y-2">
                      <Label htmlFor="empresa">Empresa *</Label>
                      <Input
                        id="empresa"
                        name="empresa"
                        placeholder="Nome da empresa"
                        required={!isDriver}
                        disabled={isDriver}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contato">Pessoa responsável *</Label>
                      <Input
                        id="contato"
                        name="contato"
                        placeholder="Seu nome"
                        required={!isDriver}
                        disabled={isDriver}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail corporativo *</Label>
                      <Input
                        id="email"
                        name="email"
                        placeholder="voce@empresa.com.br"
                        type="email"
                        required={!isDriver}
                        disabled={isDriver}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="volume">Volume mensal estimado</Label>
                      <Input
                        id="volume"
                        name="volume"
                        placeholder="Ex.: 8.000 entregas/mês"
                        disabled={isDriver}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="segmento">Segmento</Label>
                      <Select name="segmento" disabled={isDriver}>
                        <SelectTrigger id="segmento">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="industria">Indústria</SelectItem>
                          <SelectItem value="varejo">Varejo</SelectItem>
                          <SelectItem value="distribuidora">Distribuidora</SelectItem>
                          <SelectItem value="farma">Farma & Saúde</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="operacao">Modelo de operação</Label>
                      <Select name="operacao" disabled={isDriver}>
                        <SelectTrigger id="operacao">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="middle-mile">Middle Mile</SelectItem>
                          <SelectItem value="last-mile">Last Mile</SelectItem>
                          <SelectItem value="distribuicao-urbana">Distribuição Urbana</SelectItem>
                          <SelectItem value="operacao-dedicada">Operação Dedicada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="briefing">Regiões, prazo e contexto</Label>
                      <Textarea
                        id="briefing"
                        name="briefing"
                        placeholder="Conte rapidamente o que sua operação precisa."
                        disabled={isDriver}
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
                  Nossa equipe comercial responde todas as solicitações em até 48 horas úteis.
                </p>
                <Button variant="whatsapp" className="w-full" asChild>
                  <a
                    href={`https://wa.me/${company.whatsapp}?text=Olá, gostaria de mais informações sobre parceria.`}
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
