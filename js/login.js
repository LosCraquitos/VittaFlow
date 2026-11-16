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
