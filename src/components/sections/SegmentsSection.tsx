import { ShoppingCart, Factory, Store, Building2, Package2, Pill } from "lucide-react";

const segments = [
  { icon: ShoppingCart, name: "E-commerce", description: "Entregas B2C e B2B2C" },
  { icon: Factory, name: "Indústria", description: "Distribuição nacional" },
  { icon: Store, name: "Varejo", description: "Abastecimento de lojas" },
  { icon: Building2, name: "Marketplaces", description: "Fulfillment e last mile" },
  { icon: Package2, name: "Distribuidoras", description: "Transferência e entrega" },
  { icon: Pill, name: "Farma & Saúde", description: "Cadeia fria e controlados" },
];

export function SegmentsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Segmentos
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
            Especialistas em diversos setores
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Experiência e processos adaptados às particularidades de cada mercado.
          </p>
        </div>

        {/* Segments grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {segments.map((segment) => (
            <div
              key={segment.name}
              className="group flex flex-col items-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-card transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                <segment.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-semibold text-foreground text-center mb-1">
                {segment.name}
              </h3>
              <p className="text-xs text-muted-foreground text-center">
                {segment.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
