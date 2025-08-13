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
// Bloquea copiado fuera de <code>
document.addEventListener("copy", function (event) {
  let selection = window.getSelection().toString();
  let parent = window.getSelection().anchorNode?.parentElement;

  if (!parent || parent.tagName.toLowerCase() !== "code") {
    event.preventDefault(); // Solo bloquea, no muestra mensajes
  }
});

