# Rediseño de detalle de proyecto (TrabajoDetalle) + carga del primer proyecto real

## Contexto

`TrabajoDetalle.tsx` (ruta `/trabajos/:slug`) es hoy 100% placeholder: no hay ni una imagen real, solo cajas de color con texto tipo `[ Fotografía del Proyecto ]`. El tipo `WorkCase` (`src/content/brand.ts`) no tiene campos para descripción larga, alcance del proyecto ni imágenes.

Vamos a cargar el primer proyecto real — una etiqueta de vino inspirada en Emily Dickinson — siguiendo el layout de un PDF de referencia (case study editorial: hero con panel de metadata, imagen full-bleed, bloques de texto en caja, galería asimétrica de fotos, fila de keywords, imagen final con quote superpuesto). Las 14 fotos ya están subidas a Cloudinary (`cloud name: kre7pjni`, cuenta libre — no se necesita API key/secret, solo entrega pública de imágenes) con nombres `Etiqueta_Vino_1`…`Etiqueta_Vino_14` que coinciden exactamente con el orden de aparición en el PDF (verificado imagen por imagen).

Requisito explícito: no todos los proyectos futuros van a tener el contenido en el mismo orden/posición — el modelo de datos tiene que soportar eso sin forzar una plantilla rígida. También: la portada del proyecto debe verse en la grilla de `/trabajos`, y el mobile no debe "apilar todo así nomás" — se decide layout por tipo de contenido, priorizando legibilidad de fotos con texto/detalle fino (planos, bocetos) sobre mantener composición 2 columnas a toda costa.

## Modelo de datos

Ampliar `src/content/brand.ts` de forma **aditiva** (los 4 casos placeholder existentes siguen funcionando sin cambios, sin `cover`/`blocks`):

```ts
export type ProjectImage = { publicId: string; alt: string };

export type ProjectBlock =
  | { type: "image"; image: ProjectImage }                          // imagen full-bleed
  | { type: "imageFeature"; main: ProjectImage; stacked: [ProjectImage, ProjectImage] } // 1 grande + 2 apiladas
  | { type: "imagePair"; images: [ProjectImage, ProjectImage]; mobileLayout?: "pair" | "stack" } // 2 columnas
  | { type: "imageText"; image: ProjectImage; text: string }        // imagen + texto en caja
  | { type: "keywords"; items: string[] }                           // fila de palabras clave
  | { type: "quote"; image: ProjectImage; quote: string };          // imagen final + frase superpuesta

export type WorkCase = {
  slug: string;
  client: string;
  category: string;
  year: string;
  summary: string;
  tags: string[];
  cover?: ProjectImage;      // portada — usada en WorkCard / grilla de /trabajos
  scope?: string[];          // "Alcance del proyecto" (chips en el hero)
  description?: string;      // párrafo largo de intro (caja con borde)
  blocks?: ProjectBlock[];   // secuencia de contenido — orden y composición libres por proyecto
};
```

`blocks` es un array ordenado: cada proyecto arma su propia secuencia de bloques en el orden que corresponda a su historia, sin estar atado a una plantilla fija. `TrabajoDetalle` solo sabe iterar y renderizar por `type`; no asume un orden.

`mobileLayout` en `imagePair` es la palanca explícita para el criterio de mobile: `"pair"` (default) mantiene 2 columnas más angostas para fotos puramente visuales; `"stack"` pasa a ancho completo cuando el contenido necesita legibilidad (planos, bocetos con anotaciones).

## Cloudinary

Nuevo helper `src/lib/cloudinary.ts`:

```ts
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export function cld(publicId: string, transforms = "f_auto,q_auto") {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}
```

- Cloud name va en `VITE_CLOUDINARY_CLOUD_NAME` dentro de `.env.local` (ya cubierto por `*.local` en `.gitignore`, no requiere tocarlo). Se agrega también `.env.example` documentando la variable (sin valor real) para que quede claro en el repo.
- Nota: el cloud name no es secreto (viaja en cada URL pública servida al visitante); se usa env var por prolijidad/portabilidad entre entornos, no por seguridad. No hace falta API key/secret porque solo se consumen imágenes ya subidas.
- Todas las imágenes se piden con `f_auto,q_auto` (formato y calidad automáticos vía Cloudinary) para servir WebP/AVIF sin pérdida visible perceptible y con menor peso, tal como se acordó con la usuaria.

## Componentes

- **`src/components/work/ProjectBlocks.tsx`** (nuevo): recibe `blocks: ProjectBlock[]` y renderiza cada uno según su `type`, reutilizando `Reveal` (fade-in on scroll, patrón ya usado en el resto del sitio) y las clases visuales existentes (`rounded-2xl`, `grain-overlay`, paleta cream/red/ink/navy, `font-serif italic` para el quote).
  - `image`: `w-full aspect-video md:aspect-[21/9] rounded-2xl object-cover`, igual proporción que el placeholder hero actual.
  - `imageFeature`: desktop = grid 2 columnas (imagen principal ocupa una columna a doble altura, las 2 apiladas a la derecha) — replica el collage asimétrico del PDF. Mobile = imagen principal a ancho completo arriba, las 2 apiladas debajo como par lado a lado (evita 3 imágenes largas apiladas en fila, que se sentiría repetitivo).
  - `imagePair`: desktop = 2 columnas. Mobile: según `mobileLayout` (`pair` = 2 columnas angostas, `stack` = ancho completo apiladas).
  - `imageText`: desktop = grid 2 columnas (imagen izq., texto en caja con borde a la derecha, mismo estilo que el placeholder `[ Detalle ]` actual pero con contenido real). Mobile = imagen arriba, texto abajo.
  - `keywords`: fila centrada, uppercase, tracking amplio, separador `·` — se envuelve solo si no entra en una línea en mobile.
  - `quote`: igual tratamiento visual al placeholder hero actual en dark theme (imagen + overlay), con la frase en `font-serif italic` centrada sobre la imagen.
- **`TrabajoDetalle.tsx`**: agrega, debajo del panel de metadata existente (Categoría/Año/Entregables), un bloque "Alcance del proyecto" si `project.scope` existe, y el párrafo `project.description` en una caja con borde (antes de la galería). La sección de imágenes reemplaza el placeholder por `<ProjectBlocks blocks={project.blocks} />` cuando existe; si un proyecto no tiene `blocks` (los 4 placeholder viejos), se mantiene exactamente el placeholder actual — cero regresión.
- **`WorkCard.tsx`**: si `work.cover` existe, se renderiza la imagen (`cld(cover.publicId, "f_auto,q_auto,w_800")`) con `object-cover` en vez del panel degradado + `GlyphMark`; se mantienen encima el grain-overlay, glass-sheen y las esquinas decorativas para no perder la identidad visual de la card. Si no hay `cover` (proyectos placeholder), se mantiene el degradado actual — cero regresión ahí tampoco.

## Contenido del proyecto (datos)

Nueva entrada en `work` (`src/content/brand.ts`), agregada a las 4 existentes (no las reemplaza):

- `slug`: `"etiqueta-emily-dickinson"`
- `client`: "Diseño de etiqueta inspirada en Emily Dickinson"
- `category`: "Activación" · `year`: "2025"
- `summary`: "Desarrollo de una etiqueta de vino basada en un concepto literario, combinando narrativa, ilustración y diseño editorial."
- `scope`: ["Diseño de packaging", "Dirección de arte", "Conceptualización", "Ilustración"]
- `description`: el párrafo de la caja con borde ("Este proyecto nace como un homenaje a Emily Dickinson...")
- `cover`: `Etiqueta_Vino_1` (barriles/HORNOS)
- `blocks` (14 imágenes, orden verificado 1→14 = orden del PDF):
  1. `image` → 1 (HORNOS)
  2. `imageFeature` → main 2 (botella en balde de hielo), stacked [3 (uvas/Emily), 4 (Bodega de Maduración)]
  3. `keywords` → ["LIBERTAD", "MUNDO INTERIOR", "ESPERANZA"]
  4. `imagePair` (mobileLayout: pair) → [5 (viñedo), 6 (botella en baldosas)]
  5. `imageText` → imagen 7 (libro "DISEÑO"), texto "Partimos del poema Hope is the thing with feathers..."
  6. `imagePair` (mobileLayout: **stack**) → [8 (bocetos a mano), 9 (planos)] — tienen anotaciones finas, necesitan ancho completo en mobile
  7. `image` → 10 (picnic)
  8. `imagePair` (mobileLayout: pair) → [11 (bodega/estantería), 12 (botella en banco)]
  9. `imageText` → imagen 13 (corchos), texto "El diseño representa la vida de Emily Dickinson..." (2 párrafos)
  10. `quote` → imagen 14 (viñedo), quote "HOPE IS THE THING WITH FEATHERS"

Todos los textos son los definitivos extraídos directamente del PDF (verificados, no parafraseados).

## Fuera de alcance

- No se toca la data de los 4 casos placeholder existentes (`caso-01`…`caso-04`) — quedan como están.
- No se construye ningún panel de administración/CMS; cargar un proyecto nuevo sigue siendo editar `brand.ts` a mano (documentado como decisión ya tomada, no hay pedido de cambiarlo).
- No se implementa lightbox/zoom de imágenes — el PDF no lo pide y no se discutió.
