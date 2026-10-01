
const SUPABASE_URL = "https://imgwjoopckmtwfqhbyrc.supabase.co";
const SUPABASE_KEY = "sb_publishable_HRgymGfTIMfh4S6JrZkxCg_NKkfc54n";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const login = document.getElementById("login");
const app = document.getElementById("app");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");
const btnDiscutimos = document.getElementById("btnDiscutimos");

const mensajeLogin = document.getElementById("mensajeLogin");
const usuarioActual = document.getElementById("usuarioActual");

const saldoTotal = document.querySelector("#app .tarjeta-saldo h2");
const mensajeSaldo = document.querySelector("#app .tarjeta-saldo p");


async function cargarSaldo() {

    const { data, error } = await supabaseClient
        .from("discusiones")
        .select("id");

    if (error) {
        console.error("Error cargando saldo:", error);
        return;
    }

    const cantidad = data.length;
    const total = cantidad * 2;

    saldoTotal.textContent = `S/ ${total}.00`;

    mensajeSaldo.textContent =
        `Ray: S/ ${cantidad}.00 · Yandhira: S/ ${cantidad}.00`;
}


function mostrarAplicacion(user) {

    login.style.display = "none";
    app.style.display = "block";

    if (user.email.toLowerCase() === "billzuniga93@gmail.com") {
        usuarioActual.textContent = "Sesión iniciada: Ray";
    } else if (user.email.toLowerCase() === "bohorquezyandhira2@gmail.com") {
        usuarioActual.textContent = "Sesión iniciada: Yandhira";
    } else {
        usuarioActual.textContent = `Sesión iniciada: ${user.email}`;
    }

    cargarSaldo();
}


btnLogin.addEventListener("click", async function () {

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    mensajeLogin.textContent = "Iniciando sesión...";

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

    if (error) {
        console.error(error);
        mensajeLogin.textContent =
            "Correo o contraseña incorrectos.";
        return;
    }

    mostrarAplicacion(data.user);
});


btnDiscutimos.addEventListener("click", async function () {

    btnDiscutimos.disabled = true;

    const { data: { user } } =
        await supabaseClient.auth.getUser();

    if (!user) {
        alert("Debes iniciar sesión.");
        btnDiscutimos.disabled = false;
        return;
    }

    const correo = user.email.toLowerCase();

    let nombre;

    if (correo === "billzuniga93@gmail.com") {
        nombre = "Ray";
    } else if (correo === "bohorquezyandhira2@gmail.com") {
        nombre = "Yandhira";
    } else {
        alert("Este correo no está autorizado.");
        btnDiscutimos.disabled = false;
        return;
    }

    const { error } =
        await supabaseClient
            .from("discusiones")
            .insert({
                registrado_por: nombre,
                user_id: user.id
            });

    if (error) {
        console.error("Error registrando:", error);
        alert("No se pudo registrar la discusión.");
        btnDiscutimos.disabled = false;
        return;
    }

    await cargarSaldo();

    btnDiscutimos.disabled = false;
});


btnLogout.addEventListener("click", async function () {

    await supabaseClient.auth.signOut();

    app.style.display = "none";
    login.style.display = "block";

    emailInput.value = "";
    passwordInput.value = "";

    mensajeLogin.textContent = "";
});


async function comprobarSesion() {

    const { data } =
        await supabaseClient.auth.getSession();

    if (data.session) {
        mostrarAplicacion(data.session.user);
    }
}


comprobarSesion();