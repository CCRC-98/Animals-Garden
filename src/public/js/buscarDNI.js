// buscarDNI.js
function buscarDNI() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById('dniInput');
  filter = input.value.toUpperCase();
  table = document.getElementById("dniTable");
  tr = table.getElementsByTagName('tr');

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1]; // aqui sacamos unicamente el DNI del usuario o veterinario
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}