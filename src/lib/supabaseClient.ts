import { createClient } from '@supabase/supabase-js';
import type { WorkCase } from '../content/brand';
import { work as localWork, brandLogos as localBrandLogos } from '../content/brand';
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
        const settingsRow = data.find((item) => item.slug === '__settings__');
        let customOrder: string[] = [];
        try {
          if (settingsRow && settingsRow.description) {
            const parsed = JSON.parse(settingsRow.description);
            if (Array.isArray(parsed.customOrder)) {
              customOrder = parsed.customOrder;
            }
          }
        } catch (e) {
          // Ignore
        }

        const projectsOnly = data.filter((item) => item.slug !== '__settings__');

        const mappedProjects = projectsOnly.map((item) => {
          let titleStyle = undefined;
          try {
            if (item.description && item.description.trim().startsWith('{')) {
              const parsed = JSON.parse(item.description);
              titleStyle = parsed.titleStyle;
            }
          } catch (e) {
            // Ignore
          }
          return {
            ...item,
            scope: typeof item.scope === 'string' ? JSON.parse(item.scope) : item.scope,
            cover: typeof item.cover === 'string' ? JSON.parse(item.cover) : item.cover,
            blocks: typeof item.blocks === 'string' ? JSON.parse(item.blocks) : item.blocks,
            titleStyle,
          };
        });

        if (customOrder.length > 0) {
          mappedProjects.sort((a, b) => {
            const idxA = customOrder.indexOf(a.slug);
            const idxB = customOrder.indexOf(b.slug);
            const posA = idxA === -1 ? 99999 : idxA;
            const posB = idxB === -1 ? 99999 : idxB;
            return posA - posB;
          });
        }

        return mappedProjects;
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
        let titleStyle = undefined;
        try {
          if (data.description && data.description.trim().startsWith('{')) {
            const parsed = JSON.parse(data.description);
            titleStyle = parsed.titleStyle;
          }
        } catch (e) {
          // Ignore
        }
        return {
          ...data,
          scope: typeof data.scope === 'string' ? JSON.parse(data.scope) : data.scope,
          cover: typeof data.cover === 'string' ? JSON.parse(data.cover) : data.cover,
          blocks: typeof data.blocks === 'string' ? JSON.parse(data.blocks) : data.blocks,
          titleStyle,
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
        const settingsRow = data.find((item) => item.slug === '__settings__');
        let customOrder: string[] = [];
        let sortMode: 'date' | 'custom' = 'date';
        try {
          if (settingsRow && settingsRow.desc) {
            const parsed = JSON.parse(settingsRow.desc);
            if (Array.isArray(parsed.customOrder)) {
              customOrder = parsed.customOrder;
            }
            if (parsed.sortMode) {
              sortMode = parsed.sortMode;
            }
          }
        } catch (e) {
          // Ignore
        }

        const articlesOnly = data.filter((item) => item.slug !== '__settings__');

        const mappedArticles = articlesOnly.map((item) => ({
          ...item,
          blocks: typeof item.blocks === 'string' ? JSON.parse(item.blocks) : item.blocks || [],
        }));

        if (sortMode === 'custom' && customOrder.length > 0) {
          mappedArticles.sort((a, b) => {
            const idxA = customOrder.indexOf(a.slug);
            const idxB = customOrder.indexOf(b.slug);
            const posA = idxA === -1 ? 99999 : idxA;
            const posB = idxB === -1 ? 99999 : idxB;
            return posA - posB;
          });
        } else {
          mappedArticles.sort((a, b) => {
            const dateA = new Date(a.created_at || a.date || 0).getTime();
            const dateB = new Date(b.created_at || b.date || 0).getTime();
            return dateB - dateA;
          });
        }

        return mappedArticles;
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

/**
 * Obtener logos del carrusel de marcas
 */
export async function getBrandLogos(): Promise<Array<{ publicId: string; alt: string }>> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('description')
        .eq('slug', '__settings__')
        .maybeSingle();

      if (!error && data && data.description) {
        const parsed = JSON.parse(data.description);
        if (Array.isArray(parsed.brandLogos) && parsed.brandLogos.length > 0) {
          return parsed.brandLogos;
        }
      }
    } catch (e) {
      console.error('[Supabase Error] getBrandLogos:', e);
    }
  }
  return localBrandLogos;
}
