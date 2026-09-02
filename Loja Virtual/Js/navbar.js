// navbar-hide.js
// Torna a navbar escondida por padrão, revelando-a apenas quando
// o mouse chega perto do topo da tela (ou enquanto está sobre ela).

document.addEventListener('DOMContentLoaded', function () {

    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const ZONA_SENSIVEL_PX = 60;

    // Em telas sem mouse (celular/tablet), manter a navbar sempre visível
    if (window.matchMedia('(hover: none)').matches) {
        navbar.classList.add('visivel');
        return;
    }

    document.addEventListener('mousemove', function (evento) {

        const pertoDoTopo = evento.clientY <= ZONA_SENSIVEL_PX;
        const sobreNavbar = navbar.contains(evento.target);

        if (pertoDoTopo || sobreNavbar) {
            navbar.classList.add('visivel');
        } else {
            navbar.classList.remove('visivel');
        }

    });

});