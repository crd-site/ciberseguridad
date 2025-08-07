// Carga dinámica de encabezado y pie de página
function includeHTML() {
  document.querySelectorAll('[data-include]').forEach(el => {
    const file = `includes/${el.getAttribute('data-include')}.html`;
    fetch(file)
      .then(res => res.ok ? res.text() : "Contenido no encontrado.")
      .then(data => el.innerHTML = data);
  });
}
document.addEventListener("DOMContentLoaded", includeHTML);
