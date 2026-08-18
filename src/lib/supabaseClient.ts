import { createClient } from '@supabase/supabase-js';
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

console.log('[DEBUG] Supabase Configured:', isSupabaseConfigured, 'URL:', supabaseUrl);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Obtener todos los proyectos (desde Supabase con fallback a los estáticos de brand.ts)
 */
export async function getProjects(): Promise<WorkCase[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[Supabase Error] getProjects:', error.message, error.details);
      } else if (data && data.length > 0) {
        return data.map((item) => ({
          ...item,
          scope: typeof item.scope === 'string' ? JSON.parse(item.scope) : item.scope,
          cover: typeof item.cover === 'string' ? JSON.parse(item.cover) : item.cover,
          blocks: typeof item.blocks === 'string' ? JSON.parse(item.blocks) : item.blocks,
        }));
      }
    } catch (e) {
      console.error('[Supabase Exception] getProjects:', e);
    }
  }
  return localWork;
}

/**
 * Obtener un proyecto específico por su slug
 */
export async function getProjectBySlug(slug: string): Promise<WorkCase | undefined> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error(`[Supabase Error] getProjectBySlug (${slug}):`, error.message, error.details);
      } else if (data) {
        return {
          ...data,
          scope: typeof data.scope === 'string' ? JSON.parse(data.scope) : data.scope,
          cover: typeof data.cover === 'string' ? JSON.parse(data.cover) : data.cover,
          blocks: typeof data.blocks === 'string' ? JSON.parse(data.blocks) : data.blocks,
        };
      }
    } catch (e) {
      console.error(`[Supabase Exception] getProjectBySlug (${slug}):`, e);
    }
  }
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

/**
 * Obtener todos los artículos de Craft Lab
 */
export async function getCraftLabArticles() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('craft_lab_articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[Supabase Error] getCraftLabArticles:', error.message, error.details);
      } else if (data && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.error('[Supabase Exception] getCraftLabArticles:', e);
    }
  }
  return localArticles;
}

/**
 * Obtener un artículo específico por slug
 */
export async function getCraftLabArticleBySlug(slug: string) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('craft_lab_articles')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error(`[Supabase Error] getCraftLabArticleBySlug (${slug}):`, error.message, error.details);
      } else if (data) {
        return data;
      }
    } catch (e) {
      console.error(`[Supabase Exception] getCraftLabArticleBySlug (${slug}):`, e);
    }
  }
  const articles = await getCraftLabArticles();
  return articles.find((a: { slug: string }) => a.slug === slug);
}
