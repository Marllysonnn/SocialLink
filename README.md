# Social Links Manager

Este projeto é uma aplicação web para gerenciar links de redes sociais de usuários. Ele permite adicionar, visualizar e organizar links de diferentes plataformas sociais, além de oferecer suporte a autenticação e logout. Também oferencendo responsividade para dispositivos mobile.

## 🚀 Funcionalidades

- Exibição de links sociais organizados por plataforma.
- Adicionar novos links sociais.
- Autenticação de usuários com Firebase.
- Logout seguro.
- Modal para adicionar links.
- Suporte a múltiplas plataformas sociais.

## Estrutura do Prjeto 

SocialLink/
├── index.html
├── package.json
├── README.md
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── eslint.config.js
├── .gitignore
└── src/
    ├── App.scss
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── vite-env.d.ts
    ├── assets/
    │   ├── react.svg
    │   └── img/
    │       ├── google.png
    │       ├── instagram.png
    │       └── login.png
    ├── components/
    │   ├── cards.scss
    │   ├── cards.tsx
    │   ├── modal.scss
    │   └── modal.tsx
    ├── constants/
    │   └── platform.ts
    ├── login/
    │   ├── UserForm.scss
    │   └── UserForm.tsx
    ├── page/
    │   ├── principal.scss
    │   └── principal.tsx
    ├── routes/
    │   └── routes.tsx
    └── service/
        └── firebase.ts

## 🛠️ Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface.
- **TypeScript**: Tipagem estática para maior segurança e produtividade.
- **Firebase**: Backend para autenticação e armazenamento de dados.
- **SCSS**: Estilização avançada com suporte a variáveis e mixins.
- **React Router**: Gerenciamento de rotas.
- **Vercel**: Hospedagem e deploy.


## ⚙️ Configuração e Execução

### Pré-requisitos
- Node.js instalado.
- Gerenciador de pacotes `npm` ou `yarn`.

### Instalação
1. Clone o repositório:
    git clone https://github.com/Marllysonnn/SocialLink.git

2. Instale as dependências:
    npm install

### Execução

1. Inicie o servidor de desenvolvimento:
    npm start

2. Acesse a aplicação em:
    http://localhost:3000.

### Build para Produção

1. Gere o build 
    npm run build

## Deploy
Este projeto está configurado para deploy no Vercel. Certifique-se de que as variáveis de ambiente necessárias estão configuradas no painel do Vercel.

📝 Variáveis de Ambiente
Certifique-se de configurar as seguintes variáveis de ambiente no arquivo .env ou no painel do Vercel:

REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID
📄 Licença
Este projeto está licenciado sob a MIT License.

📧 Contato
Caso tenha dúvidas ou sugestões, entre em contato pelo e-mail: marllyson.alves797@gmail.com

Certifique-se de ajustar os detalhes, como o nome do repositório, variáveis de ambiente e informações de contato, conforme necessário.
