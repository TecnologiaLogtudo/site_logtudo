// c:\Users\felip\OneDrive\Logtudo\Site_logtudo\src\contexts\ContentContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Importações de imagens padrão
import heroBgImg from "@/assets/hero.png";
import logoCliente1 from "@/assets/logo-amazon.webp";
import logoCliente2 from "@/assets/logo-Latam.png";
import logoCliente3 from "@/assets/Logo-lactalis.webp";
import logoCliente4 from "@/assets/logo-itambe.png";
import logoCliente5 from "@/assets/3-coracoes.png";

export interface HeroData {
  badge: string;
  headlinePart1: string;
  headlineHighlight: string;
  headlinePart2: string;
  stats: { value: string; label: string; delay: string }[];
  backgroundImage: string;
  overlayOpacity?: string;
}

export interface ServiceData {
  icon: string;
  title: string;
  description: string;
  benefits: string[];
}

export interface TestimonialData {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface ClientLogoData {
  name: string;
  logo: string;
}

export interface CompanyData {
  address: string;
  phone: string;
  phoneLink: string;
  email: string;
  hours: string;
  whatsapp: string;
  whatsappMessage: string;
}

export interface ContentState {
  hero: HeroData;
  solutions: ServiceData[];
  clients: {
    stats: { value: string; label: string }[];
    testimonials: TestimonialData[];
    logos: ClientLogoData[];
  };
  company: CompanyData;
}

interface ContentContextType {
  content: ContentState;
  updateContent: (section: keyof ContentState, data: any) => void;
}

const defaultState: ContentState = {
  hero: {
    badge: "Operações em todo o Nordeste",
    headlinePart1: "Mais do que transportar, ",
    headlineHighlight: "conectamos",
    headlinePart2: "negócios com inteligência",
    stats: [
      { value: "98,5%", label: "SLA de Entrega", delay: "0.4s" },
      { value: "+500", label: "Cidades Atendidas", delay: "0.5s" },
      { value: "+2M", label: "Entregas/Mês", delay: "0.6s" },
    ],
    backgroundImage: heroBgImg,
    overlayOpacity: "0.3",
  },
  solutions: [
    {
      icon: "Truck",
      title: "Middle Mile",
      description: "Transferência de cargas entre centros de distribuição com rastreabilidade total e janelas de entrega garantidas.",
      benefits: ["Rotas otimizadas", "Monitoramento GPS", "SLA contratual"],
    },
    {
      icon: "Package",
      title: "Last Mile",
      description: "Entrega final ao destinatário com capilaridade em todo o nordeste, tecnologia de roteirização e comprovação digital.",
      benefits: ["Prova de entrega", "Notificações ao cliente", "Tentativas múltiplas"],
    },
    {
      icon: "MapPin",
      title: "Distribuição Urbana",
      description: "Operações em centros urbanos com veículos adequados, equipe treinada e gestão de restrições de tráfego.",
      benefits: ["Veículos leves", "Zonas de restrição", "Janelas flexíveis"],
    },
    {
      icon: "Users",
      title: "Operações Dedicadas",
      description: "Estrutura exclusiva para sua operação: frota, equipe e processos customizados às suas necessidades.",
      benefits: ["Frota exclusiva", "KPIs personalizados", "Integração de sistemas"],
    },
  ],
  clients: {
    stats: [
      { value: "+150", label: "Clientes Ativos" },
      { value: "12+", label: "Anos de Mercado" },
      { value: "+2M", label: "Entregas/Mês" },
      { value: "98,5%", label: "SLA Médio" },
    ],
    testimonials: [
      {
        quote: "A Logtudo transformou nossa operação last mile. Reduzimos devoluções em 40% e o SLA saltou de 92% para 98%.",
        author: "Carlos Mendes",
        role: "Diretor de Supply Chain",
        company: "E-commerce Nacional",
      },
      {
        quote: "Parceria estratégica que nos permitiu escalar de 50 mil para 300 mil entregas/mês sem perder qualidade.",
        author: "Ana Paula Costa",
        role: "Head de Operações",
        company: "Distribuidora B2B",
      },
    ],
    logos: [
      { name: "E-Commerce A", logo: logoCliente1 },
      { name: "Indústria B", logo: logoCliente2 },
      { name: "Varejo C", logo: logoCliente3 },
      { name: "Marketplace D", logo: logoCliente4 },
      { name: "Distribuidora E", logo: logoCliente5 }
    ]
  },
  company: {
    address: "Via Urbana, s/n - CIA Sul\nSimões Filho - BA, 43721-450",
    phone: "(71) 98428-8956",
    phoneLink: "+5571984288956",
    email: "sucessoaocliente@logtudo.com.br",
    hours: "Segunda a Sexta: 08h às 17h",
    whatsapp: "5571984288956",
    whatsappMessage: "Olá, gostaria de mais informações sobre as soluções logísticas da Logtudo"
  }
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentState>(defaultState);
  const [loading, setLoading] = useState(true);

  // Load content from API on mount
  React.useEffect(() => {
    const fetchContent = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const response = await fetch(`${apiUrl}/api/content`);
        if (response.ok) {
          const data = await response.json();
          // Merge fetched data with default state to ensure all keys exist
          // If the DB is empty, it keeps defaultState
          if (Object.keys(data).length > 0) {
            setContent(prev => ({ ...prev, ...data }));
          }
        }
      } catch (error) {
        console.error("Failed to fetch content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const updateContent = async (section: keyof ContentState, data: any) => {
    // Optimistic update
    setContent((prev) => ({
      ...prev,
      [section]: data,
    }));

    // Persist to backend
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      await fetch(`${apiUrl}/api/content/${section}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(`Failed to save section ${section}:`, error);
      // Optional: Revert state on error if strict consistency is needed
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
