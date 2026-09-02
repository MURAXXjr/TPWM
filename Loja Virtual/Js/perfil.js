const carregando = document.getElementById("carregando");
const perfilBox = document.getElementById("perfil-box");
const naoLogado = document.getElementById("nao-logado");
const erroPerfil = document.getElementById("erro-perfil");
const btnLogout = document.getElementById("btnLogout");


function esconderTudo() {

    if (carregando) carregando.style.display = "none";
    if (perfilBox) perfilBox.style.display = "none";
    if (naoLogado) naoLogado.style.display = "none";
    if (erroPerfil) erroPerfil.style.display = "none";

}

function exibirErro(msg) {

    console.error("Erro na tela de perfil:", msg);

    esconderTudo();

    if (erroPerfil) {

        erroPerfil.style.display = "flex";

        const msgEl = document.getElementById("erro-mensagem");
        if (msgEl && msg) msgEl.textContent = msg;

    }

}

function exibirNaoLogado() {

    esconderTudo();
    if (naoLogado) naoLogado.style.display = "flex";

}

// Preenche a tela com os dados do usuário logado
function exibirPerfil(usuario) {

    esconderTudo();

    const email = usuario.email || "";
    const inicial = email.charAt(0).toUpperCase();

    const elInicial = document.getElementById("perfil-inicial");
    const elEmail = document.getElementById("perfil-email");
    const elData = document.getElementById("perfil-data");

    if (elInicial) elInicial.textContent = inicial || "?";
    if (elEmail) elEmail.textContent = email;

    if (elData && usuario.created_at) {

        const dataCriacao = new Date(usuario.created_at);

        elData.textContent = dataCriacao.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

    }

    if (perfilBox) perfilBox.style.display = "flex";

}
// Verificação da sessão

async function verificarUsuario() {

    try {

        // Confere se o cliente Supabase foi carregado corretamente
        if (typeof supabaseClient === "undefined" || !supabaseClient) {

            exibirErro(
                "Não foi possível conectar ao Supabase. Verifique se os arquivos " +
                "supabase-js e supabase.js foram carregados antes deste script."
            );

            return;

        }

        const { data, error } = await supabaseClient.auth.getSession();

        if (error) {

            exibirErro("Erro ao verificar sessão: " + error.message);
            return;

        }

        if (!data || !data.session) {

            exibirNaoLogado();
            return;

        }

        exibirPerfil(data.session.user);

    } catch (err) {

        exibirErro("Erro inesperado: " + err.message);

    }

}

if (btnLogout) {

    btnLogout.addEventListener("click", async function () {

        try {

            await supabaseClient.auth.signOut();

        } catch (err) {

            console.error("Erro ao sair:", err);

        }

        window.location.href = "login.html";

    });

}

//Mantém a tela atualizada caso o estado de login mude em outra aba
if (typeof supabaseClient !== "undefined" && supabaseClient) {

    supabaseClient.auth.onAuthStateChange((event) => {

        if (event === "SIGNED_OUT") {
            exibirNaoLogado();
        }

    });

}

// Segurança: se em 6 segundos nada resolveu, mostra erro em vez de travar
const timeoutSeguranca = setTimeout(() => {

    if (carregando && carregando.style.display !== "none") {

        exibirErro(
            "A verificação demorou demais. Confira sua internet e as chaves do Supabase."
        );

    }

}, 6000);


verificarUsuario().finally(() => clearTimeout(timeoutSeguranca));