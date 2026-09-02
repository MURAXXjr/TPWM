const cadastroForm = document.getElementById("cadastroForm");

const nome = document.getElementById("nome");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");

const mensagem = document.getElementById("mensagem");


// Mostrar e esconder as senhas
const botoesSenha = document.querySelectorAll(".mostrarSenha");

botoesSenha.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const campo = document.getElementById(
            botao.getAttribute("data-target")
        );

        if (campo.type === "password") {

            campo.type = "text";
            botao.textContent = "◉";

        } else {

            campo.type = "password";
            botao.textContent = "👁";

        }

    });

});


// Cadastro
cadastroForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const nomeValor = nome.value.trim();
    const email = document.getElementById("email").value.trim();

    const senhaValor = senha.value.trim();
    const confirmarSenhaValor = confirmarSenha.value.trim();


    // Verificar campos vazios
    if (
        nomeValor === "" ||
        email === "" ||
        senhaValor === "" ||
        confirmarSenhaValor === ""
    ) {

        mensagem.textContent = "Preencha todos os campos.";
        mensagem.style.color = "red";

        return;
    }


    // Verificar domínio do e-mail
    const emailValido = /^[^\s@]+@(gmail|hotmail|outlook)\.com$/i;

    if (!emailValido.test(email)) {

        mensagem.textContent =
            "Use um e-mail Gmail, Hotmail ou Outlook. Exemplo: seuemail@gmail.com";

        mensagem.style.color = "red";

        return;
    }


    // Verificar senhas
    if (senhaValor !== confirmarSenhaValor) {

        mensagem.textContent = "As senhas não coincidem.";
        mensagem.style.color = "red";

        return;
    }


    // Criar conta no Supabase Auth
    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: senhaValor
    });


    // Erro no Auth
    if (error) {

        console.error("Erro no cadastro:", error);

        if (error.message.includes("Password should be at least 6 characters")) {

            mensagem.textContent =
                "A senha deve ter pelo menos 6 caracteres.";

        } else if (error.message.includes("User already registered")) {

            mensagem.textContent =
                "Este e-mail já está cadastrado.";

        } else {

            mensagem.textContent =
                "Não foi possível criar a conta.";
        }

        mensagem.style.color = "red";

        return;
    }


    // Verificar usuário
    if (!data.user) {

        mensagem.textContent = "Não foi possível criar a conta.";
        mensagem.style.color = "red";

        return;
    }


    // ID do usuário criado pelo Auth
    const userId = data.user.id;

    console.log("Usuário criado no Auth:", userId);


    // Salvar usuário na tabela usuario
    const { error: erroUsuario } = await supabaseClient
        .from("usuario")
        .insert([
            {
                id: userId,
                nome: nomeValor
            }
        ]);


    // Erro ao salvar na tabela
    if (erroUsuario) {

        console.error(
            "ERRO AO INSERIR NA TABELA USUARIO:",
            erroUsuario
        );

        mensagem.textContent =
            "Conta criada, mas não foi possível salvar o nome.";

        mensagem.style.color = "red";

        return;
    }


    // Tudo certo
    console.log("Usuário salvo na tabela usuario!");

    mensagem.textContent =
        "Conta criada com sucesso!";

    mensagem.style.color = "green";

});