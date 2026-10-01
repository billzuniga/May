const SUPABASE_URL = "https://imgwjoopckmtwfqhbyrc.supabase.co";
const SUPABASE_KEY = "sb_publishable_HRgymGfTIMfh4S6JrZkxCg_NKkfc54n";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ==============================
// ELEMENTOS
// ==============================

const login = document.getElementById("login");
const app = document.getElementById("app");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");

const mensajeLogin =
    document.getElementById("mensajeLogin");

const usuarioActual =
    document.getElementById("usuarioActual");


// ==============================
// RECUERDOS
// ==============================

const panelRecuerdos =
    document.getElementById("panelRecuerdos");


// ==============================
// TE EXTRAÑÉ
// ==============================

const btnExtrane =
    document.getElementById("btnExtrane");

const panelExtrane =
    document.getElementById("panelExtrane");

const btnRegistrarExtrane =
    document.getElementById("btnRegistrarExtrane");

const mensajeExtrane =
    document.getElementById("mensajeExtrane");

const listaHistorialExtrane =
    document.getElementById("listaHistorialExtrane");


// ==============================
// DISCUSIONES
// ==============================

const btnRegistro =
    document.getElementById("btnRegistro");

const panelRegistro =
    document.getElementById("panelRegistro");

const btnDiscutimos =
    document.getElementById("btnDiscutimos");

const saldoRegistro =
    document.getElementById("saldoRegistro");

const detalleSaldo =
    document.getElementById("detalleSaldo");

const listaHistorial =
    document.getElementById("listaHistorial");


// ==============================
// CARTITAS
// ==============================

const btnCartitas =
    document.getElementById("btnCartitas");

const panelCartitas =
    document.getElementById("panelCartitas");

const contenidoCartita =
    document.getElementById("contenidoCartita");

const firmaCartita =
    document.getElementById("firmaCartita");

const destinatarioCartita =
    document.getElementById("destinatarioCartita");

const btnGuardarCartita =
    document.getElementById("btnGuardarCartita");

const mensajeCartita =
    document.getElementById("mensajeCartita");

const fechaCartitas =
    document.getElementById("fechaCartitas");

const listaFechasCartitas =
    document.getElementById("listaFechasCartitas");

const listaCartitas =
    document.getElementById("listaCartitas");


// ==============================
// NAVEGACIÓN
// ==============================

const navInicio =
    document.getElementById("navInicio");

const navNosotros =
    document.getElementById("navNosotros");


// ==============================
// OBTENER NOMBRE
// ==============================

function obtenerNombre(user) {

    if (!user || !user.email) {
        return "";
    }


    const correo =
        user.email.toLowerCase();


    if (
        correo ===
        "billzuniga93@gmail.com"
    ) {

        return "Ray";
    }


    if (
        correo ===
        "bohorquezyandhira2@gmail.com"
    ) {

        return "Yandhira";
    }


    return user.email;
}


// ==============================
// CARGAR SALDO DISCUSIONES
// ==============================

async function cargarSaldo() {

    const { data, error } =
        await supabaseClient
            .from("discusiones")
            .select("id");


    if (error) {

        console.error(
            "Error cargando saldo:",
            error
        );

        return;
    }


    const cantidad =
        data.length;


    const total =
        cantidad * 2;


    saldoRegistro.textContent =
        `S/ ${total}.00`;


    detalleSaldo.textContent =
        `Ray: S/ ${cantidad}.00 · Yandhira: S/ ${cantidad}.00`;
}


// ==============================
// CARGAR HISTORIAL DISCUSIONES
// ==============================

async function cargarHistorial() {

    const { data, error } =
        await supabaseClient
            .from("discusiones")
            .select(
                "id, registrado_por, created_at"
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            "Error cargando historial:",
            error
        );

        return;
    }


    if (data.length === 0) {

        listaHistorial.innerHTML = `
            <p class="sin-registros">
                Todavía no hay discusiones registradas.
            </p>
        `;

        return;
    }


    listaHistorial.innerHTML = "";


    data.forEach(function (registro) {

        const fecha =
            new Date(
                registro.created_at
            );


        const fechaFormateada =
            fecha.toLocaleDateString(
                "es-PE",
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                }
            );


        const horaFormateada =
            fecha.toLocaleTimeString(
                "es-PE",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );


        const elemento =
            document.createElement("div");


        elemento.className =
            "registro-item";


        elemento.innerHTML = `
            <strong>
                💭 ${registro.registrado_por}
                registró una discusión
            </strong>

            <small>
                ${fechaFormateada} · ${horaFormateada}
            </small>
        `;


        listaHistorial.appendChild(
            elemento
        );
    });
}


// ==============================
// CARGAR REGISTRO DISCUSIONES
// ==============================

async function cargarRegistro() {

    await cargarSaldo();

    await cargarHistorial();
}


// ==============================
// CARGAR HISTORIAL TE EXTRAÑÉ
// ==============================

async function cargarHistorialExtrane() {

    const { data, error } =
        await supabaseClient
            .from("extrane")
            .select(
                "id, registrado_por, fecha, cantidad"
            )
            .order(
                "fecha",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            "Error cargando historial de Te extrañé:",
            error
        );

        return;
    }


    if (
        !data ||
        data.length === 0
    ) {

        listaHistorialExtrane.innerHTML = `
            <p class="sin-historial-extrane">
                Todavía no hay registros.
            </p>
        `;

        return;
    }


    listaHistorialExtrane.innerHTML =
        "";


    data.forEach(function (registro) {

        const partes =
            registro.fecha.split("-");


        const fecha =
            `${partes[2]}/${partes[1]}/${partes[0]}`;


        const elemento =
            document.createElement("div");


        elemento.className =
            "historial-extrane-item";


        elemento.innerHTML = `

            <div class="historial-extrane-persona">

                <span class="historial-extrane-corazon">
                    ❤️
                </span>

                <div>

                    <strong>
                        ${registro.registrado_por}
                    </strong>

                    <small>
                        ${fecha}
                    </small>

                </div>

            </div>


            <strong class="historial-extrane-cantidad">

                ${registro.cantidad}

                ${
                    registro.cantidad === 1
                        ? "vez"
                        : "veces"
                }

            </strong>

        `;


        listaHistorialExtrane.appendChild(
            elemento
        );
    });
}

// ==============================
// CARGAR CARTITAS
// ==============================

async function cargarCartitas() {

    const {
        data,
        error
    } =
        await supabaseClient
            .from("cartitas")
            .select(
                "id, firmado_por, contenido, created_at"
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            "Error cargando cartitas:",
            error
        );

        return;
    }


    if (
        !data ||
        data.length === 0
    ) {

        listaCartitas.innerHTML = `
            <p class="sin-cartitas">
                Todavía no hay cartitas guardadas.
            </p>
        `;

        listaFechasCartitas.innerHTML =
            "";

        return;
    }


    // ==========================
    // CREAR LISTA DE FECHAS
    // ==========================

    const fechas = [];


    data.forEach(function (cartita) {

        const fecha =
            new Date(
                cartita.created_at
            ).toLocaleDateString(
                "en-CA",
                {
                    timeZone:
                        "America/Lima"
                }
            );


        if (
            !fechas.includes(fecha)
        ) {

            fechas.push(fecha);
        }
    });


    listaFechasCartitas.innerHTML =
        "";


    fechas.forEach(function (fecha) {

        const partes =
            fecha.split("-");


        const fechaVisible =
            `${partes[2]}/${partes[1]}/${partes[0]}`;


        const boton =
            document.createElement("button");


        boton.type =
            "button";


        boton.className =
            "fecha-cartita";


        boton.textContent =
            fechaVisible;


        boton.addEventListener(
            "click",
            function () {

                fechaCartitas.value =
                    fecha;

                mostrarCartitasPorFecha(
                    data,
                    fecha
                );
            }
        );


        listaFechasCartitas.appendChild(
            boton
        );
    });


    // Mostrar las más recientes
    // inicialmente

    mostrarCartitasPorFecha(
        data,
        fechas[0]
    );
}


// ==============================
// MOSTRAR CARTITAS POR FECHA
// ==============================

function mostrarCartitasPorFecha(
    cartitas,
    fechaSeleccionada
) {

    const cartitasDelDia =
        cartitas.filter(
            function (cartita) {

                const fecha =
                    new Date(
                        cartita.created_at
                    ).toLocaleDateString(
                        "en-CA",
                        {
                            timeZone:
                                "America/Lima"
                        }
                    );


                return (
                    fecha ===
                    fechaSeleccionada
                );
            }
        );


    if (
        cartitasDelDia.length === 0
    ) {

        listaCartitas.innerHTML = `
            <p class="sin-cartitas">
                No hay cartitas para esta fecha.
            </p>
        `;

        return;
    }


    listaCartitas.innerHTML =
        "";


    cartitasDelDia.forEach(
        function (cartita) {

            const fecha =
                new Date(
                    cartita.created_at
                );


            const hora =
                fecha.toLocaleTimeString(
                    "es-PE",
                    {
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                );


            const elemento =
                document.createElement("div");


            elemento.className =
                "cartita-item";


            elemento.innerHTML = `
                <div class="cartita-item-corazon">
                    ♡
                </div>

                <div class="cartita-item-contenido">

                    <p class="cartita-texto">
                        ${cartita.contenido}
                    </p>

                    <div class="cartita-item-firma">
                        Con cariño,
                        <strong>
                            ${cartita.firmado_por}
                        </strong>
                    </div>

                    <small class="cartita-item-hora">
                        ${hora}
                    </small>

                </div>
            `;


            listaCartitas.appendChild(
                elemento
            );
        }
    );
}

// ==============================
// MOSTRAR APLICACIÓN
// ==============================

function mostrarAplicacion(user) {

    login.style.display =
        "none";


    app.style.display =
        "block";


    const nombre =
        obtenerNombre(user);


    usuarioActual.textContent =
        `Sesión iniciada: ${nombre}`;


    // RECUERDOS SIEMPRE ABIERTOS

    panelRecuerdos.classList.add(
        "visible"
    );


    // LOS OTROS EMPIEZAN CERRADOS

    panelExtrane.classList.remove(
        "visible"
    );

    panelRegistro.classList.remove(
        "visible"
    );

    panelCartitas.classList.remove(
        "visible"
    );


    cargarRegistro();

    cargarHistorialExtrane();
}

// ==============================
// GUARDAR CARTITA
// ==============================

btnGuardarCartita.addEventListener(
    "click",
    async function () {

        const contenido =
            contenidoCartita.value.trim();


        if (!contenido) {

            mensajeCartita.textContent =
                "Escribe algo antes de guardar la cartita. ♡";

            return;
        }


        btnGuardarCartita.disabled =
            true;


        mensajeCartita.textContent =
            "Guardando cartita...";


        const {
            data: {
                user
            }
        } =
            await supabaseClient.auth
                .getUser();


        if (!user) {

            mensajeCartita.textContent =
                "Debes iniciar sesión.";

            btnGuardarCartita.disabled =
                false;

            return;
        }


        const nombre =
            obtenerNombre(user);


        const {
            error
        } =
            await supabaseClient
                .from("cartitas")
                .insert({
                    user_id: user.id,
                    firmado_por: nombre,
                    contenido: contenido
                });


        if (error) {

            console.error(
                "Error guardando cartita:",
                error
            );


            mensajeCartita.textContent =
                "No se pudo guardar la cartita.";


            btnGuardarCartita.disabled =
                false;


            return;
        }


        contenidoCartita.value =
            "";


        mensajeCartita.textContent =
            "Cartita guardada con cariño. 💌";


        await cargarCartitas();


        btnGuardarCartita.disabled =
            false;
    }
);

// ==============================
// LOGIN
// ==============================

btnLogin.addEventListener(
    "click",
    async function () {

        const email =
            emailInput.value.trim();


        const password =
            passwordInput.value;


        mensajeLogin.textContent =
            "Iniciando sesión...";


        btnLogin.disabled =
            true;


        const { data, error } =
            await supabaseClient.auth
                .signInWithPassword({
                    email: email,
                    password: password
                });


        if (error) {

            console.error(error);


            mensajeLogin.textContent =
                "Correo o contraseña incorrectos.";


            btnLogin.disabled =
                false;


            return;
        }


        mensajeLogin.textContent =
            "";


        btnLogin.disabled =
            false;


        mostrarAplicacion(
            data.user
        );
    }
);


// ==============================
// TE EXTRAÑÉ - ABRIR / CERRAR
// ==============================

btnExtrane.addEventListener(
    "click",
    function () {

        panelExtrane.classList.toggle(
            "visible"
        );
    }
);


// ==============================
// REGISTRAR TE EXTRAÑÉ
// ==============================

btnRegistrarExtrane.addEventListener(
    "click",
    async function () {

        const {
            data: {
                user
            }
        } =
            await supabaseClient.auth
                .getUser();


        if (!user) {

            mensajeExtrane.textContent =
                "Debes iniciar sesión.";

            return;
        }


        const nombre =
            obtenerNombre(user);


        const hoy =
            new Date().toLocaleDateString(
                "en-CA",
                {
                    timeZone:
                        "America/Lima"
                }
            );


        const {
            data,
            error
        } =
            await supabaseClient
                .rpc(
                    "incrementar_extrane",
                    {
                        p_user_id: user.id,
                        p_nombre: nombre,
                        p_fecha: hoy
                    }
                );


        if (error) {

            console.error(error);


            mensajeExtrane.textContent =
                "No se pudo registrar.";


            return;
        }


        const cantidad =
            data;


        mensajeExtrane.textContent =
            `${nombre} te extrañó ${cantidad} ${
                cantidad === 1
                    ? "vez"
                    : "veces"
            } más ❤️`;


        // ACTUALIZAR HISTORIAL

        await cargarHistorialExtrane();
    }
);


// ==============================
// DISCUSIONES - ABRIR / CERRAR
// ==============================

btnRegistro.addEventListener(
    "click",
    async function () {

        const estabaAbierto =
            panelRegistro.classList.contains(
                "visible"
            );


        panelRegistro.classList.toggle(
            "visible"
        );


        if (!estabaAbierto) {

            await cargarRegistro();
        }
    }
);


// ==============================
// REGISTRAR DISCUSIÓN
// ==============================

btnDiscutimos.addEventListener(
    "click",
    async function () {

        btnDiscutimos.disabled =
            true;


        const {
            data: {
                user
            }
        } =
            await supabaseClient.auth
                .getUser();


        if (!user) {

            alert(
                "Debes iniciar sesión."
            );


            btnDiscutimos.disabled =
                false;


            return;
        }


        const nombre =
            obtenerNombre(user);


        if (
            nombre !== "Ray" &&
            nombre !== "Yandhira"
        ) {

            alert(
                "Este correo no está autorizado."
            );


            btnDiscutimos.disabled =
                false;


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

            console.error(
                "Error registrando:",
                error
            );


            alert(
                "No se pudo registrar la discusión."
            );


            btnDiscutimos.disabled =
                false;


            return;
        }


        await cargarRegistro();


        btnDiscutimos.disabled =
            false;
    }
);


// ==============================
// CARTITAS - ABRIR / CERRAR
// ==============================

btnCartitas.addEventListener(
    "click",
    async function () {

        const estabaAbierto =
            panelCartitas.classList.contains(
                "visible"
            );


        panelCartitas.classList.toggle(
            "visible"
        );


        if (!estabaAbierto) {

            const {
                data: {
                    user
                }
            } =
                await supabaseClient.auth
                    .getUser();


            if (user) {

    const nombre =
        obtenerNombre(user);


    firmaCartita.textContent =
        nombre;


    if (nombre === "Ray") {

        destinatarioCartita.textContent =
            "Escribe algo para el amor de tu vida (Yandhira)";

    } else if (nombre === "Yandhira") {

        destinatarioCartita.textContent =
            "Escribe algo para el amor de tu vida (Ray)";

    } else {

        destinatarioCartita.textContent =
            "Escribe algo para el amor de tu vida";
    }
}
            await cargarCartitas();
        }
    }
);


// ==============================
// CERRAR SESIÓN
// ==============================

btnLogout.addEventListener(
    "click",
    async function () {

        await supabaseClient.auth
            .signOut();


        app.style.display =
            "none";


        login.style.display =
            "flex";


        emailInput.value =
            "";

        passwordInput.value =
            "";


        mensajeLogin.textContent =
            "";


        panelRecuerdos.classList.add(
            "visible"
        );


        panelExtrane.classList.remove(
            "visible"
        );


        panelRegistro.classList.remove(
            "visible"
        );


        panelCartitas.classList.remove(
            "visible"
        );
    }
);


// ==============================
// NAVEGACIÓN
// ==============================

navInicio.addEventListener(
    "click",
    function () {

        alert(
            "no me creas maquina amor xd"
        );
    }
);


navNosotros.addEventListener(
    "click",
    function () {

        navNosotros.classList.add(
            "activo"
        );


        navInicio.classList.remove(
            "activo"
        );
    }
);


// ==============================
// COMPROBAR SESIÓN
// ==============================

async function comprobarSesion() {

    const { data } =
        await supabaseClient.auth
            .getSession();


    if (data.session) {

        mostrarAplicacion(
            data.session.user
        );
    }
}


comprobarSesion();
