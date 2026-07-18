
window.onload = function () {
  var inputPassword = document.querySelector('.pass-key');
  var showPasswordButton = document.querySelector('.show');

  showPasswordButton.addEventListener('click', function () {
      if (inputPassword.type === "password") {
          inputPassword.type = "text";
          showPasswordButton.textContent = "Ocultar";
      } else {
          inputPassword.type = "password";
          showPasswordButton.textContent = "Mostrar";
      }
  });
}