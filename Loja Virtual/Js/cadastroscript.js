const cadastroForm = document.getElementById("cadastroForm");

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


// Verificar cadastro
cadastroForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();

    const senhaValor = senha.value.trim();
    const confirmarSenhaValor = confirmarSenha.value.trim();


    // Verificar campos vazios
    if (
        email === "" ||
        senhaValor === "" ||
        confirmarSenhaValor === ""
    ) {

        mensagem.textContent = "Preencha todos os campos.";
        mensagem.style.color = "red";

        return;
    }


    // Verificar se as senhas são iguais
    if (senhaValor !== confirmarSenhaValor) {

        mensagem.textContent = "As senhas não coincidem.";
        mensagem.style.color = "red";

        return;
    }

    const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: senhaValor
    });

    if (error) {

    if (error.message.includes("Password should be at least 6 characters")) {
        mensagem.textContent = "A senha deve ter pelo menos 6 caracteres.";
    } else if (error.message.includes("User already registered")) {
        mensagem.textContent = "Este e-mail já está cadastrado.";
    } else {
        mensagem.textContent = "Não foi possível criar a conta.";
    }

    mensagem.style.color = "red";

    return;
}

    // Cadastro válido
    mensagem.textContent = "Conta criada com sucesso!";
    mensagem.style.color = "green";

});