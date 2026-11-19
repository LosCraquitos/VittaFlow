const tabLogin = document.getElementById("tab-login");
const tabCadastro = document.getElementById("tab-cadastro");
const formLogin = document.getElementById("form-login");
const formCadastro = document.getElementById("form-cadastro");
const linkCadastro = document.getElementById("link-cadastro");
const linkLogin = document.getElementById("link-login");

function mostrarLogin() {
  tabLogin.classList.add("ativo");
  tabCadastro.classList.remove("ativo");
  tabLogin.setAttribute("aria-selected", "true");
  tabCadastro.setAttribute("aria-selected", "false");
  formLogin.classList.add("ativo");
  formCadastro.classList.remove("ativo");
}

function mostrarCadastro() {
  tabCadastro.classList.add("ativo");
  tabLogin.classList.remove("ativo");
  tabCadastro.setAttribute("aria-selected", "true");
  tabLogin.setAttribute("aria-selected", "false");
  formCadastro.classList.add("ativo");
  formLogin.classList.remove("ativo");
}

if (tabLogin && tabCadastro && formLogin && formCadastro) {
  tabLogin.addEventListener("click", mostrarLogin);
  tabCadastro.addEventListener("click", mostrarCadastro);

  if (linkCadastro) {
    linkCadastro.addEventListener("click", function (e) {
      e.preventDefault();
      mostrarCadastro();
    });
  }

  if (linkLogin) {
    linkLogin.addEventListener("click", function (e) {
      e.preventDefault();
      mostrarLogin();
    });
  }
}

// Verificação do login (sem backend: apenas simulamos)
if (formLogin) {
  formLogin.noValidate = true;

  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = formLogin.email.value.trim();
    const senha = formLogin.senha.value;

    if (!email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    alert("Login realizado com sucesso!");
    formLogin.reset();
  });
}

// Verificação do cadastro
if (formCadastro) {
  formCadastro.noValidate = true;

  formCadastro.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = formCadastro.nome.value.trim();
    const email = formCadastro.email.value.trim();
    const cpf = formCadastro.cpf.value.trim();
    const senha = formCadastro.senha.value;
    const confirmar = formCadastro.confirmar.value;

    if (!nome || !email || !cpf || !senha || !confirmar) {
      alert("Preencha todos os campos.");
      return;
    }

    if (nome.length < 3) {
      alert("Informe seu nome completo.");
      return;
    }

    if (cpf.replace(/\D/g, "").length !== 11) {
      alert("Informe um CPF válido.");
      return;
    }

    if (senha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmar) {
      alert("As senhas não conferem.");
      return;
    }

    alert("Conta criada com sucesso!");
    formCadastro.reset();
  });
}
