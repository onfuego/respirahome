# RespiraHome — Sitio web

Sitio web estático (HTML/CSS/JS, sin dependencias ni build) para **RespiraHome**,
empresa de **kinesiología a domicilio** en Santiago de Chile.

---

## 1. Cómo verlo y editarlo

- **Abrir localmente:** doble clic en `index.html`, o servir con
  `python3 -m http.server` y entrar a `http://localhost:8000`.
- **Editar precios, comunas, contacto, redes y FAQ:** todo está en un solo
  archivo → [`assets/js/config.js`](assets/js/config.js). **No necesitas tocar
  el resto del código.** Los valores marcados `POR DEFINIR` son placeholder.

### Lo que hay que reemplazar antes de publicar
| Dónde | Qué | Estado |
|---|---|---|
| `config.js` → `contacto.whatsapp` | Número real de WhatsApp (formato `56912345678`) | ⚠️ falta |
| `config.js` → `redes.instagram / facebook` | URLs reales | ⚠️ falta |
| `config.js` → `contacto.email` | Email de contacto | ⚠️ falta |
| `config.js` → `horario.recargoFueraHorario` | Monto del recargo fuera de horario | ⚠️ falta definir |
| `config.js` → `zonas[].recargo` | Recargos por distancia (hoy: $0 / $5.000 / $10.000) | 🟡 ajustar |
| `config.js` → `faq` | Respuestas de las preguntas vacías | 🟡 completar |
| `assets/img/og-image.jpg` | Imagen 1200×630 para compartir en redes (ver §5) | ⚠️ falta |
| Dominio `respirahome.cl` en `index.html`, `sitemap.xml`, `robots.txt`, `config.js` | Reemplazar si el dominio final es otro | 🟡 revisar |

---

## 2. Branding: ¿"RespiraHome" o "Respira Home"?

**Recomendación: dejarlo junto → `RespiraHome`**, estilizado con la segunda
palabra en negrita (`Respira**Home**`), como ya está en el sitio.

Motivos:
- **Un solo bloque = una sola marca memorable.** "RespiraHome" se lee como nombre
  propio, igual que Airbnb, HomeCare, TeleMed. Separado ("Respira Home") parece
  una descripción, no una marca.
- **Dominio y redes coherentes:** `respirahome.cl`, `@respirahome` se ven limpios
  y sin espacios (los @ no admiten espacios de todos modos).
- **SEO:** Google entiende ambas formas igual, pero una marca compacta genera
  búsquedas de marca ("respirahome") más fáciles de posicionar y medir.
- **Bilingüe amable:** "Home" aporta el matiz de *hogar/a domicilio* sin sonar
  extranjerizante, y "Respira" ancla lo respiratorio y el bienestar.

El truco visual del negrita en "**Home**" te da lo mejor de ambos mundos: se
percibe la unión de las dos ideas sin partir la palabra.

---

## 3. Análisis de mercado y recomendación de precios

> Rango de referencia del mercado de **kinesiología a domicilio en Santiago
> (RM)**, según valores públicos habituales del rubro. Úsalo como guía; conviene
> re-chequear cada temporada porque los precios se ajustan con frecuencia.

| Servicio | Rango de mercado a domicilio (CLP/sesión) | **Precio sugerido RespiraHome** |
|---|---|---|
| Kinesiología respiratoria **adulto mayor** | $22.000 – $38.000 | **$28.000** |
| Kinesiología respiratoria **pediátrica** | $22.000 – $38.000 | **$28.000** |
| **Rehabilitación musculoesquelética** | $20.000 – $40.000 | **$27.000** |
| **Rehabilitación cardiopulmonar** | $28.000 – $45.000 | **$32.000** |
| **Terapia manual ortopédica** | $25.000 – $42.000 | **$30.000** |

**Adicionales (kinesiología respiratoria adulto mayor):**
- Aspiración de secreciones: **+$6.000**
- Nebulización: **+$4.000**

**Recargo por distancia (desde Ñuñoa):**
- Zona 1 (Ñuñoa y colindantes): **$0**
- Zona 2 (distancia media): **+$5.000**
- Zona 3 (comunas alejadas): **+$10.000**

**Recargo fuera de horario** (antes de 08:00 / después de 18:00): **por definir**
(placeholder actual `$8.000`). Sugerencia: entre $6.000 y $10.000, o un +25–30%
sobre el valor base.

### Racional de la recomendación
- **Piso solicitado ($25.000) respetado y superado** con margen, pero sin salir
  del rango competitivo. Quedar en $27.000–$32.000 posiciona a RespiraHome como
  **calidad media-alta**, coherente con "profesionalismo en salud", sin ser el
  más caro ni competir por precio bajo (que desgasta y atrae público menos fiel).
- **Cardiopulmonar más caro** porque requiere más tiempo, monitoreo y expertise.
- **Respiratoria adulto mayor y pediátrica al mismo valor**: misma complejidad
  técnica; diferenciar confundiría al cliente.
- **Los recargos van aparte del precio base** (y así se muestran en el cotizador),
  para que el valor "de entrada" que ve la gente sea el más atractivo posible.

### Ideas para subir ticket promedio (opcional, a futuro)
- **Packs de sesiones** (ej. 4 sesiones con ~10% de descuento) → asegura
  continuidad del tratamiento y flujo de caja.
- **Primera evaluación** con valor diferenciado.
- **Suscripción mensual** para pacientes crónicos (adulto mayor).

---

## 4. Estructura del proyecto

```
RespiraHome/
├─ index.html            → toda la página (secciones + SEO + JSON-LD)
├─ robots.txt            → permite indexación + apunta al sitemap
├─ sitemap.xml           → mapa del sitio para Google
├─ site.webmanifest      → metadatos PWA / icono
├─ README.md             → este archivo
└─ assets/
   ├─ css/styles.css     → estilos (estilo clínico cálido)
   ├─ js/config.js       → ⭐ TODO el contenido editable (precios, comunas, etc.)
   ├─ js/main.js         → lógica (cotizador, FAQ, WhatsApp)
   └─ img/
      ├─ logo.svg        → logo
      ├─ favicon.svg     → ícono de pestaña
      └─ og-image.jpg    → (FALTA) imagen para compartir en redes
```

Secciones del sitio: Hero → Beneficios → Servicios → Cobertura → **Cotizador
interactivo** → Cómo funciona → **FAQ (acordeón, N preguntas)** → CTA WhatsApp →
Footer. Incluye botón flotante de WhatsApp y botones a Instagram/Facebook.

> El **cotizador** calcula el valor combinando servicio + adicionales + zona de la
> comuna + horario, y arma automáticamente el mensaje de WhatsApp con el detalle.

---

## 5. SEO — qué ya está hecho y qué debes hacer

### ✅ Ya viene configurado en el sitio
- `<title>`, `meta description`, `keywords`, `canonical`, `lang="es-CL"`.
- **Open Graph + Twitter Cards** (cómo se ve al compartir en WhatsApp/redes).
- **Datos estructurados JSON-LD** tipo `MedicalBusiness` (Google entiende que
  eres un negocio de salud, con servicios, comuna, horario y área de cobertura).
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, HTML semántico y responsive.
- `theme-color`, favicon SVG.

### 📋 Pasos que SÍ debes hacer tú (no se pueden automatizar desde el código)

1. **Comprar el dominio** (ej. `respirahome.cl` en NIC Chile) y publicar el sitio
   (ver §6). El SEO real empieza cuando está en línea con dominio propio.
2. **Reemplazar el dominio** en `index.html` (etiquetas `canonical`, `og:url`,
   `og:image`, JSON-LD), `sitemap.xml` y `robots.txt` si eliges otro dominio.
3. **Crear la imagen `og-image.jpg`** (1200×630 px) con logo + frase + fondo de
   marca, y guardarla en `assets/img/`. Es lo que se ve al pegar el link en
   WhatsApp/Instagram. (Puedes exportarla desde Canva o Figma.)
4. **Google Search Console** → https://search.google.com/search-console
   - Agrega la propiedad (el dominio).
   - Verifica la propiedad (opción más simple: subir un archivo HTML que Google
     te da, o agregar un registro DNS/TXT). *Aquí es el único punto donde "hay que
     conectar algo".*
   - Envía el `sitemap.xml` en la sección **Sitemaps**.
   - Usa **Inspección de URL → Solicitar indexación** para acelerar.
5. **Google Business Profile (Perfil de Empresa)** → https://business.google.com
   - Crea la ficha de "RespiraHome" como negocio de salud/servicio a domicilio.
   - **Esto es lo más importante para un negocio local**: te hace aparecer en
     Google Maps y en las búsquedas "kinesiólogo a domicilio Santiago". Marca el
     área de servicio (comunas), horario (Lun–Dom 08–18) y agrega el WhatsApp.
6. **(Opcional) Google Analytics 4** → https://analytics.google.com
   - Crea una propiedad, copia el snippet `gtag.js` y pégalo antes de `</head>`
     en `index.html` para medir visitas.
7. **Consistencia NAP** (Nombre, dirección/comuna base, teléfono): usa exactamente
   los mismos datos en el sitio, Google Business, Instagram y Facebook. Google
   premia la coherencia para negocios locales.
8. **Contenido con el tiempo:** completar las FAQ y, a futuro, un blog con temas
   ("cómo cuidar la respiración del adulto mayor en invierno") ayuda mucho al
   posicionamiento por búsquedas informativas.

> Tiempos realistas: indexación inicial en días–semanas; posicionar por
> "kinesiología a domicilio" toma meses. El **Perfil de Empresa de Google** suele
> dar los primeros clientes locales más rápido que el SEO orgánico.

---

## 6. Publicar el sitio (deploy)

Al ser estático, cualquiera de estas opciones es gratis y toma minutos:

- **Netlify** (recomendado para no-técnicos): arrastra la carpeta a
  https://app.netlify.com/drop → sitio en línea al instante. Luego conectas tu
  dominio en *Domain settings*.
- **Vercel:** https://vercel.com → *Add New Project* → subir carpeta / conectar Git.
- **Cloudflare Pages** o **GitHub Pages:** también válidos.

Después de publicar, conecta el dominio `.cl` (NIC Chile) apuntando los DNS según
las instrucciones del proveedor elegido, y sigue los pasos de SEO de §5.

---

## 7. Pendientes conocidos (para más adelante)
- Integrar la **funcionalidad real de agendamiento** (hoy el botón abre WhatsApp
  con mensaje pre-cargado; UI ya lista).
- Definir y cargar **recargo fuera de horario** y afinar **recargos por zona**.
- Completar **respuestas de FAQ**.
- Crear **og-image.jpg** y (opcional) versiones PNG del favicon para navegadores
  antiguos.
