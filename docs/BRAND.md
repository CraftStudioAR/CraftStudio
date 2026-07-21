# Craft Studio — Referencia de marca

Fuente única de verdad para todo lo visual y de tono del proyecto. Extraído de
los 3 documentos que pasó el cliente: `Brandboard_Craft_Studio.pdf`, `Concepto
de Marca.pdf` y `Dirección Creativa.pdf`.

## Colores

Solo estos 4 hex existen en el proyecto (`src/index.css`, bloque `@theme`).
Cualquier variación tonal se resuelve con opacidad (`/NN` en Tailwind), nunca
con un hex nuevo.

| Nombre (brandboard) | Hex       | Variable CSS   | Clase Tailwind        | Uso                          |
| -------------------- | --------- | -------------- | ---------------------- | ----------------------------- |
| Sweet White           | `#F2EBE9` | `--color-cream` | `bg-cream` / `text-cream` | Base, fondo dominante        |
| Rosso Corsa           | `#A52F18` | `--color-red`   | `bg-red` / `text-red`     | Acento principal              |
| Pure Black            | `#000000` | `--color-ink`   | `bg-ink` / `text-ink`     | Texto / secundario            |
| Prusian Blue          | `#0A0424` | `--color-navy`  | `bg-navy` / `text-navy`   | Acento profundo, usar con medida |

## Tipografía

Cargadas desde Google Fonts en `index.html` (`Instrument+Serif`,
`Instrument+Sans`, `La+Belle+Aurore`) y mapeadas en `src/index.css`.

| Fuente             | Variable CSS     | Clase Tailwind  | Rol                                          |
| ------------------ | ---------------- | --------------- | --------------------------------------------- |
| Instrument Serif    | `--font-serif`   | `font-serif` (usar siempre en `italic`) | Títulos, palabras destacadas (el logotipo NO usa esta fuente, ver sección Logos) |
| Instrument Sans     | `--font-sans`    | `font-sans` (default del body) | Texto de lectura, UI          |
| La Belle Aurore     | `--font-script`  | `font-script`   | Detalles manuscritos (tagline, firmas), uso puntual, nunca para bloques largos |

## Logos

El cliente mandó los 6 archivos vectoriales **oficiales** (`.svg`, versión
negra) — son los que hay que usar, no una aproximación. Están guardados en
[`public/brand/`](../public/brand/) y también como componentes React en
[`src/components/Logo.tsx`](../src/components/Logo.tsx) con `fill="currentColor"`
para heredar el color del contexto (negro sobre crema, blanco invertido sobre
rojo/navy, etc.).

**Importante:** el wordmark ("Craft Studio") es un dibujo de letras propio del
diseñador — **no está tipeado en Instrument Serif ni en ninguna fuente del
sistema**. Instrument Serif/Sans/La Belle Aurore son las fuentes para todo lo
demás (headlines, cuerpo, detalles); el logo en sí es arte fijo, siempre se
usa el SVG, nunca se recrea con texto.

| Nombre oficial (cliente) | Archivo en `public/brand/` | Componente React | Qué es |
| --- | --- | --- | --- |
| Isotipo | `logo-mark.svg` | `LogoMark` | El ícono solo: sello circular con asterisco de 6 puntas (referencia al sello de cera del brandboard) |
| Logotipo Horizontal | `logo-wordmark.svg` | `LogoWordmark` | El wordmark "Craft Studio" solo, en una línea, sin ícono |
| Logotipo Cuadrado | `logo-stacked.svg` | `LogoStacked` | El wordmark solo, apilado en 2 líneas ("Craft" / "Studio"), sin ícono — para espacios más cuadrados/verticales |
| Imagotipo Horizontal | `logo-lockup-horizontal.svg` | `LogoLockupHorizontal` | Ícono + wordmark horizontal combinados, en una línea |
| Imagotipo Cuadrado | `logo-lockup-stacked.svg` | `LogoLockupStacked` | Ícono + wordmark apilado combinados — el lockup más compacto, para avatares/formatos cuadrados |
| Imagotipo Bajada | `logo-tagline.svg` | `LogoTagline` | Wordmark horizontal + la bajada/tagline "we craft communication" debajo |

Uso actual en el sitio: `LogoMark` en `favicon.svg`, hero de Home (parallax de
fondo) y footer; `LogoWordmark` en el nav. El resto de los lockups (`LogoStacked`,
`LogoLockupHorizontal`, `LogoLockupStacked`, `LogoTagline`) están disponibles
para usar donde convenga según el espacio disponible (ej. redes sociales,
favicon alternativo, firma de mail, avatar cuadrado).

Variantes de color documentadas en el brandboard (se logran cambiando
`text-*`/`bg-*` alrededor del componente, nunca editando el SVG):

- Negro sobre Sweet White (los 6 archivos recibidos son esta variante)
- Blanco invertido sobre Rosso Corsa
- Blanco invertido sobre Prusian Blue
- Rojo sobre Sweet White (usado en `Imagotipo Bajada`)

El brandboard no especifica un área de resguardo (clear space) ni un tamaño
mínimo en números. Si el cliente lo define después, agregarlo acá.

## Elementos gráficos (glifos)

Pilar "Elementos Gráficos" del brandboard: 18 glifos tipográficos vectoriales
oficiales, provistos por el cliente, guardados en
[`public/brand/glyphs/`](../public/brand/glyphs/) y como componente React en
[`src/components/GlyphMark.tsx`](../src/components/GlyphMark.tsx)
(`<GlyphMark variant={n} />`, `fill="currentColor"`). Se usan como textura de
fondo decorativa (grandes, semitransparentes) — **no** son parte de la
familia de logos, son un motivo aparte.

| variant | Archivo | Símbolo |
| --- | --- | --- |
| 0 | `exclamation.svg` | ! |
| 1 | `hash.svg` | # |
| 2 | `ampersand.svg` | & |
| 3 | `paren-close.svg` | ) |
| 4 | `at.svg` | @ |
| 5 | `brace-close.svg` | } |
| 6 | `accent.svg` | ´ |
| 7 | `accent-double.svg` | ´´ |
| 8 | `quote-single.svg` | ' |
| 9 | `equals.svg` | = |
| 10 | `chevron-double.svg` | » |
| 11 | `degree.svg` | ° |
| 12 | `quote-open.svg` | abre comillas |
| 13 | `slash.svg` | / |
| 14 | `quote-close.svg` | cierra comillas |
| 15 | `bracket.svg` | corchete |
| 16 | `chevron.svg` | mayor (›) |
| 17 | `question.svg` | ? |

Usado actualmente en `Estudio.tsx` (variants 1 y 3), `Home.tsx` y `WorkCard.tsx`.

## Tono de voz

Claro, fundamentado, seguro, humano, sobrio. Directo sin ser frío, con
autoridad sin ser soberbio. **Nunca**: decorativo, tendencioso, místico,
soñador, mágico.

- Tagline: **"We craft communication"**
- Frase síntesis: *"Un estudio que piensa como estratega y construye como
  artesano"*
- Propósito: *"Existimos para darle forma al mensaje de las marcas que tienen
  algo real para decir"*
- Misión: *"Pensamos el problema, diseñamos la solución"*

## Valores

Criterio, Oficio, Intención, Honestidad, Profundidad, Construcción — cada uno
definido por oposición a la superficialidad (ver `src/content/brand.ts` para
el texto completo de cada uno).

## Dirección creativa (cómo se traduce a interacción web)

- **Tensión "estabilidad + intriga"**: layout ordenado y con jerarquía clara,
  pero con capas que sugieren profundidad oculta.
- **Vidrio / refracción**: pilar de textura del brief (referencia al plugin
  Figma "Fractal Glass Effect"). Implementado como utilidades `.glass-panel` /
  `.glass-sheen` en `src/index.css` — transparencia con cuerpo, blur +
  saturación, sheen animado en hover.
- **Grano fotográfico/análogo**: imperfección consciente, aporta temperatura.
  Implementado como `.grain-overlay` (SVG turbulence, `mix-blend-mode:
  overlay`).
- **Chrome de herramientas de diseño sobre fotografía**: crosshairs, handles
  de selección, tooltips flotantes en cápsulas — es la base conceptual del
  cursor personalizado (`CustomCursor.tsx`) y de los data-cursor labels en
  toda la web.

## Fuentes originales

Los 3 PDF del cliente quedan fuera del repo (son archivos pesados del
cliente, no assets de proyecto). Si hace falta volver a consultarlos, están en
`~/Downloads/`: `Brandboard_Craft_Studio.pdf`, `Concepto de Marca.pdf`,
`Dirección Creativa.pdf`.
