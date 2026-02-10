// c:\Users\felip\OneDrive\Logtudo\Site_logtudo\src\pages\Admin.tsx
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useContent } from "@/contexts/ContentContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus } from "lucide-react";

export default function Admin() {
  const { content, updateContent } = useContent();
  const { toast } = useToast();
  
  // Estados locais para formulários
  const [heroForm, setHeroForm] = useState(content.hero);
  const [companyForm, setCompanyForm] = useState(content.company);
  const [solutionsForm, setSolutionsForm] = useState(content.solutions);
  const [clientsForm, setClientsForm] = useState(content.clients);

  // Sincronizar estado se o contexto mudar (opcional, útil para carregamento inicial)
  useEffect(() => {
    setHeroForm(content.hero);
    setCompanyForm(content.company);
    setSolutionsForm(content.solutions);
    setClientsForm(content.clients);
  }, [content]);

  const handleSave = (section: string) => {
    switch(section) {
      case 'hero':
        updateContent("hero", heroForm);
        break;
      case 'company':
        updateContent("company", companyForm);
        break;
      case 'solutions':
        updateContent("solutions", solutionsForm);
        break;
      case 'clients':
        updateContent("clients", clientsForm);
        break;
    }
    toast({ title: "Alterações salvas!", description: `Seção ${section} atualizada com sucesso.` });
  };

  // Helper para atualizar estatísticas do Hero
  const updateHeroStat = (index: number, field: string, value: string) => {
    const newHero = { ...heroForm };
    const newStats = [...newHero.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    newHero.stats = newStats;
    setHeroForm(newHero);
  };

  const addHeroStat = () => {
    const newHero = { ...heroForm };
    newHero.stats.push({ value: "0", label: "Novo Dado", delay: "0.2s" });
    setHeroForm(newHero);
  };

  const removeHeroStat = (index: number) => {
    const newHero = { ...heroForm };
    newHero.stats.splice(index, 1);
    setHeroForm(newHero);
  };

  // Helper para atualizar arrays aninhados (Soluções)
  const updateSolution = (index: number, field: string, value: any) => {
    const newSolutions = [...solutionsForm];
    newSolutions[index] = { ...newSolutions[index], [field]: value };
    setSolutionsForm(newSolutions);
  };

  const addSolution = () => {
    setSolutionsForm([
      ...solutionsForm,
      { icon: "Package", title: "Nova Solução", description: "Descrição do serviço.", benefits: ["Benefício"] }
    ]);
  };

  const removeSolution = (index: number) => {
    const newSolutions = [...solutionsForm];
    newSolutions.splice(index, 1);
    setSolutionsForm(newSolutions);
  };

  // Helper para atualizar depoimentos
  const updateTestimonial = (index: number, field: string, value: string) => {
    const newClients = { ...clientsForm };
    const newTestimonials = [...newClients.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    newClients.testimonials = newTestimonials;
    setClientsForm(newClients);
  };

  const addTestimonial = () => {
    const newClients = { ...clientsForm };
    newClients.testimonials.push({
      quote: "Depoimento do cliente.",
      author: "Nome",
      role: "Cargo",
      company: "Empresa"
    });
    setClientsForm(newClients);
  };

  const removeTestimonial = (index: number) => {
    const newClients = { ...clientsForm };
    newClients.testimonials.splice(index, 1);
    setClientsForm(newClients);
  };

  // Helper para atualizar logos
  const updateLogo = (index: number, field: string, value: string) => {
    const newClients = { ...clientsForm };
    const newLogos = [...newClients.logos];
    newLogos[index] = { ...newLogos[index], [field]: value };
    newClients.logos = newLogos;
    setClientsForm(newClients);
  };

  const addLogo = () => {
    const newClients = { ...clientsForm };
    newClients.logos.push({ name: "Novo Cliente", logo: "" });
    setClientsForm(newClients);
  };

  const removeLogo = (index: number) => {
    const newClients = { ...clientsForm };
    newClients.logos.splice(index, 1);
    setClientsForm(newClients);
  };

  // Stats (Estatísticas)
  const updateClientStat = (index: number, field: string, value: string) => {
    const newClients = { ...clientsForm };
    const newStats = [...newClients.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    newClients.stats = newStats;
    setClientsForm(newClients);
  };

  const addClientStat = () => {
    const newClients = { ...clientsForm };
    newClients.stats.push({ value: "100+", label: "Nova Estatística" });
    setClientsForm(newClients);
  };

  const removeClientStat = (index: number) => {
    const newClients = { ...clientsForm };
    newClients.stats.splice(index, 1);
    setClientsForm(newClients);
  };

  // Helper para upload de imagem (converte para Base64)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 container-tight">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <Button variant="outline" onClick={() => window.location.href = "/"}>Ver Site</Button>
        </div>
        
        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="hero">Hero & Capa</TabsTrigger>
            <TabsTrigger value="solutions">Soluções</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="company">Empresa</TabsTrigger>
          </TabsList>

          {/* HERO TAB */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Seção Hero</CardTitle>
                <CardDescription>Edite o texto principal e a imagem de fundo da página inicial.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Badge (Texto Superior)</Label>
                    <Input 
                      value={heroForm.badge} 
                      onChange={(e) => setHeroForm({...heroForm, badge: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Título - Parte 1</Label>
                    <Input 
                      value={heroForm.headlinePart1} 
                      onChange={(e) => setHeroForm({...heroForm, headlinePart1: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Título - Destaque (Azul)</Label>
                    <Input 
                      value={heroForm.headlineHighlight} 
                      onChange={(e) => setHeroForm({...heroForm, headlineHighlight: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Título - Parte 2</Label>
                    <Input 
                      value={heroForm.headlinePart2} 
                      onChange={(e) => setHeroForm({...heroForm, headlinePart2: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Imagem de Fundo (URL ou Arquivo Local)</Label>
                    <div className="flex gap-2">
                      <Input 
                        value={heroForm.backgroundImage} 
                        onChange={(e) => setHeroForm({...heroForm, backgroundImage: e.target.value})} 
                        placeholder="https://exemplo.com/imagem.jpg"
                      />
                      <div className="relative">
                        <Button variant="outline" type="button" className="cursor-pointer">
                          Upload
                          <input 
                            type="file" 
                            className="absolute inset-0 opacity-0 cursor-pointer" 
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, (b64) => setHeroForm({...heroForm, backgroundImage: b64}))}
                          />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Cole uma URL ou selecione um arquivo do seu computador.</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Opacidade da Película (0.0 a 1.0)</Label>
                    <Input 
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={heroForm.overlayOpacity || "0.3"} 
                      onChange={(e) => setHeroForm({...heroForm, overlayOpacity: e.target.value})} 
                    />
                  </div>
                </div>

                <Separator className="my-6" />
                <h3 className="font-semibold mb-4">Estatísticas do Hero</h3>
                <div className="space-y-4">
                  {heroForm.stats.map((stat, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-4 bg-muted/10">
                      <div className="flex justify-between items-center">
                        <Label>Dado {index + 1}</Label>
                        <Button variant="destructive" size="sm" onClick={() => removeHeroStat(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Valor</Label>
                          <Input value={stat.value} onChange={(e) => updateHeroStat(index, 'value', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label>Rótulo</Label>
                          <Input value={stat.label} onChange={(e) => updateHeroStat(index, 'label', e.target.value)} />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button onClick={addHeroStat} variant="outline" className="w-full border-dashed">
                    <Plus className="h-4 w-4 mr-2" /> Adicionar Estatística ao Hero
                  </Button>
                </div>

                <Button onClick={() => handleSave('hero')} className="mt-8 w-full">Salvar Alterações Hero</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SOLUTIONS TAB */}
          <TabsContent value="solutions">
            <Card>
              <CardHeader>
                <CardTitle>Soluções</CardTitle>
                <CardDescription>Gerencie os cards de serviços oferecidos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {solutionsForm.map((solution, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4 bg-muted/10">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Serviço {index + 1}</h3>
                      <Button variant="destructive" size="sm" onClick={() => removeSolution(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Título</Label>
                        <Input 
                          value={solution.title} 
                          onChange={(e) => updateSolution(index, 'title', e.target.value)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Ícone (Nome Lucide)</Label>
                        <Input 
                          value={solution.icon} 
                          onChange={(e) => updateSolution(index, 'icon', e.target.value)} 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Descrição</Label>
                      <Textarea 
                        value={solution.description} 
                        onChange={(e) => updateSolution(index, 'description', e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Benefícios (Separados por vírgula)</Label>
                      <Input 
                        value={solution.benefits?.join(', ')} 
                        onChange={(e) => updateSolution(index, 'benefits', e.target.value.split(',').map(b => b.trim()))} 
                      />
                    </div>
                  </div>
                ))}
                <Button onClick={addSolution} variant="outline" className="w-full border-dashed">
                  <Plus className="h-4 w-4 mr-2" /> Adicionar Solução
                </Button>
                <Button onClick={() => handleSave('solutions')}>Salvar Soluções</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CLIENTS TAB */}
          <TabsContent value="clients">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Estatísticas (Cards)</CardTitle>
                <CardDescription>Números de destaque na seção de clientes.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {clientsForm.stats.map((stat, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4 bg-muted/10">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Estatística {index + 1}</h3>
                      <Button variant="destructive" size="sm" onClick={() => removeClientStat(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Valor</Label>
                        <Input value={stat.value} onChange={(e) => updateClientStat(index, 'value', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Rótulo</Label>
                        <Input value={stat.label} onChange={(e) => updateClientStat(index, 'label', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
                <Button onClick={addClientStat} variant="outline" className="w-full border-dashed">
                  <Plus className="h-4 w-4 mr-2" /> Adicionar Estatística
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Depoimentos</CardTitle>
                <CardDescription>O que os clientes dizem.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {clientsForm.testimonials.map((testimonial, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4 bg-muted/10">
                    <div className="flex justify-end mb-2">
                      <Button variant="destructive" size="sm" onClick={() => removeTestimonial(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label>Citação</Label>
                      <Textarea 
                        value={testimonial.quote} 
                        onChange={(e) => updateTestimonial(index, 'quote', e.target.value)} 
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Autor</Label>
                        <Input 
                          value={testimonial.author} 
                          onChange={(e) => updateTestimonial(index, 'author', e.target.value)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Cargo</Label>
                        <Input 
                          value={testimonial.role} 
                          onChange={(e) => updateTestimonial(index, 'role', e.target.value)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Empresa</Label>
                        <Input 
                          value={testimonial.company} 
                          onChange={(e) => updateTestimonial(index, 'company', e.target.value)} 
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button onClick={addTestimonial} variant="outline" className="w-full border-dashed">
                  <Plus className="h-4 w-4 mr-2" /> Adicionar Depoimento
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Logos de Clientes</CardTitle>
                <CardDescription>Gerencie as logos exibidas na seção de confiança.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {clientsForm.logos.map((logo, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4 bg-muted/10">
                    <div className="flex justify-end mb-2">
                      <Button variant="destructive" size="sm" onClick={() => removeLogo(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nome da Empresa</Label>
                        <Input 
                          value={logo.name} 
                          onChange={(e) => updateLogo(index, 'name', e.target.value)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>URL da Logo (ou Arquivo Local)</Label>
                        <div className="flex gap-2">
                          <Input 
                            value={logo.logo} 
                            onChange={(e) => updateLogo(index, 'logo', e.target.value)} 
                            placeholder="URL da imagem"
                          />
                          <div className="relative">
                            <Button variant="outline" type="button" className="cursor-pointer">
                              Upload
                              <input 
                                type="file" 
                                className="absolute inset-0 opacity-0 cursor-pointer" 
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, (b64) => updateLogo(index, 'logo', b64))}
                              />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button onClick={addLogo} variant="outline" className="w-full border-dashed">
                  <Plus className="h-4 w-4 mr-2" /> Adicionar Logo
                </Button>
                <Button onClick={() => handleSave('clients')} className="w-full mt-4">Salvar Alterações em Clientes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* COMPANY TAB */}
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Dados da Empresa</CardTitle>
                <CardDescription>Informações de contato e localização.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Endereço</Label>
                  <Textarea 
                    value={companyForm.address} 
                    onChange={(e) => setCompanyForm({...companyForm, address: e.target.value})} 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Telefone (Exibição)</Label>
                    <Input 
                      value={companyForm.phone} 
                      onChange={(e) => setCompanyForm({...companyForm, phone: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Telefone (Link tel:)</Label>
                    <Input 
                      value={companyForm.phoneLink} 
                      onChange={(e) => setCompanyForm({...companyForm, phoneLink: e.target.value})} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>E-mail</Label>
                  <Input 
                    value={companyForm.email} 
                    onChange={(e) => setCompanyForm({...companyForm, email: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Horário de Funcionamento</Label>
                  <Input 
                    value={companyForm.hours} 
                    onChange={(e) => setCompanyForm({...companyForm, hours: e.target.value})} 
                  />
                </div>
                <Separator className="my-4" />
                <h3 className="font-semibold mb-2">Configuração do WhatsApp</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label>Número (apenas dígitos, com DDI)</Label>
                    <Input 
                      value={companyForm.whatsapp} 
                      onChange={(e) => setCompanyForm({...companyForm, whatsapp: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Mensagem Padrão</Label>
                    <Input 
                      value={companyForm.whatsappMessage} 
                      onChange={(e) => setCompanyForm({...companyForm, whatsappMessage: e.target.value})} 
                    />
                  </div>
                </div>
                <Button onClick={() => handleSave('company')} className="mt-4">Salvar Dados da Empresa</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
