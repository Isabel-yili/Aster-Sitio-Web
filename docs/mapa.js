/* ================================================================
   MAPA INTERACTIVO RPG — mapa.js
   Descripción: Genera hotspots desde un array de datos,
   maneja apertura/cierre del panel lateral y todas las
   interacciones del mapa.
================================================================ */

'use strict';

/* ---------------------------------------------------------------
   1. DATOS DE LOS HOTSPOTS
   Edita este array para personalizar tu mapa.

   Campos:
   - id       : identificador único (string)
   - top      : posición vertical en % sobre la imagen
   - left     : posición horizontal en % sobre la imagen
   - nombre   : nombre del territorio (se muestra en panel y etiqueta)
   - desc      : descripción larga del territorio
   - imagen   : URL de imagen del territorio (puede ser null o '')
   - stats    : objeto de pares clave/valor opcionales (puede ser null)
   - clase    : clase CSS adicional para el hotspot (ej. 'diamond')
--------------------------------------------------------------- */
const HOTSPOTS = [
  {
    id:     'aster',
    top:    '34%',
    left:   '34%',
    nombre: 'Aster',
    desc:   'Una ciudad industrial asentada sobre vetas minerales inagotables. La población está compuesta en su mayoría por obreros mineros, ingenieros de vapor y técnicos especializados en maquinaria extractiva. Las jornadas son largas y el aire siempre denso por el polvo metálico. Las clases altas habitan estructuras elevadas, lejos de las minas, mientras que la mayoría vive en barrios compactos alrededor de los pozos de extracción. La economía gira casi exclusivamente en torno a la minería y el refinamiento de recursos.',
    imagen: './images/aaster.png',
    stats:  { Estado: 'Neutral', Gobierno: 'Monarquía', Gobernante: 'El emperador', Clima: 'Frío Industrial', Peligro: '⚔⚔⚔⚔' },
    clase:  'diamond'
  },
  {
    id:     'nikolaia',
    top:    '21.5%',
    left:   '29.4%',
    nombre: 'Nikolaia',
    desc:   'Una región selvática donde la población vive en simbiosis con su entorno. Sus habitantes utilizan tecnología biomecánica rudimentaria combinada con sistemas hidráulicos para desplazarse entre las copas de los árboles. La densidad poblacional es baja, organizada en comunidades cerradas que rechazan la industrialización pesada. Su economía se basa en recursos orgánicos, extracción controlada y conocimiento botánico.',
    imagen: './images/nikolaia.png',
    stats:  { Estado: 'Aislado', Gobierno: 'Consejo Druídico', Gobernante: 'Círculo Sylvari', Clima: 'Templado', Peligro: '⚔⚔' },
    clase:  'diamond'
  },
  {
    id:     'dravencross',
    top:    '12.5%',
    left:   '25%',
    nombre: 'Dravencross sur',
    desc:   'El núcleo político y extractivo de la nación dividida de Dravencross. A diferencia del resto del desierto rojo, esta región está casi completamente cubierta por nieve cenicienta, producto de reacciones térmicas subterráneas y emisiones industriales que enfrían la superficie. Bajo ese manto helado operan enormes complejos de perforación que descienden hacia vetas minerales profundas. La población está compuesta por obreros especializados en minería extrema, equipados con trajes térmicos y maquinaria de vapor reforzada. Las condiciones son brutales, lo que ha llevado a una fuerte centralización del poder: desde el sur se regula el flujo de recursos hacia el norte, manteniendo el control económico y político de toda la nación.',
    imagen: './images/dravencross1.png',
    stats:  { Estado: 'Dominante', Gobierno: 'Estado Central Industrial', Gobernante: 'Alto Consejo Extractor', Clima: 'Glacial / Volcánico', Peligro: '⚔⚔⚔⚔' },
    clase:  'diamond'
  },
  {
    id:     'Valeront',
    top:    '41%',
    left:   '25%',
    nombre: 'Valeront',
    desc:   'Una metrópolis densamente poblada donde la mayoría de sus habitantes trabaja en sectores administrativos, energéticos y de manufactura industrial. Las clases sociales están claramente divididas entre distritos elevados y zonas fabriles. Su población depende de redes energéticas complejas que requieren mantenimiento constante por ingenieros especializados.',
    imagen: './images/valeront.png',
    stats:  { Estado: 'Estable', Gobierno: 'República Tecnológica', Gobernante: 'Consejo Central', Clima: 'Continental', Peligro: '⚔' },
    clase:  'diamond'
  },
  {
    id:     'regnum',
    top:    '13.6%',
    left:   '37.2%',
    nombre: 'Regnum',
    desc:   'Una zona prácticamente despoblada donde solo operan expediciones industriales altamente especializadas. Equipos de extracción vertical descienden a las profundidades utilizando elevadores mecánicos reforzados. La población es temporal, compuesta por trabajadores enviados por contratos de alto riesgo.',
    imagen: './images/regnum.png',
    stats:  { Estado: 'Inexplorado', Gobierno: 'Ninguno', Gobernante: 'N/A', Clima: 'Desconocido', Peligro: '⚔⚔⚔⚔⚔' },
    clase:  'diamond'
  },
  {
    id:     'arkenfall',
    top:    '27%',
    left:   '72.7%',
    nombre: 'arkenfall',
    desc:   'Una región fértil que se ha consolidado como el principal proveedor de alimentos y semillas del mundo. Su población está compuesta por cultivadores, ingenieros agrónomos y operadores de sistemas de cultivo mecanizado. Utilizan tecnología de vapor y control climático para maximizar la producción. Mantienen relaciones amistosas con todas las regiones, ya que su estabilidad es clave para el abastecimiento global.',
    imagen: './images/arkenfall.png',
    stats:  { Estado: 'Amistoso', Gobierno: 'Cooperativa Agraria', Gobernante: 'Consejo de Cultivo', Clima: 'Templado Fértil', Peligro: '⚔⚔' },
    clase:  'diamond'
  },
  {
    id:     'riovanna',
    top:    '35.5%',
    left:   '47.3%',
    nombre: 'riovanna',
    desc: 'Una región que domina el uso del mar en todos sus frentes. Su población se especializa en navegación, comercio marítimo y control de rutas navales. Utilizan embarcaciones industriales y sistemas mecánicos avanzados para el transporte de recursos, la defensa y la expansión económica, convirtiéndose en una potencia marítima clave.',
    imagen: './images/riovanna.png',
    stats:  { Estado: 'Fluctuante', Gobierno: 'Gremios', Gobernante: 'Capitanes de Canal', Clima: 'Húmedo Industrial', Peligro: '⚔⚔⚔⚔⚔' },
    clase:  'diamond'
  },
  {
  id:     'medellthor',
  top:    '62.5%',
  left:   '67.6%',
  nombre: 'Medellthor',
  desc:   'La mayor potencia tecnológica del mundo. Su población está compuesta por ingenieros, científicos y desarrolladores que lideran la innovación en todos los ámbitos. Aunque es una región pacífica, mantiene una preparación militar constante respaldada por tecnología avanzada. Desde aquí se diseña y distribuye la maquinaria más sofisticada, convirtiéndola en un pilar esencial para el desarrollo global.',
  imagen: './images/medellthor.png',
  stats:  { Estado: 'Hegemónico', Gobierno: 'Tecno-Estado', Gobernante: 'Alto Directorio', Clima: 'Frío Montañoso', Peligro: '⚔⚔⚔⚔⚔' },
  clase:  'diamond'
  },
  {
    id:     'tectrio',
    top:    '79.9%',
    left:   '53.1%',
    nombre: 'tectrio',
    desc:   'Una zona de actividad geotérmica donde la población utiliza el calor del subsuelo para alimentar maquinaria pesada. Las comunidades están compuestas por técnicos y operadores que gestionan sistemas de energía inestable. La vida aquí es funcional y altamente especializada.',
    imagen: './images/tectrio.png',
    stats:  { Estado: 'Activo', Gobierno: 'Ninguno', Gobernante: 'Supervisores Térmicos', Clima: 'Geotérmico', Peligro: '⚔⚔⚔⚔⚔' },
    clase:  'diamond'
  },
  {
    id:     'dravencross2',
    top:    '76%',
    left:   '37.7%',
    nombre: 'Dravencross Norte',
    desc:   'Una extensión desértica donde se concentran grandes operaciones de extracción automatizada. A diferencia del sur, aquí predominan instalaciones fijas controladas por sistemas mecánicos autónomos. La población humana es mínima y se limita a supervisores técnicos.',
    imagen: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&h=338&fit=crop',
    stats:  { Estado: 'Automatizado', Gobierno: 'Ninguno', Gobernante: 'Sistemas Autónomos', Clima: 'Árido / Volcánico', Peligro: '⚔⚔⚔⚔' },
    clase:  'diamond'
  },
  {
    id:     'quantara',
    top:    '66%',
    left:   '47%',
    nombre: 'quantara',
    desc:   'Una región inestable donde el espacio y la materia parecen comportarse de forma irregular. Su territorio cambia sutilmente con el tiempo, alterando rutas, estructuras y asentamientos. La población que habita allí se ha adaptado a esta inestabilidad, utilizando tecnología avanzada para predecir y aprovechar estas anomalías. Es un punto clave para la experimentación y la obtención de recursos únicos que no existen en otras regiones.',
    imagen: './images/quantara.png',
    stats:  { Estado: 'Inestable', Gobierno: 'Ninguno', Gobernante: 'N/A', Clima: 'Variable', Peligro: '⚔⚔⚔⚔⚔' },
    clase:  'diamond'    
  },
  {
    id:     'brumhollow',
    top:    '94.2%',
    left:   '30.6%',
    nombre: 'brumhollow',
    desc:   'Una zona periférica con baja visibilidad constante debido a emisiones industriales. La población vive en asentamientos cerrados y depende de sistemas de filtración de aire. La mayoría trabaja en plantas de procesamiento o reciclaje de materiales.',
    imagen: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&h=338&fit=crop',
    stats:  { Estado: 'Degradado', Gobierno: 'Ninguno', Gobernante: 'Administradores de Planta', Clima: 'Contaminado', Peligro: '⚔⚔⚔⚔' },
    clase:  'diamond'
  },
  {
    id:     'elisheba',
    top:    '20.5%',
    left:   '48.3%',
    nombre: 'Elisheba',
      desc: 'Una vasta región montañosa atravesada por cordilleras interminables, donde las tormentas eléctricas son constantes. La población se asienta en ciudades incrustadas en las montañas y utiliza tecnología especializada para canalizar la energía de los relámpagos. Sus habitantes son expertos en navegación terrestre en terrenos extremos y en el aprovechamiento energético de las tormentas.',
    imagen: './images/elisheba.png',
    stats:  { Estado: 'Neutral', Gobierno: 'Consejo de Corsarios', Gobernante: 'Capitanes Tormenta', Clima: 'Tormenta Permanente', Peligro: '⚔⚔⚔' },
    clase:  'diamond'
  }
];

/* ---------------------------------------------------------------
   2. IMAGEN DEL MAPA
   Reemplaza esta URL con la ruta a tu imagen de mapa.
   Puede ser relativa: './mi-mapa.jpg' o absoluta.
--------------------------------------------------------------- */
const MAPA_IMAGEN = './images/mundo1.png';

/* ---------------------------------------------------------------
   3. INICIALIZACIÓN
   Se ejecuta cuando el DOM está listo.
--------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('mapa-contenedor');
  const panel      = document.getElementById('mapa-panel');

  if (!contenedor || !panel) {
    console.error('[MapaRPG] No se encontró #mapa-contenedor o #mapa-panel en el DOM.');
    return;
  }

  cargarImagenMapa(contenedor);
  generarHotspots(contenedor);
  inicializarPanel();
});

/* ---------------------------------------------------------------
   4. CARGAR IMAGEN DEL MAPA
--------------------------------------------------------------- */
function cargarImagenMapa(contenedor) {
  contenedor.classList.add('cargando');

  const img = new Image();

  img.onload = () => {
    contenedor.style.backgroundImage = `url('${MAPA_IMAGEN}')`;
    contenedor.classList.remove('cargando');
  };

  img.onerror = () => {
    // Fallback: fondo generado con canvas si la imagen falla
    contenedor.classList.remove('cargando');
    const fallback = generarFondoFallback();
    contenedor.style.backgroundImage = `url('${fallback}')`;
    console.warn('[MapaRPG] No se pudo cargar la imagen del mapa. Usando fondo de fallback.');
  };

  img.src = MAPA_IMAGEN;
}

/**
 * Genera un fondo procedural con Canvas si la imagen principal falla.
 * Devuelve un dataURL.
 */
function generarFondoFallback() {
  const c  = document.createElement('canvas');
  c.width  = 1200;
  c.height = 700;
  const ctx = c.getContext('2d');

  // Fondo base
  const grad = ctx.createRadialGradient(600, 350, 50, 600, 350, 700);
  grad.addColorStop(0,   '#1a2a1a');
  grad.addColorStop(0.4, '#141e22');
  grad.addColorStop(0.8, '#0e1618');
  grad.addColorStop(1,   '#080a0e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 700);

  // "Continentes" simulados
  const manchas = [
    { x: 250, y: 200, rx: 200, ry: 130, color: '#1e3a20' },
    { x: 550, y: 300, rx: 250, ry: 160, color: '#253d1e' },
    { x: 850, y: 220, rx: 170, ry: 120, color: '#1c3418' },
    { x: 700, y: 480, rx: 160, ry: 100, color: '#2a4422' },
    { x: 180, y: 480, rx: 140, ry: 90,  color: '#1e3820' },
  ];
  manchas.forEach(m => {
    ctx.beginPath();
    ctx.ellipse(m.x, m.y, m.rx, m.ry, Math.PI / 6, 0, Math.PI * 2);
    ctx.fillStyle = m.color;
    ctx.fill();
  });

  // Agua
  ctx.globalCompositeOperation = 'destination-over';
  const agua = ctx.createLinearGradient(0, 0, 1200, 700);
  agua.addColorStop(0,   '#0a1825');
  agua.addColorStop(0.5, '#0d2035');
  agua.addColorStop(1,   '#091520');
  ctx.fillStyle = agua;
  ctx.fillRect(0, 0, 1200, 700);
  ctx.globalCompositeOperation = 'source-over';

  // Texto indicativo
  ctx.font = 'bold 22px Cinzel, Georgia, serif';
  ctx.fillStyle = 'rgba(200,168,75,0.25)';
  ctx.textAlign = 'center';
  ctx.fillText('AETHERION', 600, 350);
  ctx.font = '14px Georgia, serif';
  ctx.fillStyle = 'rgba(200,168,75,0.15)';
  ctx.fillText('Reemplaza MAPA_IMAGEN con la URL de tu imagen', 600, 380);

  return c.toDataURL('image/png');
}

/* ---------------------------------------------------------------
   5. GENERAR HOTSPOTS EN EL DOM
--------------------------------------------------------------- */
function generarHotspots(contenedor) {
  HOTSPOTS.forEach((hotspot, index) => {
    const el = document.createElement('button');

    // Clases y atributos
    el.className = `hotspot${hotspot.clase ? ' ' + hotspot.clase : ''}`;
    el.setAttribute('aria-label', `Ver información de ${hotspot.nombre}`);
    el.dataset.id = hotspot.id;

    // Posición en porcentaje
    el.style.top  = hotspot.top;
    el.style.left = hotspot.left;

    // Delay de entrada escalonada (stagger)
    el.style.animationDelay = `${0.4 + index * 0.1}s`;

    // HTML interno
    el.innerHTML = `
      <div class="hotspot__pulse"></div>
      <div class="hotspot__pulse2"></div>
      <div class="hotspot__icono"></div>
      <span class="hotspot__label">${hotspot.nombre}</span>
    `;

    // Evento de clic
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      abrirPanel(hotspot);
      marcarActivo(el);
    });

    contenedor.appendChild(el);
  });
}

/* ---------------------------------------------------------------
   6. LÓGICA DEL PANEL LATERAL
--------------------------------------------------------------- */

/** Referencias al DOM del panel */
const dom = {
  get panel()       { return document.getElementById('mapa-panel'); },
  get titulo()      { return document.getElementById('panel-titulo'); },
  get desc()        { return document.getElementById('panel-desc'); },
  get imagen()      { return document.getElementById('panel-imagen'); },
  get imagenWrap()  { return document.getElementById('panel-imagen-wrap'); },
  get stats()       { return document.getElementById('panel-stats'); },
  get cerrar()      { return document.getElementById('panel-cerrar'); },
  get overlay()     { return document.getElementById('mapa-overlay-cierre'); },
};

/** Hotspot actualmente abierto */
let hotspotActivo = null;

/**
 * Abre el panel lateral con los datos del hotspot recibido.
 * @param {Object} hotspot - Objeto del array HOTSPOTS
 */
function abrirPanel(hotspot) {
  const { panel, titulo, desc, imagen, imagenWrap, stats, overlay } = dom;

  // Si ya está abierto el mismo, cerrar
  if (hotspotActivo && hotspotActivo.id === hotspot.id) {
    cerrarPanel();
    return;
  }

  hotspotActivo = hotspot;

  // ── Llenar contenido ──────────────────────────────────────────

  // Título
  titulo.textContent = hotspot.nombre;

  // Descripción
  desc.textContent = hotspot.desc || 'Sin descripción disponible.';

  // Imagen
  if (hotspot.imagen) {
    imagenWrap.classList.remove('sin-imagen');
    imagen.classList.remove('cargada');
    imagen.alt = hotspot.nombre;
    imagen.src = '';

    // Carga con fadeIn
    const tempImg = new Image();
    tempImg.onload = () => {
      imagen.src = hotspot.imagen;
      // Pequeño timeout para garantizar que el CSS transition se aplique
      requestAnimationFrame(() => {
        requestAnimationFrame(() => imagen.classList.add('cargada'));
      });
    };
    tempImg.onerror = () => {
      imagenWrap.classList.add('sin-imagen');
    };
    tempImg.src = hotspot.imagen;
  } else {
    imagenWrap.classList.add('sin-imagen');
    imagen.src = '';
    imagen.classList.remove('cargada');
  }

  // Stats adicionales
  stats.innerHTML = '';
  if (hotspot.stats && Object.keys(hotspot.stats).length > 0) {
    Object.entries(hotspot.stats).forEach(([clave, valor]) => {
      const dt = document.createElement('dt');
      const dd = document.createElement('dd');
      dt.textContent = clave;
      dd.textContent = valor;
      stats.appendChild(dt);
      stats.appendChild(dd);
    });
  }

  // ── Abrir panel ───────────────────────────────────────────────
  panel.classList.add('abierto');
  panel.setAttribute('aria-hidden', 'false');

  // Overlay de cierre (solo en móvil, controlado por CSS)
  if (overlay) {
    overlay.classList.add('visible');
    overlay.addEventListener('click', cerrarPanel, { once: true });
  }
}

/**
 * Cierra el panel lateral.
 */
function cerrarPanel() {
  const { panel, overlay } = dom;

  panel.classList.remove('abierto');
  panel.setAttribute('aria-hidden', 'true');

  if (overlay) overlay.classList.remove('visible');

  // Desmarcar hotspot activo
  desmarcarActivos();
  hotspotActivo = null;
}

/**
 * Inicializa los listeners del panel (botón cerrar, clic en el mapa, teclado).
 */
function inicializarPanel() {
  const { cerrar } = dom;
  const contenedor = document.getElementById('mapa-contenedor');

  // Botón cerrar
  if (cerrar) {
    cerrar.addEventListener('click', cerrarPanel);
  }

  // Tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hotspotActivo) {
      cerrarPanel();
    }
  });

  // Clic en el mapa fuera de hotspots
  if (contenedor) {
    contenedor.addEventListener('click', (e) => {
      if (!e.target.closest('.hotspot') && hotspotActivo) {
        cerrarPanel();
      }
    });
  }
}

/* ---------------------------------------------------------------
   7. MANEJO DEL ESTADO VISUAL ACTIVO DE HOTSPOTS
--------------------------------------------------------------- */

/**
 * Marca un hotspot como activo (seleccionado).
 * @param {HTMLElement} el - El elemento botón del hotspot
 */
function marcarActivo(el) {
  desmarcarActivos();
  el.classList.add('activo');
}

/**
 * Quita la clase activo de todos los hotspots.
 */
function desmarcarActivos() {
  document.querySelectorAll('.hotspot.activo').forEach(h => {
    h.classList.remove('activo');
  });
}

/* ---------------------------------------------------------------
   8. API PÚBLICA (opcional)
   Funciones expuestas globalmente para controlar el mapa
   desde otros scripts de la página.

   Ejemplo de uso:
     MapaRPG.abrir('bosque-eterno');
     MapaRPG.cerrar();
     MapaRPG.agregarHotspot({ id: 'nuevo', top: '50%', left: '50%', nombre: 'Nuevo' });
--------------------------------------------------------------- */
window.MapaRPG = {

  /**
   * Abre el panel del hotspot con el ID dado.
   * @param {string} id - ID del hotspot
   */
  abrir(id) {
    const data = HOTSPOTS.find(h => h.id === id);
    if (!data) { console.warn(`[MapaRPG] Hotspot "${id}" no encontrado.`); return; }
    const el = document.querySelector(`.hotspot[data-id="${id}"]`);
    if (el) marcarActivo(el);
    abrirPanel(data);
  },

  /** Cierra el panel lateral. */
  cerrar: cerrarPanel,

  /**
   * Agrega un hotspot dinámicamente en tiempo de ejecución.
   * @param {Object} hotspot - Objeto con la misma estructura que HOTSPOTS
   */
  agregarHotspot(hotspot) {
    const contenedor = document.getElementById('mapa-contenedor');
    if (!contenedor) return;
    HOTSPOTS.push(hotspot);

    // Crear solo el nuevo elemento
    const tempArr = [hotspot];
    generarHotspots(contenedor, tempArr);
  },

  /** Devuelve el array completo de hotspots (para depuración). */
  get datos() { return [...HOTSPOTS]; }
};
