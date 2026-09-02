

async function usuarioEstaLogado() {

    if (typeof supabaseClient === "undefined" || !supabaseClient) {
        console.error("Supabase client não encontrado. Verifique se supabase.js foi carregado antes deste script.");
        return false;
    }

    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
        console.error("Erro ao verificar sessão:", error.message);
        return false;
    }

    return !!(data && data.session);

}

// Recebe uma função (ação) que só deve rodar se o usuário estiver logado.
// Se não estiver logado, avisa e redireciona para o login.
async function protegerAcaoCarrinho(acao) {

    const logado = await usuarioEstaLogado();

    if (!logado) {
        alert("Você precisa estar logado para adicionar produtos ao carrinho.");
        window.location.href = "login.html";
        return;
    }

    acao();

}