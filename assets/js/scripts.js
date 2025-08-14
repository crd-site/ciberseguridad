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



form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("titulo", document.title);
  formData.append("archivo", window.location.pathname.split("/").pop());
  formData.append("comentario", comentario.value);
  formData.append("fecha", new Date().toISOString());

  fetch("https://script.google.com/macros/s/AKfycbw3T9w49wc3iPLRhbfUJmfvMuJWNlFkyY7nlzMTAlYXXr6dsAT3IbIljrEVj-rDWHk/exec", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.text())
    .then((text) => {
      if (text === "OK") {
        mensaje.textContent = "✅ Comentario enviado correctamente.";
        comentario.value = "";
      } else {
        mensaje.textContent = "❌ Error al enviar. Intenta nuevamente.";
      }
    })
    .catch((err) => {
      mensaje.textContent = "❌ Error de red. Verifica tu conexión.";
      console.error(err);
    });
});

