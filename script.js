"use strict";

/* =========================
   CONFIGURAÇÕES
========================= */

// Número comercial que aparece nos prints.
// Formato: código do país + DDD + número, somente dígitos.
const WHATSAPP = "5547974003572";

const MENSAGEM_PADRAO =
  "Olá! Gostaria de solicitar uma proposta de palestra ou treinamento online para minha empresa.";

const paginaAtual = document.body.dataset.pagina;

const parametros = new URLSearchParams(window.location.search);
const temaSelecionado = parametros.get("tema");

/* =========================
   TREINAMENTOS
========================= */

const treinamentos = [
  {
    id: "lideranca",
    numero: "01",
    nome: "Liderança",
    titulo: "Líderes que desenvolvem pessoas.",
    descricao:
      "Comunicação, direcionamento e gestão de equipes para os desafios do dia a dia.",
    topicos: [
      "Comunicação e escuta",
      "Feedback e desenvolvimento",
      "Delegação e acompanhamento",
      "Gestão de conflitos",
    ],
  },

  {
    id: "atendimento",
    numero: "02",
    nome: "Atendimento ao público",
    titulo: "Boas experiências começam nas pessoas.",
    descricao:
      "Um olhar prático para a comunicação com o público e a qualidade de cada atendimento.",
    topicos: [
      "Escuta e compreensão das necessidades",
      "Clareza na comunicação",
      "Condução de situações difíceis",
      "Qualidade na experiência do cliente",
    ],
  },

  {
    id: "gestao-rh",
    numero: "03",
    nome: "Gestão de RH",
    titulo: "Pessoas no centro da gestão.",
    descricao:
      "Temas essenciais para aproximar a gestão de pessoas das necessidades do negócio.",
    topicos: [
      "Cultura e ambiente de trabalho",
      "Integração de pessoas",
      "Desenvolvimento de equipes",
      "Comunicação interna",
    ],
  },

  {
    id: "vendas",
    numero: "04",
    nome: "Vendas",
    titulo: "Conversas que criam oportunidades.",
    descricao:
      "Relacionamento, escuta e uma abordagem comercial orientada às necessidades do cliente.",
    topicos: [
      "Entendimento das necessidades",
      "Apresentação de valor",
      "Objeções e negociação",
      "Relacionamento e acompanhamento",
    ],
  },
];

const treinamentoAtual = treinamentos.find(
  (treinamento) => treinamento.id === temaSelecionado,
);

/* =========================
   FAVICON
========================= */

const favicon = document.createElement("link");

favicon.rel = "icon";
favicon.type = "image/svg+xml";

favicon.href =
  "data:image/svg+xml," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <rect width="32" height="32" rx="7" fill="#111210"/>
      <path
        d="M7 8 L16 25 L25 8"
        fill="none"
        stroke="#c9aa70"
        stroke-width="3"
      />
    </svg>
  `);

document.head.appendChild(favicon);

/* =========================
   CABEÇALHO
========================= */

const linksMenu = [
  { id: "inicio", nome: "Início", url: "index.html" },
  { id: "empresa", nome: "A empresa", url: "empresa.html" },
  { id: "solucoes", nome: "Soluções", url: "solucoes.html" },
  {
    id: "treinamentos",
    nome: "Treinamentos",
    url: "treinamentos.html",
  },
];

function criarMarca() {
  return `
    <a class="brand" href="index.html" aria-label="Vértice, início">
      <span class="mark" aria-hidden="true">V</span>

      <span>
        VÉRTICE
        <small>PALESTRAS & TREINAMENTOS</small>
      </span>
    </a>
  `;
}

const cabecalho = document.querySelector("#cabecalho");

if (cabecalho) {
  const links = linksMenu
    .map((link) => {
      const ativo = paginaAtual === link.id ? 'aria-current="page"' : "";

      return `
        <a href="${link.url}" ${ativo}>
          ${link.nome}
        </a>
      `;
    })
    .join("");

  cabecalho.innerHTML = `
    <div class="concept">
      PRÉVIA CONCEITUAL
      <span>Nome e conteúdo sujeitos à aprovação</span>
    </div>

    <header class="site-header">
      ${criarMarca()}

      <button
        class="menu"
        type="button"
        aria-label="Abrir menu"
        aria-expanded="false"
        aria-controls="menu-principal"
      >
        Menu
        <span aria-hidden="true">☰</span>
      </button>

      <nav
        id="menu-principal"
        class="site-nav"
        aria-label="Navegação principal"
      >
        ${links}

        <a
          class="nav-cta"
          href="contato.html"
          ${paginaAtual === "contato" ? 'aria-current="page"' : ""}
        >
          Vamos conversar
          <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  `;
}

/* =========================
   MENU MOBILE
========================= */

const botaoMenu = document.querySelector(".menu");
const menuPrincipal = document.querySelector(".site-nav");

function fecharMenu(devolverFoco = false) {
  if (!botaoMenu || !menuPrincipal) return;

  botaoMenu.setAttribute("aria-expanded", "false");
  botaoMenu.setAttribute("aria-label", "Abrir menu");

  menuPrincipal.classList.remove("open");

  if (devolverFoco) {
    botaoMenu.focus();
  }
}

if (botaoMenu && menuPrincipal) {
  botaoMenu.addEventListener("click", () => {
    const estaAberto = botaoMenu.getAttribute("aria-expanded") === "true";

    botaoMenu.setAttribute("aria-expanded", String(!estaAberto));

    botaoMenu.setAttribute(
      "aria-label",
      estaAberto ? "Abrir menu" : "Fechar menu",
    );

    menuPrincipal.classList.toggle("open", !estaAberto);
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && menuPrincipal.classList.contains("open")) {
      fecharMenu(true);
    }
  });

  menuPrincipal.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => fecharMenu());
  });

  const larguraDesktop = window.matchMedia("(min-width: 901px)");

  larguraDesktop.addEventListener("change", (evento) => {
    if (evento.matches) {
      fecharMenu();
    }
  });
}

/* =========================
   CARDS DOS TREINAMENTOS
========================= */

function criarCard(treinamento) {
  return `
    <a
      class="training-card"
      href="treinamento.html?tema=${treinamento.id}"
    >
      <span class="number">${treinamento.numero}</span>

      <h3>${treinamento.nome}</h3>

      <p>${treinamento.descricao}</p>

      <span class="card-link">
        Explorar treinamento
        <span aria-hidden="true">↗</span>
      </span>
    </a>
  `;
}

document.querySelectorAll("[data-lista-treinamentos]").forEach((lista) => {
  lista.innerHTML = treinamentos.map(criarCard).join("");
});

/* =========================
   DETALHES DO TREINAMENTO
========================= */

const detalhe = document.querySelector("#detalhe-treinamento");

if (detalhe) {
  if (!treinamentoAtual) {
    detalhe.innerHTML = `
      <section class="page-intro">
        <span class="eyebrow">Treinamentos</span>

        <h1>Qual tema faz sentido para <em>sua equipe?</em></h1>

        <p>
          Escolha um treinamento para conhecer as possibilidades
          de conteúdo.
        </p>

        <a class="button gold" href="treinamentos.html">
          Ver os treinamentos
          <span aria-hidden="true">→</span>
        </a>
      </section>
    `;
  } else {
    document.title = `${treinamentoAtual.nome} | Vértice`;

    const descricaoPagina = document.querySelector('meta[name="description"]');

    if (descricaoPagina) {
      descricaoPagina.content = treinamentoAtual.descricao;
    }

    const topicos = treinamentoAtual.topicos
      .map((topico, indice) => {
        const numero = String(indice + 1).padStart(2, "0");

        return `
          <li>
            <span>${numero}</span>
            <h3>${topico}</h3>
          </li>
        `;
      })
      .join("");

    detalhe.innerHTML = `
      <section class="page-intro detail">
        <a class="back" href="treinamentos.html">
          ← Todos os treinamentos
        </a>

        <span class="eyebrow">
          ${treinamentoAtual.numero} / ${treinamentoAtual.nome}
        </span>

        <h1>${treinamentoAtual.titulo}</h1>

        <p>${treinamentoAtual.descricao}</p>

        <a
          class="button gold"
          href="contato.html?tema=${treinamentoAtual.id}"
        >
          Conversar sobre este tema
          <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section class="section syllabus">
        <div>
          <span class="eyebrow">Possibilidades de conteúdo</span>

          <h2>
            O que podemos<br>
            desenvolver.
          </h2>

          <p>
            Uma proposta de temas para orientar a conversa
            sobre o treinamento.
          </p>
        </div>

        <ol>${topicos}</ol>
      </section>
    `;
  }
}

/* =========================
   CHAMADA FINAL
========================= */

document.querySelectorAll("[data-cta]").forEach((elemento) => {
  elemento.innerHTML = `
    <section class="cta">
      <div>
        <span class="eyebrow">O próximo passo</span>

        <h2>
          O desenvolvimento da sua<br>
          equipe começa com uma conversa.
        </h2>
      </div>

      <a class="button gold" href="contato.html">
        Conversar sobre um treinamento
        <span aria-hidden="true">↗</span>
      </a>
    </section>
  `;
});

/* =========================
   CONTATO E WHATSAPP
========================= */

function criarLinkWhatsApp(mensagem = MENSAGEM_PADRAO) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
}

const textoTema = document.querySelector("#tema-selecionado");
const botaoContato = document.querySelector("#whatsapp-contato");

if (textoTema && treinamentoAtual) {
  textoTema.textContent =
    `Seu tema de interesse: ${treinamentoAtual.nome}. ` +
    "Conte o perfil da equipe, a quantidade estimada de participantes " +
    "e o que sua empresa gostaria de desenvolver.";
}

if (botaoContato && treinamentoAtual) {
  botaoContato.dataset.whatsapp =
    `Olá! Gostaria de solicitar uma proposta de treinamento online ` +
    `sobre ${treinamentoAtual.nome} para minha empresa.`;
}

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  const mensagem = link.dataset.whatsapp || MENSAGEM_PADRAO;

  link.href = criarLinkWhatsApp(mensagem);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

/* =========================
   RODAPÉ
========================= */

const rodape = document.querySelector("#rodape");

if (rodape) {
  rodape.innerHTML = `
    <footer class="site-footer">
      <div class="footer-top">
        ${criarMarca()}

        <p>
          Conhecimento que inspira.<br>
          Pessoas que transformam.
        </p>

        <nav class="footer-links" aria-label="Links do rodapé">
          <a href="empresa.html">A empresa</a>
          <a href="solucoes.html">Soluções</a>
          <a href="treinamentos.html">Treinamentos</a>
          <a href="contato.html">Contato</a>
        </nav>
      </div>

      <div class="footer-bottom">
        <span>Vértice · Nome provisório para apresentação</span>
        <span>Proposta de site por Gabriell Fonseca</span>
      </div>
    </footer>
  `;
}
