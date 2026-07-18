var dropdowns = document.getElementsByClassName("dropdown-content");
var i;

function desplegarMenu(btn) {
    var dropdown = btn.nextElementSibling;
    if (dropdown.classList.contains('show')) {
      dropdown.classList.remove('show');
    } else {
      // Cierra cualquier otro menú desplegable abierto
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
      // Abre el menú desplegable del botón clickeado
      dropdown.classList.toggle("show");
    }
  }

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}