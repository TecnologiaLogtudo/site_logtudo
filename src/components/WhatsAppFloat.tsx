import { MessageCircle } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";

export function WhatsAppFloat() {
  const { content } = useContent();
  const { company } = content;

  return (
    <a
      href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(company.whatsappMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] text-primary-foreground shadow-lg hover:bg-[hsl(142,70%,40%)] hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
