const loginForm = document.getElementById("loginForm");
const senha = document.getElementById("senha");
const mostrarSenha = document.getElementById("mostrarSenha");
const mensagem = document.getElementById("mensagem");


// Mostrar / esconder senha
mostrarSenha.addEventListener("click", function () {

    if (senha.type === "password") {

        senha.type = "text";
        mostrarSenha.textContent = "◉";

    } else {

        senha.type = "password";
        mostrarSenha.textContent = "👁";

    }

});


// Envio do formulário
loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senhaValor = senha.value.trim();


    // Verificar campos vazios
    if (email === "" || senhaValor === "") {

        mensagem.textContent = "Preencha todos os campos.";
        mensagem.style.color = "red";

        return;
    }


    // Autenticar no Supabase
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: senhaValor
    });


    // Verificar erro
    if (error) {

        mensagem.textContent = "E-mail ou senha incorretos.";
        mensagem.style.color = "red";

        return;
    }


    // Login realizado
    mensagem.textContent = "Login realizado!";
    mensagem.style.color = "green";

    window.location.href = "inicio.html";

});