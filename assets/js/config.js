/* ============================================================================
   RespiraHome — Configuración central del sitio
   ----------------------------------------------------------------------------
   EDITA ESTE ARCHIVO para cambiar precios, comunas, contacto y redes sociales.
   No necesitas tocar el resto del código. Los valores marcados como
   "POR DEFINIR" son estimaciones/placeholder que deben confirmarse.
   ========================================================================== */

window.RESPIRAHOME_CONFIG = {

  /* ---- Contacto y redes ------------------------------------------------- */
  contacto: {
    // Número de WhatsApp en formato internacional SIN "+", ni espacios.
    // Chile = 56, luego 9 y los 8 dígitos. Ej: 56912345678
    whatsapp: "56900000000",           // POR DEFINIR: reemplazar por el real
    telefonoVisible: "+56 9 0000 0000", // POR DEFINIR
    email: "contacto@respirahome.cl",   // POR DEFINIR
    // Mensaje que se pre-carga al abrir WhatsApp
    whatsappMensaje: "¡Hola RespiraHome! Quiero agendar una sesión de kinesiología a domicilio.",
  },

  redes: {
    instagram: "https://instagram.com/respirahome",  // POR DEFINIR
    facebook:  "https://facebook.com/respirahome",    // POR DEFINIR
  },

  /* ---- Horarios de atención --------------------------------------------- */
  horario: {
    diasTexto: "Lunes a Domingo",
    horaInicio: "08:00",
    horaFin: "18:00",
    // Recargo por atención fuera del horario normal (antes de 08:00 o después de 18:00)
    recargoFueraHorario: 8000,   // POR DEFINIR (CLP) — placeholder editable
  },

  /* ---- Servicios y precios base (CLP, zona sin recargo) ------------------
     Los precios base están calibrados sobre el estudio de mercado (ver README).
     Piso solicitado por el equipo: $25.000. Ajusta libremente.               */
  servicios: [
    {
      id: "resp-adulto",
      nombre: "Kinesiología respiratoria — Adulto mayor",
      descripcion: "Evaluación y tratamiento respiratorio domiciliario para el adulto mayor: higiene bronquial, técnicas de reeducación respiratoria y manejo de secreciones.",
      precio: 28000,
      icono: "lungs",
      destacado: true,
      // Adicionales exclusivos de este servicio
      adicionales: [
        { id: "aspiracion", nombre: "Aspiración de secreciones", precio: 6000 },
        { id: "nebulizacion", nombre: "Nebulización", precio: 4000 },
      ],
    },
    {
      id: "resp-pediatrico",
      nombre: "Kinesiología respiratoria — Pediátrica",
      descripcion: "Terapia respiratoria para bebés y niños: manejo de bronquiolitis, bronquitis y secreciones, con técnicas suaves y seguras a domicilio.",
      precio: 28000,
      icono: "baby",
      destacado: false,
      adicionales: [],
    },
    {
      id: "musculo",
      nombre: "Rehabilitación musculoesquelética",
      descripcion: "Recuperación funcional de lesiones, post operatorios, dolor de espalda, rodilla y hombro mediante ejercicio terapéutico dirigido.",
      precio: 27000,
      icono: "muscle",
      destacado: false,
      adicionales: [],
    },
    {
      id: "cardio",
      nombre: "Rehabilitación cardiopulmonar",
      descripcion: "Programa de reacondicionamiento para pacientes cardíacos y respiratorios crónicos, con monitoreo y progresión segura del esfuerzo.",
      precio: 32000,
      icono: "heart",
      destacado: false,
      adicionales: [],
    },
    {
      id: "terapia-manual",
      nombre: "Terapia manual ortopédica",
      descripcion: "Técnicas manuales especializadas para aliviar el dolor, mejorar la movilidad articular y tratar disfunciones musculoesqueléticas.",
      precio: 30000,
      icono: "hand",
      destacado: false,
      adicionales: [],
    },
  ],

  /* ---- Zonas de cobertura (recargo por distancia desde Ñuñoa) -----------
     Cada comuna pertenece a una zona. El recargo se suma al precio base.    */
  zonas: [
    {
      id: "z1",
      nombre: "Zona 1 — Sin recargo",
      recargo: 0,
      descripcion: "Ñuñoa y comunas colindantes.",
      comunas: [
        "Ñuñoa", "Providencia", "Santiago Centro", "Macul",
        "Peñalolén", "La Reina", "San Joaquín",
      ],
    },
    {
      id: "z2",
      nombre: "Zona 2 — Recargo intermedio",
      recargo: 5000,   // POR DEFINIR (ajustable)
      descripcion: "Comunas de distancia media.",
      comunas: [
        "Las Condes", "Vitacura", "La Florida", "Independencia",
        "Recoleta", "San Miguel", "La Cisterna", "Estación Central",
        "Quinta Normal", "Pedro Aguirre Cerda", "La Granja",
      ],
    },
    {
      id: "z3",
      nombre: "Zona 3 — Recargo alto",
      recargo: 10000,  // POR DEFINIR (ajustable)
      descripcion: "Comunas más alejadas del sector oriente/centro.",
      comunas: [
        "Puente Alto", "Maipú", "Quilicura", "Pudahuel", "Huechuraba",
        "La Pintana", "El Bosque", "Cerrillos", "Renca", "Conchalí",
        "Lo Barnechea", "San Bernardo", "Lo Espejo", "Cerro Navia",
        "San Ramón", "La Cisterna",
      ],
    },
  ],

  /* ---- Previsión / formas de pago --------------------------------------- */
  previsiones: ["Fonasa", "Particular", "Todas las Isapres"],

  /* ---- FAQ — agrega/edita las N preguntas que quieras -------------------
     Deja "respuesta" vacío ("") si aún no la tienen; la pregunta se mostrará
     igualmente con un texto "Próximamente".                                  */
  faq: [
    { pregunta: "¿Atienden por Fonasa e Isapres?", respuesta: "Sí. Atendemos particular, Fonasa y todas las Isapres. Consúltanos por tu caso para orientarte sobre reembolsos y bonos." },
    { pregunta: "¿Cómo agendo una sesión?", respuesta: "Puedes agendar directamente por WhatsApp con el botón de esta página. Te confirmaremos horario y profesional a la brevedad." },
    { pregunta: "¿A qué comunas de Santiago llegan?", respuesta: "" },
    { pregunta: "¿Cuánto dura una sesión?", respuesta: "" },
    { pregunta: "¿Qué necesito tener en casa para la atención?", respuesta: "" },
    { pregunta: "¿Puedo pedir atención de urgencia fuera de horario?", respuesta: "" },
  ],

  /* ---- Dominio del sitio (para SEO / enlaces) --------------------------- */
  sitio: {
    dominio: "https://www.respirahome.cl", // POR DEFINIR: dominio final
  },
};
