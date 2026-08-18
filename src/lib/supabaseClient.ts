import type { WorkCase } from '../content/brand';
import { work as localWork } from '../content/brand';
import { articles as localArticles } from '../content/lab';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.includes('supabase.co')
);

export const supabase = null;

/**
 * Obtener todos los proyectos (desde Supabase con fallback a los estáticos de brand.ts)
 */
export async function getProjects(): Promise<WorkCase[]> {
  return localWork;
}

/**
 * Obtener un proyecto específico por su slug
 */
export async function getProjectBySlug(slug: string): Promise<WorkCase | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

/**
 * Obtener todos los artículos de Craft Lab
 */
export async function getCraftLabArticles() {
  return localArticles;
}

/**
 * Obtener un artículo específico por slug
 */
export async function getCraftLabArticleBySlug(slug: string) {
  const articles = await getCraftLabArticles();
  return articles.find((a: { slug: string }) => a.slug === slug);
}
