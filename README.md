# Realizzati Móveis — Design System & Brand Book

Repositório oficial de documentação de marca, design system e identidade visual da **Realizzati Móveis**.

## 🌐 Deployment

Este repositório é destinado ao subdomínio:

```
https://brand.realizzatimoveis.com.br
```

O build é servido a partir da pasta `brand-book/` (HTML/CSS/JS estático, zero dependências de framework).

---

## 📁 Estrutura

```
realizzati-design-system/
├── brand-book/          ← Brand Book interativo (deploy → brand.realizzatimoveis.com.br)
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── package.json
│
├── tokens/              ← Design Tokens (Style Dictionary)
│   └── tokens/
│       ├── colors.json
│       ├── typography.json
│       └── components.json
│
├── docs/                ← Documentação Starlight (legado — substituído pelo brand-book)
│
└── 03 - Identidade Visual/   ← Assets de identidade visual (logos, fontes)
```

---

## 🚀 Rodar localmente

```bash
cd brand-book
npm run dev
# Abre em http://localhost:4500
```

---

## 📋 Conteúdo do Brand Book

- **Posicionamento & Perfis de Cliente** — Estratégia de marca para projetos de R$ 15k–R$ 200k+
- **Tom de Voz & Copywriting** — Dicionário VOC, copy por segmento, resolução de objeções
- **Paleta de Cores** — 5 tokens cromáticos com hex, HSL, notas de uso e Don'ts
- **Tipografia** — Playfair Display (display) + Inter (body)
- **Design System** — Tokens CSS, Double-Bezel, botões com micro-movimento
- **Diretrizes de Agente IA** — Regras para agentes que operam neste workspace

---

## 🔗 Repositórios relacionados

| Projeto | Repositório | URL |
|---|---|---|
| Site / Lead Capture | `seafeetstarken/real-lead-capture` | `realizzatimoveis.com.br` |
| Brand Book (este) | `seafeetstarken/realizzati-design-system` | `brand.realizzatimoveis.com.br` |

---

*Uso interno — Confidencial — Realizzati Móveis*
