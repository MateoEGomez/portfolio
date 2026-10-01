const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("abierto");
});

const enlaces = document.querySelectorAll(".nav-links a");

enlaces.forEach(function (enlace) {
    enlace.addEventListener("click", function () {
        navLinks.classList.remove("abierto");
    });
});

const temaBtn = document.getElementById("temaBtn");

const temaIcono = temaBtn.querySelector("i");

if (localStorage.getItem("tema") === "oscuro") {
    document.body.classList.add("oscuro");
    temaIcono.className = "fa-solid fa-sun";
}

temaBtn.addEventListener("click", function () {
    document.body.classList.toggle("oscuro");

    if (document.body.classList.contains("oscuro")) {
        temaIcono.className = "fa-solid fa-sun";
        localStorage.setItem("tema", "oscuro");
    } else {
        temaIcono.className = "fa-solid fa-moon";
        localStorage.setItem("tema", "claro");
    }
});

const filtros = document.querySelectorAll(".filtro");
const proyectos = document.querySelectorAll(".proyecto");

filtros.forEach(function (filtro) {
    filtro.addEventListener("click", function () {
        filtros.forEach(function (f) {
            f.classList.remove("activo");
        });
        filtro.classList.add("activo");

        const categoria = filtro.dataset.filtro;

        proyectos.forEach(function (proyecto) {
            if (categoria === "todos" || proyecto.dataset.categoria === categoria) {
                proyecto.classList.remove("oculto");
            } else {
                proyecto.classList.add("oculto");
            }
        });
    });
});

const form = document.getElementById("formContacto");
const formMensaje = document.getElementById("formMensaje");

form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const asunto = document.getElementById("asunto");
    const mensaje = document.getElementById("mensaje");
    const campos = [nombre, email, asunto, mensaje];
    let valido = true;

    campos.forEach(function (campo) {
        if (campo.value.trim() === "") {
            campo.classList.add("error");
            valido = false;
        } else {
            campo.classList.remove("error");
        }
    });

    if (email.value.trim() !== "" && !email.value.includes("@")) {
        email.classList.add("error");
        valido = false;
    }

    if (valido) {
        const cuerpo = mensaje.value.trim() + "\n\n" + nombre.value.trim() + " (" + email.value.trim() + ")";
        window.location.href = "mailto:gomezmateoezequiel@gmail.com"
            + "?subject=" + encodeURIComponent(asunto.value.trim())
            + "&body=" + encodeURIComponent(cuerpo);

        formMensaje.textContent = "¡Gracias " + nombre.value.trim() + "! Se abrió tu correo para enviar el mensaje.";
        formMensaje.className = "form-mensaje exito";
        form.reset();
    } else {
        formMensaje.textContent = "Revisá los campos marcados en rojo.";
        formMensaje.className = "form-mensaje fallo";
    }
});

document.getElementById("anio").textContent = new Date().getFullYear();
