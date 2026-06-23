<div align="center">

# 🏥 CliniDesk

**Sistema completo e dinâmico para recepção, gerenciamento, confirmação e controle de consultas clínicas em tempo real.**

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18+-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/Licença-Educacional-blue?style=flat-square)](./LICENSE)

</div>

---

## 📋 Descrição do Projeto

O **CliniDesk** é uma solução moderna desenvolvida para centralizar e otimizar o fluxo de agendamentos em clínicas e ambientes de saúde multi-setoriais. O sistema oferece uma interface altamente intuitiva (*scannable*) que simplifica a jornada de secretários, atendentes e gestores — desde o primeiro cadastro do paciente até a confirmação de presença na recepção e notificações diretas de retorno.

Projetado como um MVP para o **Núcleo da Pessoa Idosa (NPI)**, o CliniDesk unifica dados, automatiza tarefas manuais repetitivas e resolve problemas clássicos de sincronização de horários e gerenciamento de filas.

---

## 🚀 Funcionalidades Principais

- **📅 Agendamento Setorial Customizado** — Cadastro completo de pacientes com dados vitais (telefones do paciente e responsável), por setor: Geriatria, Fisioterapia, Assistência Social, Nutrição e Psicologia.
- **↩️ Agendamento Conjunto de Retorno** — Ao criar uma Consulta Normal, o Retorno pode ser pré-agendado no mesmo formulário.
- **💬 Integração e Avisos via WhatsApp** — Envio de mensagens formatadas ao paciente ou responsável com um clique, abrindo o WhatsApp Web já com a mensagem pronta.
- **🖨️ Impressão de Comprovantes** — Geração otimizada para impressoras térmicas ou jato de tinta, além de salvamento em PDF do bilhete de consulta.
- **✅ Confirmação de Presença (Check-in)** — Muda o status do agendamento para confirmar a chegada do paciente na clínica.
- **📆 Calendário em Padrão Nacional (pt-BR)** — Exibição e seleção de datas no padrão `DD/MM/YYYY`, independente do idioma do navegador.
- **🔍 Filtros Reativos Inteligentes** — Atualização instantânea ao filtrar por data (mini-calendário dinâmico) ou por clínica/setor.
- **🚨 Alertas Dinâmicos de Horário (Smart Color-Coding)** — A tabela calcula em tempo real o tempo restante para cada consulta:
  - 🟢 **Verde** — Consulta dentro do prazo de segurança.
  - 🟡 **Amarelo** — Atendimento dentro da próxima hora.
  - 🔴 **Vermelho** — Horário previsto já passou e o paciente não realizou check-in.
- **💾 Sincronização e Persistência Protegida** — Dados higienizados em tempo de execução, garantindo que agendamentos persistam sem erros após recarregamento.
- **🔐 Autenticação Segura via Cookies HttpOnly** — Token JWT armazenado em cookie seguro, inacessível via JavaScript, mitigando ataques XSS.

---

## 🧪 Testes de Software

### Testes Unitários — Vitest (Sprint 1)

Foram implementados **20 testes unitários** cobrindo funções puras: validators, formatters e calculators.

| # | Função | Descrição do Teste | Tipo |
|---|--------|--------------------|------|
| 01 | `isValidNome` | Aceita nome válido com letras e espaços | válido |
| 02 | `isValidNome` | Rejeita `null` sem crash | edge case |
| 03 | `isValidNome` | Rejeita nome com números (`Maria2`) | limite |
| 04 | `isValidTelefone` | Aceita celular com 11 dígitos `(81) 99999-9999` | válido |
| 05 | `isValidTelefone` | Rejeita telefone curto (`1234`) | limite |
| 06 | `isValidTelefone` | Rejeita `null` | edge case |
| 07 | `isValidDataConsulta` | Rejeita data no passado | limite |
| 08 | `isValidDataConsulta` | Rejeita formato ISO (`2025-12-25`) | edge case |
| 09 | `isValidDataConsulta` | Rejeita `null` | edge case |
| 10 | `isValidHorario` | Aceita horário dentro do expediente (`09:30`) | válido |
| 11 | `isValidHorario` | Rejeita `18:01` (após fechamento do NPI) | limite |
| 12 | `isValidHorario` | Rejeita `null` | edge case |
| 13 | `formatarData` | Retorna data no formato brasileiro | válido |
| 14 | `formatarData` | Lança `TypeError` para `null` | exception |
| 15 | `normalizarNome` | Capitaliza e remove espaços extras | válido |
| 16 | `normalizarNome` | Lança `TypeError` para `null` | exception |
| 17 | `diasParaConsulta` | Lança `TypeError` para `null` | exception |
| 18 | `isHorarioDisponivel` | Retorna `false` para horário ocupado | limite |
| 19 | `isHorarioDisponivel` | Retorna `true` para horário livre | válido |
| 20 | `isHorarioDisponivel` | Lança `TypeError` se lista for `null` | exception |

### Testes de Integração (Backend)
Cobrem middlewares de validação e autenticação: cookies `HttpOnly`, controle de acesso, CRUD completo de consultas e envio de lembretes.

### Testes de Componentes (Frontend)
Validam utilitários, fluxo de autenticação, carregamento/filtragem de consultas e modais de agendamento com API simulada.

> ⚠️ Os testes E2E com Playwright não foram concluídos neste sprint por necessidade de refatorações estruturais mais amplas (padronização ESM/CommonJS). Os testes unitários e de integração do backend foram implementados e executados com sucesso.

Relatório completo: [`/docs/relatorio_testes_npi.pdf`](./docs/relatorio_testes_npi.pdf)

---

## 🛠️ Tecnologias e Linguagens

| Camada | Tecnologia | Função |
|--------|-----------|--------|
| **Frontend** | React.js v18+ + Vite | SPA com HMR — pasta `/Front`, porta `5173` |
| **Backend** | Node.js + Express | API REST — pasta `/backend`, porta `5000` |
| **Banco de Dados** | MongoDB Atlas | NoSQL flexível, hospedado na nuvem |
| **Infraestrutura** | Docker + Docker Compose | Orquestração de containers |
| **Autenticação** | JWT + Cookies HttpOnly | Sessão segura e stateless |

---

## 📦 Bibliotecas e Frameworks

**Frontend:**
- `react-datepicker` — Seletor de datas em `pt-BR`
- `date-fns` — Cálculos dinâmicos de datas (`differenceInMinutes`)
- `lucide-react` — Ícones vetoriais leves e modernos
- `axios` — Requisições HTTP ao backend
- `tailwindcss` / Custom CSS — Interface responsiva e moderna

**Backend:**
- `express` — Framework web para API REST
- `mongoose` — ODM para MongoDB
- `jsonwebtoken` — Geração e verificação de tokens JWT
- `cookie-parser` — Leitura e escrita de cookies `HttpOnly`
- `bcryptjs` — Hash seguro de senhas
- `express-rate-limit` — Proteção brute-force no login (5 tentativas / 15 min)
- `dotenv` — Gerenciamento de variáveis de ambiente
- `cors` — Controle de origem cross-domain

**Testes:**
- `vitest` — Framework de testes unitários (backend)

---

## ⚙️ Pré-requisitos e Instalação

### Requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [Docker](https://www.docker.com/) e Docker Compose
- [Git](https://git-scm.com/)

### Clonar o Repositório

```bash
git clone https://github.com/emfs2-byte/D.S-Project.git
cd D.S-Project
```

### Instalação via Docker (Recomendado)

```bash
docker-compose up --build
```

O Docker sobe automaticamente:
- Frontend em `http://localhost:5173`
- Backend em `http://localhost:5000`

### Instalação Manual

**Backend:**
```bash
cd backend
cp .env.example .env      # Configure as variáveis de ambiente
npm install
node src/server.js
```

**Frontend:**
```bash
cd Front
npm install
npm run dev
```

---

## 🔧 Variáveis de Ambiente

Crie `./backend/.env` baseado no `.env.example`:

```env
MONGO_URI=mongodb+srv://<usuario>:<senha>@cluster.mongodb.net/clinidesk
JWT_SECRET=sua_chave_secreta_aqui
PORT=5000
```

O frontend recebe apenas:
```env
VITE_API_URL=http://localhost:5000
```

> ⚠️ Nunca suba o `.env` para o repositório. Ele já está no `.gitignore`.

---

## 📖 Instruções de Uso

1. Acesse `http://localhost:5173` no navegador.
2. Faça login com as iniciais do usuário (ex: `erlon`) e a senha.
3. No **Dashboard**, visualize os agendamentos do dia com alertas de cor em tempo real.
4. Clique em **"Novo Agendamento"** para cadastrar uma consulta ou retorno.
5. Use o ícone do WhatsApp para enviar o lembrete ao paciente com um clique.
6. Clique em **"Check-in"** ao confirmar a chegada do paciente na recepção.
7. Use os filtros de data e setor para navegar entre os agendamentos.

---

## 📂 Estrutura do Projeto

```
D.S-Project/
├── Front/                        # Frontend React (porta 5173)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Index.jsx           # Painel principal com tabela e filtros
│   │   │   ├── ModalNovoAgendamento.jsx # Formulário de agendamento
│   │   │   └── ...
│   │   └── App.jsx
│   └── vite.config.js
│
├── backend/                      # API REST Node.js (porta 5000)
│   ├── src/
│   │   ├── controllers/          # Lógica de negócio
│   │   ├── models/               # Schemas Mongoose
│   │   ├── routes/               # Definição de rotas
│   │   ├── middlewares/          # Auth, validação, rate limit
│   │   └── utils/
│   │       ├── validators.js     # Funções de validação puras
│   │       ├── formatters.js     # Funções de formatação
│   │       ├── calculators.js    # Regras de negócio puras
│   │       └── __tests__/        # Suite de testes (Vitest)
│   ├── .env.example
│   └── server.js
│
├── docs/                         # Documentação técnica
│   ├── ADR.pdf
│   ├── C4.pdf
│   ├── relatorio_testes_npi.pdf
│   └── relatorio_code_smells.pdf
│
├── docker-compose.yml
└── README.md
```

---

## 🔌 Rotas Principais da API

### Autenticação

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/auth/login` | Login — retorna cookie `HttpOnly` com JWT |
| `POST` | `/api/auth/logout` | Logout e invalidação da sessão |
| `POST` | `/api/auth/register` | Cadastro de novo usuário (admin) |

### Consultas

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/pacientes/consultas` | Lista todas as consultas |
| `POST` | `/api/pacientes/consultas` | Cria nova consulta |
| `PUT` | `/api/pacientes/consultas/:id` | Atualiza dados da consulta |
| `DELETE` | `/api/pacientes/consultas/:id` | Cancela/remove consulta |
| `PATCH` | `/api/pacientes/consultas/:id/lembrete` | Registra envio de lembrete |

### Retornos

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/pacientes/consultas/retornos` | Lista todos os retornos |
| `DELETE` | `/api/pacientes/consultas/retornos/:id` | Remove retorno |

---

## 📐 Arquitetura — ADRs

| ADR | Decisão | Status |
|-----|---------|--------|
| **ADR 001** | Monolito Modular (vs. Microserviços) | ✅ Aceito |
| **ADR 002** | MongoDB como banco principal (schema flexível) | ✅ Aceito |
| **ADR 003** | JWT com login por username (agilidade na recepção) | ✅ Aceito |
| **ADR 004** | Variáveis de ambiente via `.env` (DevSecOps) | ✅ Aceito |
| **ADR 005** | Migração do token JWT para Cookies `HttpOnly` (mitigação XSS) | ✅ Aceito |

Diagrama C4 completo: [`/docs/C4.pdf`](./docs/C4.pdf) | ADRs detalhadas: [`/docs/ADR.pdf`](./docs/ADR.pdf)

---

## 📄 Documentação

| Documento | Descrição |
|-----------|-----------|
| [`docs/ADR.pdf`](./docs/ADR.pdf) | Architecture Decision Records |
| [`docs/C4.pdf`](./docs/C4.pdf) | Diagrama C4 — Contexto e Containers |
| [`docs/relatorio_testes_npi.pdf`](./docs/relatorio_testes_npi.pdf) | Relatório de Testes Unitários (Sprint 1) |
| [`docs/relatorio_code_smells.pdf`](./docs/relatorio_code_smells.pdf) | Code Smells e Refatorações |

**Documentações Externas:**
- [React.js](https://react.dev/) · [Node.js](https://nodejs.org/docs) · [MongoDB Atlas](https://www.mongodb.com/docs/atlas/) · [Docker Compose](https://docs.docker.com/compose/) · [Vitest](https://vitest.dev/)

---

## 🌿 Gitflow

```
main          ← produção estável
└── develop   ← integração de features
    ├── feature/nome-da-feature
    ├── fix/nome-do-bug
    └── hotfix/nome-do-hotfix
```

**Padrão de commits semânticos:**
```
feat: adiciona modal de retorno no agendamento
fix: corrige rota de cancelamento de retornos
refactor: extrai formatarDataBR para utils
test: adiciona testes para isValidTelefone
docs: atualiza README com rotas da API
chore: atualiza dependências do backend
```

PRs devem ter ao menos 1 revisor e testes passando antes do merge em `develop`.

---

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b feature/minha-feature`
3. Commit: `git commit -m 'feat: minha nova feature'`
4. Push: `git push origin feature/minha-feature`
5. Abra um Pull Request para `develop`

---

## 📜 Licença

Uso **educacional** — desenvolvido no contexto do NPI. Uso não comercial. Atribuição de créditos obrigatória.

---

## 👥 Contribuidores

Albert Santos - Desenvolvedor Full-Stack
Samuel Renan - Desenvolvedor Back-End e Administrador do banco de Dados
Erlon Matheus - Desenvolvedor Front-End e P.O
Vicente Morais - Desenvolvedor Backend e API
Hugo José - Desenvolvedor Frontend e UI/UX Designer
Luiz Miguel- Desenvolvedor Full-Stack / UI Engineer
Juan William - Desenvolvedor Frontend
Cleyton Cardoso - Desenvolvedor Backend

---

<div align="center">
  <sub>CliniDesk v1.0.0 — Sistema de Gestão Clínica · Acesso restrito a profissionais autorizados</sub>
</div>
