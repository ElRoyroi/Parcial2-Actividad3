document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    // Evento para mostrar u ocultar la contraseña
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('bi-eye'); // Cambia el ícono
        togglePassword.classList.toggle('bi-eye-slash'); // Cambia el ícono
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario

        // Aquí puedes agregar cualquier lógica adicional que necesites antes de redirigir

        // Redirige a la página principal
        window.location.href = 'index.html';
    });
});
