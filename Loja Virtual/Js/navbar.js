document.addEventListener('DOMContentLoaded', function () {

    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const LIMIAR_PX = 10; 

    navbar.classList.add('visivel');

    if (window.matchMedia('(hover: none)').matches) {
        return;
    }

    let ultimoScrollY = window.scrollY;
    let aguardando = false;

    function atualizarNavbar() {
        const scrollAtual = window.scrollY;
        const diferenca = scrollAtual - ultimoScrollY;

        if (scrollAtual <= 0) {
            navbar.classList.add('visivel');
        } else if (diferenca > LIMIAR_PX) {
            navbar.classList.remove('visivel');
            ultimoScrollY = scrollAtual;
        } else if (diferenca < -LIMIAR_PX) {
            navbar.classList.add('visivel');
            ultimoScrollY = scrollAtual;
        }

        aguardando = false;
    }

    document.addEventListener('scroll', function () {
        if (!aguardando) {
            requestAnimationFrame(atualizarNavbar);
            aguardando = true;
        }
    });

});