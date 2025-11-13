# Snake Game em React

## 🐍 Jogo da Cobrinha Reimplementado com React

O **Snake Game em React** é uma reimplementação do clássico jogo da cobrinha, desta vez utilizando a biblioteca **React** para gerenciar o estado e a lógica do jogo, e a API **Canvas** para a renderização gráfica. Este projeto demonstra a aplicação de conceitos modernos de desenvolvimento *frontend* (como *hooks* e componentes funcionais) para a criação de jogos interativos.

### ✨ Funcionalidades em Destaque

*   **Desenvolvimento em React:** Utiliza `useState`, `useEffect` e `useRef` para um gerenciamento de estado e ciclo de vida do jogo eficiente e reativo.
*   **Renderização com Canvas:** Mantém a renderização de alto desempenho através do elemento `<canvas>`, com a lógica de desenho controlada pelo React.
*   **Lógica de Jogo Completa:** Inclui todas as mecânicas essenciais do Snake, como movimento contínuo, crescimento da cobra e detecção de colisão.
*   **Temas (Dark/Light Mode):** O código sugere a implementação de um sistema de temas (escuro e claro) para o jogo.
*   **Estrutura Modular:** O projeto é bem estruturado, com a lógica do jogo encapsulada no componente `Game.jsx` e componentes de UI separados (`posWelcome`, `welcome`).

### 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso Principal |
| :--- | :--- |
| **React** | Biblioteca JavaScript para construção da interface e lógica do jogo. |
| **JavaScript (ES6+)** | Lógica do jogo e manipulação de estado. |
| **Canvas API** | Renderização gráfica do jogo. |
| **CSS** | Estilização dos componentes e do layout. |

### 📂 Estrutura do Projeto

O projeto segue a estrutura padrão de um aplicativo React, com foco nos seguintes diretórios:

```
Snake-game-React/
├── public/         # Arquivos estáticos
├── src/
│   ├── assets/     # Ativos de mídia (imagens, etc.)
│   ├── components/ # Componentes reutilizáveis (ex: Button)
│   ├── pages/      # Componentes de página (game, posWelcome, welcome)
│   ├── utils/      # Funções utilitárias (ex: imageBase)
│   └── App.js      # Componente principal e roteamento
└── package.json    # Dependências e scripts do projeto
```

### 🚀 Como Executar

Para rodar o projeto localmente, siga os passos abaixo:

```bash
# 1. Clone o repositório
git clone https://github.com/BrizidoAndre/Snake-game-React.git

# 2. Navegue até o diretório do projeto
cd Snake-game-React

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm start
```

O jogo estará disponível em `http://localhost:3000` (ou outra porta, se a 3000 estiver ocupada).

### 📝 Licença

Este projeto está sob a licença [MIT](https://choosealicense.com/licenses/mit/).

---
*Desenvolvido por [BrizidoAndre](https://github.com/BrizidoAndre)*
