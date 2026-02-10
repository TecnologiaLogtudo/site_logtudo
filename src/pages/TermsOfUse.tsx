import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero */}
        <section className="hero-gradient py-16 md:py-24">
          <div className="container-tight">
            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                Termos de Uso
              </h1>
              <p className="text-lg text-primary-foreground/80">
                Última atualização: 04 de Fevereiro de 2026
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-padding">
          <div className="container-tight">
            <div className="prose prose-lg max-w-none mx-auto">
              <h2>1. Termos</h2>
              <p>
                Ao acessar ao site <a href="https://logtudo.com.br">Logtudo</a>, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
              </p>

              <h2>2. Uso de Licença</h2>
              <p>
                É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Logtudo, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
              </p>
              <ul>
                <li>modificar ou copiar os materiais;</li>
                <li>usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
                <li>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Logtudo;</li>
                <li>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
                <li>transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.</li>
              </ul>
              <p>
                Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por Logtudo a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrónico ou impresso.
              </p>

              <h2>3. Isenção de responsabilidade</h2>
              <p>
                Os materiais no site da Logtudo são fornecidos 'como estão'. Logtudo не oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
              </p>
              <p>
                Além disso, o Logtudo não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ​​ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.
              </p>

              <h2>4. Limitações</h2>
              <p>
                Em nenhum caso o Logtudo ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Logtudo, mesmo que Logtudo ou um representante autorizado da Logtudo tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos conseqüentes ou incidentais, essas limitações могут não se aplicar a você.
              </p>

              <h2>5. Precisão dos materiais</h2>
              <p>
                Os materiais exibidos no site da Logtudo podem incluir erros técnicos, tipográficos ou fotográficos. Logtudo não garante que qualquer material em seu site seja preciso, completo ou atual. Logtudo pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, Logtudo não se compromete a atualizar os materiais.
              </p>

              <h2>6. Links</h2>
              <p>
                O Logtudo não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por Logtudo do site. O uso de qualquer site vinculado é por conta e risco do usuário.
              </p>

              <h3>Modificações</h3>
              <p>
                O Logtudo pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
              </p>

              <h3>Lei aplicável</h3>
              <p>
                Estes termos e condições são regidos e interpretados de acordo com as leis do Logtudo e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
