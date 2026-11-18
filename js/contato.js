const formContato = document.querySelector(".form-contato");

if (formContato) {
  // Desliga a validação nativa para usar as mensagens em alert
  formContato.noValidate = true;

  formContato.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const assunto = document.getElementById("assunto").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !email || !assunto || !mensagem) {
      alert("Preencha todos os campos.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Informe um e-mail válido.");
      return;
    }
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    formContato.reset();
  });
}
