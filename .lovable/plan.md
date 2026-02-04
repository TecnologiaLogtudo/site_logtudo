
# Plano: Adicionar Seção de Localização com Mapa do Google

## Resumo
Criar uma nova seção de localização que exibe um mapa interativo do Google Maps acima do rodapé. A seção incluira o endereço da empresa e informacoes de contato ao lado do mapa.

---

## O Que Sera Feito

### 1. Criar o Componente de Localização
Um novo componente `LocationSection.tsx` sera criado com:

- **Mapa do Google Maps** - Usando iframe embed (nao requer API key)
- **Informacoes de contato** - Endereco, telefone e email ao lado do mapa
- **Animacoes de scroll** - Seguindo o padrao das outras secoes
- **Design responsivo** - Layout em grid que se adapta mobile/desktop

### 2. Estrutura Visual

```text
+--------------------------------------------------+
|              NOSSA LOCALIZAÇÃO                    |
|--------------------------------------------------|
|                                                  |
|  [Card com Endereco]     [     Mapa Google     ] |
|  - Endereco completo     |                     | |
|  - Telefone              |        [iframe]     | |
|  - Email                 |                     | |
|  - Horario               |                     | |
|                                                  |
+--------------------------------------------------+
```

### 3. Integrar nas Paginas

- **Home (Index.tsx)**: Adicionar `<LocationSection />` entre `CTASection` e `Footer`
- **Contato (Contato.tsx)**: Adicionar `<LocationSection />` antes do `Footer`

---

## Detalhes Tecnicos

### Arquivo a Criar
- `src/components/sections/LocationSection.tsx`

### Arquivos a Modificar
- `src/pages/Index.tsx` - Importar e adicionar o componente
- `src/pages/Contato.tsx` - Importar e adicionar o componente

### Tecnologia Utilizada
- **Google Maps Embed API** - Gratuita, nao requer API key
- O mapa sera incorporado via iframe com a URL do Google Maps
- Placeholder com endereco generico de Sao Paulo (pode ser atualizado depois)

### Animacoes
- Fade-in + slide-up ao entrar na viewport (usando `useScrollAnimation`)
- Delay staggered entre elementos

---

## Resultado Esperado
Uma secao profissional com mapa interativo que:
- Reforça a presença fisica da empresa
- Facilita localizacao para visitas/reunioes
- Mantem consistencia visual com o resto do site
- Funciona perfeitamente em desktop e mobile
