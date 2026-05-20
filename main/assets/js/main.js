/* ============================================
   ASTER - Main JavaScript
   Arquitectura con Hoisting de Funciones
   Convenci�n BEM para clases CSS
   ============================================ */

/* -----------------------------------------------
   Funciones declaradas (hoisted) � disponibles
   en cualquier punto del archivo gracias al
   hoisting de function declarations en JS.
   ----------------------------------------------- */

/**
 * initLoader � Muestra y oculta la pantalla de carga.
 */
function initLoader() {
  var loader = document.getElementById('loader');
  if (!loader) return;

  setTimeout(function() {
    loader.classList.add('hidden');
  }, 2200);

  setTimeout(function() {
    loader.remove();
  }, 3000);
}

/**
 * initMobileNav � Hamburger menu para m�viles.
 */
function initMobileNav() {
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  var links = navLinks.querySelectorAll('.nav__link');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  }
}

/**
 * initTabs � Sistema de pesta�as para nodos.
 */
function initTabs() {
  var tabContainers = document.querySelectorAll('.tabs');

  for (var t = 0; t < tabContainers.length; t++) {
    setupTabContainer(tabContainers[t]);
  }
}

/**
 * setupTabContainer � Configura un contenedor de tabs individual.
 * @param {HTMLElement} container
 */
function setupTabContainer(container) {
  var buttons = container.querySelectorAll('.tabs__btn');

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleTabClick);
  }

  function handleTabClick() {
    var tabId  = this.getAttribute('data-tab');
    var panels = container.querySelectorAll('.tabs__panel');

    // Desactivar todos los botones
    for (var j = 0; j < buttons.length; j++) {
      buttons[j].classList.remove('active');
    }
    this.classList.add('active');

    // Desactivar todos los paneles
    for (var k = 0; k < panels.length; k++) {
      panels[k].classList.remove('active');
    }

    // Activar el panel seleccionado
    var target = document.getElementById('tab-' + tabId);
    if (target) {
      target.classList.add('active');
    }
  }
}

/**
 * initScrollReveal � Animaci�n de elementos al entrar en viewport.
 */
function initScrollReveal() {
  var elements = document.querySelectorAll('.reveal');

  var observer = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('visible');
        observer.unobserve(entries[i].target);
      }
    }
  }, { threshold: 0.1 });

  for (var i = 0; i < elements.length; i++) {
    observer.observe(elements[i]);
  }
}

/**
 * initParticles � Genera part�culas flotantes verdes.
 */
function initParticles() {
  var container = document.getElementById('particles');
  if (!container) return;

  var PARTICLE_COUNT = 30;

  for (var i = 0; i < PARTICLE_COUNT; i++) {
    createParticle(container);
  }
}

/**
 * createParticle � Crea una part�cula individual.
 * @param {HTMLElement} container
 */
function createParticle(container) {
  var particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left            = Math.random() * 100 + '%';
  particle.style.animationDelay  = Math.random() * 8 + 's';
  particle.style.animationDuration = (6 + Math.random() * 6) + 's';
  container.appendChild(particle);
}

/**
 * initNavScroll � Oculta/muestra la navegaci�n seg�n direcci�n de scroll.
 */
function initNavScroll() {
  var nav = document.getElementById('nav');
  if (!nav) return;

  var lastScrollY = 0;

  window.addEventListener('scroll', function() {
    var currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
  });
}

/**
 * initSpectralForm � Formulario de conexi�n espectral con respuestas aleatorias.
 */
function initSpectralForm() {
  var submitBtn = document.getElementById('spectralSubmit');
  var input     = document.getElementById('spectralInput');
  var response  = document.getElementById('spectralResponse');

  if (!submitBtn || !input || !response) return;

  var RESPONSES = [
    '> Conexion establecida... Canal cifrado activo.',
    '> ADVERTENCIA: Tu ubicacion ha sido detectada. Cambiando frecuencia...',
    '> Mensaje recibido. La Resistencia escucha. Mantente en las sombras.',
    '> ERROR: Codigo no reconocido. Intento registrado por el sistema imperial.',
    '> La memoria es un arma. No olvides quien eres.',
    '> Celula Espectro confirma recepcion. Punto de encuentro: Tunel 7-G, Ciclo 3.',
    '> ALERTA: Censores imperiales en tu sector. Desconectando...',
    '> "El Domo nos contiene" - H.V. // Transmision finalizada.'
  ];

  submitBtn.addEventListener('click', function() {
    handleSpectralSubmit(input, response, RESPONSES);
  });

  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      handleSpectralSubmit(input, response, RESPONSES);
    }
  });
}

/**
 * handleSpectralSubmit � Procesa el env�o del formulario espectral.
 * @param {HTMLInputElement} input
 * @param {HTMLElement} response
 * @param {string[]} responses
 */
function handleSpectralSubmit(input, response, responses) {
  var val = input.value.trim();
  if (!val) return;

  response.style.color = '#39FF14';
  response.textContent = '> Procesando...';

  setTimeout(function() {
    var randomMsg = getRandomResponse(responses);
    response.textContent = randomMsg;
    input.value = '';

    response.style.color = getResponseColor(randomMsg);
  }, 1500);
}

/**
 * getRandomResponse � Selecciona una respuesta aleatoria.
 * @param {string[]} responses
 * @returns {string}
 */
function getRandomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * getResponseColor � Retorna el color seg�n el tipo de respuesta.
 * @param {string} message
 * @returns {string}
 */
function getResponseColor(message) {
  if (message.indexOf('ERROR') !== -1 || message.indexOf('ALERTA') !== -1) {
    return '#ff4444';
  }
  if (message.indexOf('ADVERTENCIA') !== -1) {
    return '#d4a740';
  }
  return '#39FF14';
}

/**
 * initGlitchHover � Reinicia la animaci�n glitch al hacer hover.
 */
function initGlitchHover() {
  var glitchElements = document.querySelectorAll('.glitch');

  for (var i = 0; i < glitchElements.length; i++) {
    glitchElements[i].addEventListener('mouseenter', handleGlitchHover);
  }
}

/**
 * handleGlitchHover � Handler para el efecto hover del glitch.
 */
function handleGlitchHover() {
  var el = this;
  el.style.animation = 'none';

  setTimeout(function() {
    el.style.animation = '';
  }, 50);
}

/**
 * initCorruptedText � Click handler para revelar texto corrupto.
 */
function initCorruptedText() {
  var corruptedElements = document.querySelectorAll('.corrupted');

  for (var i = 0; i < corruptedElements.length; i++) {
    corruptedElements[i].addEventListener('click', handleCorruptedClick);
  }
}

/**
 * handleCorruptedClick � Alterna la visibilidad del texto oculto.
 * @param {Event} e
 */
function handleCorruptedClick(e) {
  if (!e.target.closest('.corrupted__text')) {
    this.classList.toggle('revealed');
  }
}

/**
 * initTerminalTyping � Efecto de escritura secuencial en terminales.
 */
function initTerminalTyping() {
  var terminals = document.querySelectorAll('.terminal__body');

  for (var t = 0; t < terminals.length; t++) {
    animateTerminalLines(terminals[t]);
  }
}

/**
 * animateTerminalLines � Anima las l�neas de un terminal individual.
 * @param {HTMLElement} terminal
 */
function animateTerminalLines(terminal) {
  var lines = terminal.querySelectorAll(
    '.terminal__line, .terminal__line--error, .terminal__line--warn, .terminal__line--dim'
  );

  for (var i = 0; i < lines.length; i++) {
    revealTerminalLine(lines[i], i);
  }
}

/**
 * revealTerminalLine � Revela una l�nea individual con delay.
 * @param {HTMLElement} line
 * @param {number} index
 */
function revealTerminalLine(line, index) {
  line.style.opacity = '0';

  setTimeout(function() {
    line.style.transition = 'opacity 0.3s ease';
    line.style.opacity = '1';
  }, 300 + (index * 200));
}

/* -----------------------------------------------
   Inicializaci�n � Se ejecuta cuando el DOM est�
   listo. Todas las funciones ya est�n hoisted
   y disponibles en este punto.
   ----------------------------------------------- */

document.addEventListener('DOMContentLoaded', init);

/**
 * init � Punto de entrada principal.
 * Gracias al hoisting, todas las funciones
 * declaradas arriba est�n disponibles aqu�.
 */
function init() {
  initLoader();
  initMobileNav();
  initTabs();
  initScrollReveal();
  initParticles();
  initNavScroll();
  initSpectralForm();
  initGlitchHover();
  initCorruptedText();
  initTerminalTyping();
}
