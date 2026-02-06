// Blog API - External CMS Integration
// =====================================
// This module handles fetching blog posts from external sources.
// Supports: WordPress REST API, RSS Feeds, and demo mode.

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  featuredImage: string;
  date: string;
  category: string;
  author?: string;
  slug: string;
  externalUrl?: string;
}

export interface BlogConfig {
  source: 'wordpress' | 'rss' | 'demo';
  wordpressUrl?: string; // e.g., "https://yourblog.com"
  rssUrl?: string; // e.g., "https://yourblog.com/feed"
  postsPerPage?: number;
}

// WordPress API response types
interface WPPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  slug: string;
  link: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'wp:term'?: Array<Array<{ name: string }>>;
    author?: Array<{ name: string }>;
  };
}

// RSS2JSON API response types
interface RSSItem {
  title: string;
  description: string;
  content: string;
  thumbnail?: string;
  enclosure?: { link: string };
  pubDate: string;
  categories?: string[];
  author?: string;
  guid: string;
  link: string;
}

// ============================================
// DEMO POSTS (Used when no external CMS is configured)
// ============================================
const demoPosts: BlogPost[] = [
  {
    id: "1",
    title: "Los beneficios de los aceites esenciales en el cuidado de la piel",
    excerpt: "Descubre cómo los aceites esenciales pueden transformar tu rutina de skincare y proporcionar beneficios naturales para todo tipo de piel.",
    featuredImage: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
    date: "15 Enero 2026",
    category: "Skincare",
    author: "Equipo Thiers",
    slug: "beneficios-aceites-esenciales",
  },
  {
    id: "2",
    title: "Ingredientes naturales que revolucionan la cosmética",
    excerpt: "Conoce los ingredientes naturales más innovadores que están transformando la industria cosmética hacia fórmulas más puras y efectivas.",
    featuredImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop",
    date: "28 Diciembre 2025",
    category: "Ingredientes",
    author: "Equipo Thiers",
    slug: "ingredientes-naturales-cosmetica",
  },
  {
    id: "3",
    title: "Rutina de cuidado capilar para cabello saludable",
    excerpt: "Aprende los pasos esenciales para mantener un cabello fuerte, brillante y saludable con productos de alta calidad cosmética.",
    featuredImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop",
    date: "10 Diciembre 2025",
    category: "Cuidado Capilar",
    author: "Equipo Thiers",
    slug: "rutina-cuidado-capilar",
  },
  {
    id: "4",
    title: "Tendencias en cosmética natural para 2026",
    excerpt: "Las tendencias más importantes en belleza natural que definirán el próximo año: sostenibilidad, ingredientes bioactivos y formulaciones personalizadas.",
    featuredImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop",
    date: "5 Diciembre 2025",
    category: "Tendencias",
    author: "Equipo Thiers",
    slug: "tendencias-cosmetica-2026",
  },
  {
    id: "5",
    title: "Cómo elegir productos para piel sensible",
    excerpt: "Guía completa para identificar y seleccionar los mejores productos cosméticos si tienes piel sensible o reactiva.",
    featuredImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
    date: "20 Noviembre 2025",
    category: "Skincare",
    author: "Equipo Thiers",
    slug: "productos-piel-sensible",
  },
  {
    id: "6",
    title: "El poder de la vitamina C en tu rutina facial",
    excerpt: "Todo lo que necesitas saber sobre la vitamina C: beneficios, cómo usarla correctamente y qué productos elegir.",
    featuredImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    date: "15 Noviembre 2025",
    category: "Ingredientes",
    author: "Equipo Thiers",
    slug: "vitamina-c-rutina-facial",
  },
];

// ============================================
// WORDPRESS REST API INTEGRATION
// ============================================
async function fetchFromWordPress(config: BlogConfig): Promise<BlogPost[]> {
  if (!config.wordpressUrl) {
    throw new Error("WordPress URL is required");
  }

  const apiUrl = `${config.wordpressUrl}/wp-json/wp/v2/posts?_embed&per_page=${config.postsPerPage || 6}`;

  try {
    const response = await fetch(apiUrl, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const posts = await response.json();

    return posts.map((post: WPPost) => ({
      id: String(post.id),
      title: post.title.rendered,
      excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
      content: post.content.rendered,
      featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
        'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop',
      date: new Date(post.date).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'General',
      author: post._embedded?.['author']?.[0]?.name || 'Equipo Thiers',
      slug: post.slug,
      externalUrl: post.link,
    }));
  } catch (error) {
    console.error('Error fetching from WordPress:', error);
    return demoPosts; // Fallback to demo posts
  }
}

// ============================================
// RSS FEED INTEGRATION
// ============================================
async function fetchFromRSS(config: BlogConfig): Promise<BlogPost[]> {
  if (!config.rssUrl) {
    throw new Error("RSS URL is required");
  }

  try {
    // Use a CORS proxy for client-side RSS fetching
    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(config.rssUrl)}&count=${config.postsPerPage || 6}`;

    const response = await fetch(proxyUrl, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`RSS fetch error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error('Invalid RSS feed');
    }

    return data.items.map((item: RSSItem, index: number) => ({
      id: String(index),
      title: item.title,
      excerpt: item.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
      content: item.content,
      featuredImage: item.thumbnail || item.enclosure?.link ||
        'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop',
      date: new Date(item.pubDate).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      category: item.categories?.[0] || 'General',
      author: item.author || 'Equipo Thiers',
      slug: item.guid,
      externalUrl: item.link,
    }));
  } catch (error) {
    console.error('Error fetching RSS:', error);
    return demoPosts; // Fallback to demo posts
  }
}

// ============================================
// MAIN FETCH FUNCTION
// ============================================
export async function fetchBlogPosts(config: BlogConfig): Promise<BlogPost[]> {
  switch (config.source) {
    case 'wordpress':
      return fetchFromWordPress(config);
    case 'rss':
      return fetchFromRSS(config);
    case 'demo':
    default:
      return demoPosts;
  }
}

// ============================================
// CONFIGURATION
// ============================================
// To connect to your external CMS, update this configuration:
//
// OPTION 1: WordPress
// export const blogConfig: BlogConfig = {
//   source: 'wordpress',
//   wordpressUrl: 'https://your-wordpress-site.com',
//   postsPerPage: 6,
// };
//
// OPTION 2: RSS Feed (works with any blog platform)
// export const blogConfig: BlogConfig = {
//   source: 'rss',
//   rssUrl: 'https://your-blog.com/feed',
//   postsPerPage: 6,
// };
//
// OPTION 3: Demo mode (current)
export const blogConfig: BlogConfig = {
  source: 'demo',
  postsPerPage: 6,
};
