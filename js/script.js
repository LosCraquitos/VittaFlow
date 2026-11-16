// Abre e fecha o menu no celular
const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu-centro");

if (btnMenu && menu) {
  btnMenu.addEventListener("click", function () {
    var aberto = menu.classList.toggle("aberto");
    btnMenu.classList.toggle("aberto", aberto);
    btnMenu.setAttribute("aria-expanded", aberto ? "true" : "false");
    btnMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("aberto");
      btnMenu.classList.remove("aberto");
      btnMenu.setAttribute("aria-expanded", "false");
      btnMenu.setAttribute("aria-label", "Abrir menu");
    });
  });
}
