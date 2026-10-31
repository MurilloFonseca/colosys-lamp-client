# Colosys Lamp Client

Interface web do **Colosys Sentinel**, desenvolvida com React e Vite. O front-end consome a API do [colosys-lamp-server](https://github.com/MurilloFonseca/colosys-lamp-server) para autenticação, gerenciamento de dispositivos, leituras atuais, histórico e configuração dos limites.

## Funcionalidades

As rotas declaradas em `src/router.jsx` incluem:

| Rota | Finalidade |
|---|---|
| `/` | Página inicial |
| `/manual` | Manual de uso |
| `/config` | Configurações da aplicação |
| `/lamp/cadastro` | Cadastro de lâmpada/dispositivo |
| `/lamp/atual` | Leituras atuais |
| `/lamp/historico` | Histórico de medições |
| `/lamp/config` | Configuração do dispositivo e limites |
| `/login` | Login |
| `/cadastro` | Cadastro de usuário |

O código inclui integração com a API por Axios, autenticação baseada em cookie, fluxo de leituras em tempo real e consulta do histórico. Os gráficos usam Plotly.js.

## Tecnologias

- React 19 e React DOM
- Vite 8
- React Router
- Axios
- Tailwind CSS 4
- Plotly.js e `react-plotly.js`
- ESLint

## Requisitos

- Node.js compatível com a versão do Vite definida em `package.json`.
- npm.
- Uma instância acessível do back-end [colosys-lamp-server](https://github.com/MurilloFonseca/colosys-lamp-server).

## Execução local

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/MurilloFonseca/colosys-lamp-client.git
cd colosys-lamp-client
npm install
```

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Edite `.env` e configure a origem da API:

```dotenv
VITE_API_URL=http://localhost:8000
```

`VITE_API_URL` deve conter a origem base da API, sem `/api` no final. O cliente acrescenta `/api` automaticamente. O valor padrão no código também é `http://localhost:8000`.

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para abrir no navegador.

## Scripts disponíveis

```bash
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção
npm run preview  # pré-visualização local do build
npm run lint     # análise estática com ESLint
```

## Publicação na Vercel

O front-end é publicado na Vercel. Nas configurações do projeto, defina a variável de ambiente:

```dotenv
VITE_API_URL=https://URL-PUBLICA-DA-API
```

Substitua o valor de exemplo pela origem real do back-end. Depois de alterar uma variável `VITE_*`, gere um novo deploy para que o valor seja incorporado ao build.

Para uma implantação funcional:

- A API precisa estar acessível a partir do navegador do usuário.
- A variável `CORS_ORIGINS` do back-end deve incluir a origem exata do site publicado na Vercel.
- Como a API utiliza cookies, configure corretamente o domínio, HTTPS, CORS com credenciais e `COOKIE_SECURE`. A política de cookies deve permitir o cenário real de front-end e API; não presuma que a configuração local funcionará sem ajustes em produção.

## Integração com a API

O cliente centraliza as requisições em `src/api/apiClient.js`. O endereço é obtido de `import.meta.env.VITE_API_URL`, e as chamadas usam o prefixo `/api`. O Axios está configurado com `withCredentials: true` para enviar cookies de autenticação.

Os módulos em `src/api/endpoints/` encapsulam operações de autenticação e dispositivos. O back-end correspondente documenta as rotas e a configuração de implantação.

## Estrutura relevante

```text
src/
├── api/
│   ├── apiClient.js
│   └── endpoints/
├── components/
├── data/
├── hooks/
├── layouts/
├── pages/
│   └── Lamp/
├── helpers/
└── router.jsx
```

A estrutura acima destaca diretórios e arquivos identificados no repositório; não é uma listagem exaustiva.

## Repositórios relacionados

- **Projeto principal e arquitetura:** https://github.com/MurilloFonseca/colosys-sentinel
- **Back-end:** https://github.com/MurilloFonseca/colosys-lamp-server
- **Simulação:** https://wokwi.com/projects/465199340265498625
