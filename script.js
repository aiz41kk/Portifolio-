const projetosIniciais = [
    {
        titulo: "Pagina de gerenciamento geral de entregas logisticas",
        categoria: "Logistic System Dashboard",
        descricao:
            "pgina dashboard com controle total de sistemas de rotas,remessas,veiculos,entregadores e clientes para empresa de logistica.",
        link: "https://logitrack.free.nf",
        cor: "#00d1ff"
    },
    {
        titulo: ".......",
        categoria: "...",
        descricao:
            ".....",
        link: "https://erptcc.xo.je",
        cor: "#95ff45"
    },
    {
        titulo: "........",
        categoria: "...",
        descricao:
            "............",
        link: "https://example.com/...",
        cor: "#ff8a1f"
    }
];

const projetos = [...projetosIniciais];

const elementos = {
    listaProjetos: document.getElementById("projetos-lista"),
    formProjeto: document.getElementById("form-projeto"),
    projetoStatus: document.getElementById("projeto-status"),
    formContato: document.getElementById("form-contato"),
    contatoStatus: document.getElementById("contato-status"),
    anoAtual: document.getElementById("ano-atual")
};

function obterIniciais(titulo) {
    return titulo
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((palavra) => palavra.charAt(0).toUpperCase())
        .join("");
}

function normalizarLink(link) {
    if (/^https?:\/\//i.test(link)) {
        return link;
    }

    return `https://${link}`;
}

function criarCardProjeto(projeto, indice) {
    const article = document.createElement("article");
    article.className = "project-card reveal is-visible";

    const preview = document.createElement("div");
    preview.className = "project-preview";
    preview.style.setProperty("--project-accent", projeto.cor);

    const category = document.createElement("span");
    category.className = "project-category";
    category.textContent = projeto.categoria;

    const initials = document.createElement("span");
    initials.className = "project-initials";
    initials.textContent = obterIniciais(projeto.titulo);

    preview.append(category, initials);

    const title = document.createElement("h3");
    title.textContent = projeto.titulo;

    const description = document.createElement("p");
    description.textContent = projeto.descricao;

    const actions = document.createElement("div");
    actions.className = "project-actions";

    const link = document.createElement("a");
    link.className = "project-link";
    link.href = projeto.link;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "Abrir projeto";

    const apagar = document.createElement("button");
    apagar.type = "button";
    apagar.className = "button button-secondary project-delete-button";
    apagar.textContent = "Apagar";
    apagar.addEventListener("click", () => removerProjeto(indice));

    actions.append(link, apagar);
    article.append(preview, title, description, actions);

    return article;
}

function removerProjeto(indice) {
    if (indice < 0 || indice >= projetos.length) {
        return;
    }

    projetos.splice(indice, 1);
    renderizarProjetos();
    atualizarStatus(elementos.projetoStatus, "Projeto removido do portfólio.");
}

function renderizarProjetos() {
    elementos.listaProjetos.innerHTML = "";

    projetos.forEach((projeto, indice) => {
        elementos.listaProjetos.appendChild(criarCardProjeto(projeto, indice));
    });
}

function atualizarStatus(elemento, mensagem) {
    elemento.textContent = mensagem;
}

function lidarComNovoProjeto(evento) {
    evento.preventDefault();

    const dados = new FormData(evento.currentTarget);
    const titulo = dados.get("titulo").trim();
    const categoria = dados.get("categoria").trim();
    const descricao = dados.get("descricao").trim();
    const link = normalizarLink(dados.get("link").trim());
    const cor = dados.get("cor");

    projetos.unshift({
        titulo,
        categoria,
        descricao,
        link,
        cor
    });

    renderizarProjetos();
    evento.currentTarget.reset();
    atualizarStatus(elementos.projetoStatus, "Projeto adicionado ao showcase frontend + gamedev.");
}

function lidarComContato(evento) {
    evento.preventDefault();

    const dados = new FormData(evento.currentTarget);
    const nome = dados.get("nome").trim();

    evento.currentTarget.reset();
    atualizarStatus(
        elementos.contatoStatus,
        `Briefing recebido. Valeu, ${nome}. Bora construir algo forte.`
    );
}

function ativarRevelacao() {
    const itens = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
        itens.forEach((item) => item.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("is-visible");
                    observer.unobserve(entrada.target);
                }
            });
        },
        {
            threshold: 0.18
        }
    );

    itens.forEach((item) => observer.observe(item));
}

elementos.formProjeto.addEventListener("submit", lidarComNovoProjeto);
elementos.formContato.addEventListener("submit", lidarComContato);
elementos.anoAtual.textContent = new Date().getFullYear();

renderizarProjetos();
ativarRevelacao();
