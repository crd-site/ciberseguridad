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
  const comentario = document.getElementById("comentario");
  const mensaje = document.getElementById("mensaje-envio");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      titulo: document.title,
      archivo: window.location.pathname.split("/").pop(),
      comentario: comentario.value
    };

    fetch("https://script.google.com/macros/s/AKfycbyL3B4fo__7ao5MsfC59xP79ZOKMyAIbi-b1QKbuTjpoqDTXWaEqRkUk_EKZoPnuJc6/exec", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
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
});
