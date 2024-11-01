// js/menu.js
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const sidebarMenu = document.getElementById("sidebar-menu");
    const body = document.body; // Referencia al body para agregar la clase

    // Verifica si el icono del menú existe antes de agregar el evento
    if (menuIcon) {
        menuIcon.addEventListener("click", function () {
            sidebarMenu.classList.toggle("active");

            // Agrega o quita la clase 'menu-active' al body
            body.classList.toggle("menu-active");

            // Dispara un evento personalizado cuando el menú se activa
            const event = new CustomEvent("sidebarToggle", { detail: { active: sidebarMenu.classList.contains("active") } });
            document.dispatchEvent(event);
        });
    }

    // Agrega un listener para el evento personalizado
    document.addEventListener("sidebarToggle", function (e) {
        console.log("El menú ha sido " + (e.detail.active ? "activado" : "desactivado"));
        // Aquí puedes agregar más acciones cuando el menú se activa/desactiva
    });

    // Ejemplo de evento personalizado al hacer clic en un botón
    const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            const logoutEvent = new CustomEvent("logout", { detail: { message: "El usuario ha cerrado sesión" } });
            document.dispatchEvent(logoutEvent);
        });
    }

    // Agrega un listener para el evento de cierre de sesión
    document.addEventListener("logout", function (e) {
        console.log(e.detail.message);
        // Aquí puedes agregar más acciones cuando el usuario cierra sesión
    });
});
    function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const body = document.body; // O el contenedor principal que uses

    sidebar.classList.toggle('active'); // Abre/cierra el menú
    body.classList.toggle('sidebar-open'); // Cambia el estado del contenedor
    }   
