# Pastelaria VistaPark

Este aplicativo é uma plataforma web responsiva para moradores de condomínio realizarem pedidos de pastéis (doces e salgados) diretamente pelo WhatsApp, sem necessidade de sistema de pagamento interno. O usuário pode:

### Filtrar entre pastéis doces e salgados

### Selecionar quantidade de cada sabor e adicionar observações (ex.: sem cebola, mais queijo)

### Escolher forma de pagamento (Cartão, Pix ou Dinheiro) com campo para informar valor em dinheiro para troco

### Informar torre e apartamento para entrega

### Finalizar o pedido gerando um deep link que abre o WhatsApp com a mensagem formatada

# Tecnologias Utilizadas

### Next.js (React) para renderização híbrida (SSG/SSR), roteamento e otimizações de performance

### TypeScript para tipagem estática e maior segurança de código

### React Context + useReducer para gerenciamento global do estado do carrinho de compras

### localStorage para persistir dados do carrinho entre sessões do usuário

### Tailwind CSS para estilização utilitária e design responsivo

### React Hook Form + Zod para gerenciamento e validação de formulários de checkout

### Lucide React para ícones leves e personalizáveis

### next/font para otimizar o carregamento das fontes Inter e Agbalumo

### WhatsApp API (deep link) para envio de pedidos ao número configurado
