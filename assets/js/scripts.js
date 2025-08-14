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


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-reportar");
  const mensaje = document.getElementById("mensaje-envio");

  // Asignar valores automáticos
  document.getElementById("titulo").value = document.title;
  document.getElementById("archivo").value = window.location.pathname.split("/").pop();
  document.getElementById("fecha").value = new Date().toISOString();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("https://script.google.com/macros/s/AKfycbw3T9w49wc3iPLRhbfUJmfvMuJWNlFkyY7nlzMTAlYXXr6dsAT3IbIljrEVj-rDWHk/exec", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.text())
      .then((text) => {
        if (text === "OK") {
          mensaje.textContent = "✅ Comentario enviado correctamente.";
          form.reset();
        } else {
          mensaje.textContent = "❌ Error en el envío.";
        }
      })
      .catch((err) => {
        mensaje.textContent = "❌ Error de red.";
        console.error(err);
      });
  });
});
