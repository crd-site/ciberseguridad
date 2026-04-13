
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
  const cajaTexto = document.getElementById("comentario"); // Referencia directa al cuadro de texto

  // Función para rellenar campos automáticos
  const rellenar = () => {
    if (document.getElementById("titulo")) document.getElementById("titulo").value = document.title;
    if (document.getElementById("archivo")) document.getElementById("archivo").value = window.location.pathname.split("/").pop();
    if (document.getElementById("fecha")) document.getElementById("fecha").value = new Date().toISOString();
  };

  rellenar();

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const scriptURL = "https://script.google.com/macros/s/AKfycbw3T9w49wc3iPLRhbfUJmfvMuJWNlFkyY7nlzMTAlYXXr6dsAT3IbIljrEVj-rDWHk/exec";
      
      // 1. Enviamos los datos (modo 'no-cors' para que Google no bloquee el script)
      fetch(scriptURL, {
        method: "POST",
        body: new FormData(form),
        mode: "no-cors" 
      });

      // 2. BORRADO INMEDIATO (No esperamos a Google)
      // Cambiamos el mensaje
      if (mensaje) mensaje.textContent = "✅ Comentario enviado correctamente.";

      // Vaciamos el cuadro de texto manualmente (lo más importante)
      if (cajaTexto) cajaTexto.value = ""; 

      // Reseteamos el formulario y volvemos a poner los datos invisibles
      form.reset();
      rellenar();

      // 3. OPCIONAL: Borrar el mensaje de éxito después de 5 segundos
      setTimeout(() => {
        if (mensaje) mensaje.textContent = "";
      }, 5000);
    });
  }
});











document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll(
    "h1, h2, h3, h4, p, ol, ul, table, pre, code, hr, form, .nota, .nota-advertencia, .nota-info, [data-include]"
  );

elementos.forEach((el, index) => {
  const groupIndex = Math.floor(index / 5); // grupos de 5 elementos
  const directions = ["reveal-top", "reveal-right", "reveal-bottom", "reveal-left"];
  const direction = directions[groupIndex % directions.length];

  el.classList.add("reveal", direction);
});


  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
      } else {
        entrada.target.classList.remove("visible"); // Oculta cuando sale
      }
    });
  }, { threshold: 0.15 });
  rootMargin: "0px 0px -10% 0px" // Pequeño margen para evitar flicker en el borde

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});

