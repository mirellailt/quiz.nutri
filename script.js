const tagnome = document.querySelector("#nome");
const tagemail = document.querySelector("#email");
const tagsenha = document.querySelector("#senha");
const btnCadasto = document.querySelector("#cadastro");

const tagloginemail = document.querySelector("#emaillogin");
const tagloginsenha = document.querySelector("#senhalogin");
const btnLogin = document.querySelector("#login");

const btnSair = document.querySelector("#desconectar");
const exibirnome = document.querySelector("#exibirusuario");

let cadastro = JSON.parse(localStorage.getItem("usuarios")) || [];
let usuarioLogado = JSON.parse(localStorage.getItem("usuariosLogado")) || null;

if (window.location.pathname.endsWith("index.html") && usuarioLogado) {
    window.location.href = "home.html";
}

if (window.location.pathname.endsWith("home.html") && !usuarioLogado) {
    window.location.href = "index.html";
}

if (window.location.pathname.endsWith("home.html")) {
    exibirnome.textContent = `Bem-vindo, ${usuarioLogado.nome}!`;

    btnSair.addEventListener("click", function () {
        localStorage.removeItem("usuariosLogado");
        usuarioLogado = null;
        window.location.href = "index.html";
    });
}

if (window.location.pathname.endsWith("index.html")) {
    btnCadasto.addEventListener("click", function () {
        const nome = tagnome.value;
        const email = tagemail.value;
        const senha = tagsenha.value;

        if (!nome || !email || !senha) {
            alert("Preencha todos os campos!");
            return;
        }

        const usuario = { nome: nome, email: email, senha: senha };

        cadastro.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(cadastro));

        alert("Usuário cadastrado com sucesso!");
        
        tagnome.value = "";
        tagemail.value = "";
        tagsenha.value = "";
    });

    btnLogin.addEventListener("click", function () {
        const emaillogin = tagloginemail.value;
        const senhalogin = tagloginsenha.value;

        const existe = cadastro.find(function (usuario) {
            return usuario.email === emaillogin && usuario.senha === senhalogin;
        });

        if (existe) {
            const logado = { nome: existe.nome, email: existe.email };
            localStorage.setItem("usuariosLogado", JSON.stringify(logado));
            window.location.href = "home.html";
            alert("Você fez login com sucesso!");
        } else {
            alert("Usuário não encontrado.");
        }

        tagloginemail.value = "";
        tagloginsenha.value = "";
    });
}