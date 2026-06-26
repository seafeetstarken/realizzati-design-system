---
title: Memória do Agente - Realizzati Móveis
description: Diretrizes de comportamento, engenharia, tom de voz e arquitetura do workspace para o agente da Realizzati.
---

> **DIRETRIZ DE ORQUESTRAÇÃO:** Antes de planejar qualquer arquitetura, gerar código, ou rodar automações, é OBRIGATÓRIO consultar o arquivo `internal-tools/SKILLS_MANIFEST.md`. Identifique e carregue as skills ou sub-agentes adequados para o contexto antes de tomar qualquer ação operacional.
>
> **REGRA DE ROTEAMENTO (LLM ROUTING):** Ao acionar um sub-agente ou skill, você deve ajustar internamente o seu modelo de processamento para corresponder estritamente ao "Perfil Cognitivo" exigido no SKILLS_MANIFEST.md para aquela tarefa. Nunca use modelos de alta criatividade (High) para escrever código-fonte.

## 🛠️ Diretrizes Comportamentais e de Engenharia

### 1. DIRETRIZ DE WORKFLOW E SEGURANÇA (GIT)
* **Regra Absoluta:** É estritamente proibido realizar `git push` para repositórios remotos sem autorização explícita do desenvolvedor humano.
* **Procedimento Padrão:** Todo código gerado deve resultar em testes locais e, no máximo, um `git commit` semântico local. A revisão e o envio para a nuvem são de responsabilidade do desenvolvedor humano.

### 2. PADRÕES DE ENGENHARIA FRONTEND
* **Mobile-First:** Todo componente Tailwind CSS deve ser desenhado para telas pequenas primeiro (default), utilizando prefixos responsivos (`md:`, `lg:`, etc.) para telas maiores.
* **Acessibilidade (a11y) e Tipagem:** O código deve ser rigorosamente tipado com TypeScript. Utilize tags HTML5 semânticas (`<nav>`, `<section>`, `<main>`, etc.) e atributos `aria-*` para acessibilidade.
* **Modularidade:** Componentes complexos devem ser quebrados em partes menores e testados individualmente (ex: Storybook) antes de serem integrados à página principal.

### 3. TOM DE VOZ E UX WRITING (A MARCA)
* **Persona da Marca:** Exclusiva, sofisticada, precisa e confiável (adequada ao nicho de móveis planejados sob medida de alto padrão).
* **Regra de Escrita:** Sempre que precisar gerar placeholders ou textos, utilize vocabulário de alto padrão (ex: "Projetos Exclusivos" em vez de "Nossos Trabalhos"; "Agende sua Consultoria" em vez de "Fale com a gente").

Este arquivo serve como memória fixa e persistente para os agentes de IA que trabalham neste repositório.

## 📁 Arquitetura do Workspace & Responsabilidades

* **Decisões de UI & Design System:** Residem na pasta `realizzati-design-system/`.
* **Scripts de Tráfego & Google/Meta Ads:** Residem na pasta `core/marketing-automations/`.
* **Frontend Lead Capture (App React):** Reside na pasta `real-lead-capture/`.
* **Ferramental Interno & Skills da IA:** Residem na pasta `internal-tools/`.

## 📁 Repositório de Skills Local
* **Status:** O repositório completo de habilidades **já está clonado localmente**.
* **Caminho:** `internal-tools/skills/` (dentro da pasta de ferramentas utilitárias).
* **Uso:** Não faça download ou clonagem remota das skills. Acesse os arquivos de diretrizes diretamente através da pasta local.

## 🔌 Configurações de Rede & Servidor
* **Vite Dev Server:** Rodando localmente na porta `8080` (configuração do host em `0.0.0.0` para permitir acesso de rede).
* **Túnel de Acesso Externo:** Mapeado no `package.json` sob o script `npm run tunnel` (utiliza `localhost.run` direcionado para `127.0.0.1:8080`, livre de verificação de IP).

## 📝 Diário de Bordo & Próximos Passos (Última Atualização: 2026-06-25)

### O que foi feito hoje:
1. **Pivot do Brand Book V2 para Tema Claro (Soft Cream):**
   - Transicionamos o layout do design system de Pure Dark para Soft Cream (`#FAF8F5`) por padrão.
   - Preservamos a Sidebar lateral (Dark Espresso) e a seção Hero (madeira escura nobre) para manter o visual premium de alto padrão.
2. **Correção Cirúrgica de Contraste e Legibilidade (style.css):**
   - Adicionamos blocos de sobrescrita específicos focados nas seções de conteúdo (`.content-section`).
   - Todos os cards (Posicionamento Estratégico, Perfis de Cliente, Pilares, Copy por Segmento, Objeções, Benchmark Competitivo, Templates Sociais, Iconografia, etc.) agora possuem fundo branco puro (`#FFFFFF`) e tipografia escura (`var(--theme-text-muted)` ou `#352520`), eliminando o bug de texto creme em fundo claro.
3. **Migração para Logos em Vetor (SVG) com Fundo Transparente:**
   - Copiamos as novas logos SVG (`01.svg` a `06.svg`, `perfil.svg`, `perfl 02.svg`) para `assets/logos/`.
   - Mapeamos as logos corretas no HTML de acordo com a cor do card (ex: `03.svg` com tipografia escura para fundo claro; `01.svg` e `04.svg` com tipografia branca para fundo escuro).
   - Escrevemos e executamos o script utilitário (`scratch/remove-bg.js`) para decompor as logos vetorizadas e remover cirurgicamente os subcaminhos de fundo branco gerados no autotrace, resultando em logos perfeitamente transparentes.
4. **Refinamento de Copy (Design System):**
   - Limpamos todas as menções à oferta de "projeto renderizado em 3D" na persona "O Esteta/Arquiteto" conforme diretriz de marca de não usar esse gatilho.

### Próximos Passos:
1. **Validação do Visual com o Cliente:** Apresentar a interface final e responsiva das logos e do manual de marca em `http://127.0.0.1:8081`.
2. **Campanhas Google Ads/Meta Ads:** Retomar os scripts de automação ou auditoria de campanhas conforme necessidade, usando as novas diretrizes refinadas de linguagem.
