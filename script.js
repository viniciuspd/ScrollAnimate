function debounce(func, wait, immediate) { // Função debounce com objetivo de diminuir o número de execuções da função animeScroll
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
const target = document.querySelectorAll('[data-anime]'); // Todos elementos que precisam executar a animação
const animationClass = 'animate'; // Essa variável tem por objetivo para adicionar a classe animate;

function animeScroll(){ // Função executada a cada vez que move o scroll
    const windowTop = window.pageYOffset + (window.innerHeight * 3 / 4); // Mostra Y da posição do scroll + um calculo para executar a function no momento certo.
    target.forEach(function(e){ // Descobre a posição atual dos elementos.
        if(windowTop > e.offsetTop){
            e.classList.add(animationClass); // Adiciona a classe que aumenta opacidade e acaba fazendo a animação.
        }else{
            e.classList.remove(animationClass); // Remove a classe que volta para opacidade 0 e faz animação
        }
    })
}

animeScroll(); // Serve para executar o código pelo menos ja uma vez quando abrir o site, assim evitando bugs.

if(target.length){ // Check se tem elementos no site para ter animação,se não tiver, não executa.
    window.addEventListener('scroll',debounce(function(){ //Aqui executa a função animeScroll(); toda vez que movimenta o scroll. E o debounce aumenta o intervale de execução dessa função, para não ser executar muitas vezes por segundo.
        animeScroll();
    },50),false);
    }