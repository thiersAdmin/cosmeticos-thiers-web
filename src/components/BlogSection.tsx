"use client";

import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fetchBlogPosts, blogConfig, type BlogPost } from "@/lib/blog-api";

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: postsRef, isVisible: postsVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation<HTMLDivElement>();

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      const fetchedPosts = await fetchBlogPosts(blogConfig);
      setPosts(fetchedPosts);
      setLoading(false);
    }
    loadPosts();
  }, []);

  const categories = ["all", ...new Set(posts.map((post) => post.category))];
  const filteredPosts = selectedCategory === "all"
    ? posts
    : posts.filter((post) => post.category === selectedCategory);

  return (
    <section id="blog" className="py-16 md:py-24 bg-gradient-to-b from-[#C2185B] via-[#AD1457] to-[#880E4F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div ref={headerRef} className={`text-center mb-12 md:mb-16 scroll-blur-in ${headerVisible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-[#F48FB1]" />
            <span className="text-[#F48FB1] text-xs font-semibold tracking-[0.3em] uppercase">
              Nuestro Blog
            </span>
            <span className="w-8 h-px bg-[#F48FB1]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-wide mb-4">
            Belleza y Bienestar
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Descubre consejos, tendencias y conocimientos sobre el cuidado de la piel,
            ingredientes naturales y el arte de la cosmética profesional.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-white text-[#C2185B]"
                    : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                }`}
              >
                {category === "all" ? "Todos" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div ref={postsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-white/5" />
                <div className="p-6">
                  <div className="h-4 bg-white/10 rounded mb-3 w-20" />
                  <div className="h-6 bg-white/10 rounded mb-2" />
                  <div className="h-4 bg-white/10 rounded mb-1" />
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                </div>
              </div>
            ))
          ) : (
            filteredPosts.map((post, index) => (
              <article
                key={post.id}
                className={`group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#F48FB1]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#F48FB1]/20 cursor-pointer scroll-slide-up stagger-long-${(index % 6) + 1} ${postsVisible ? 'visible' : ''}`}
                onClick={() => {
                  if (post.externalUrl) {
                    window.open(post.externalUrl, '_blank', 'noopener,noreferrer');
                  }
                }}
              >
                {/* Featured Image */}
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#880E4F]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-[#C2185B] text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-lg">
                      {post.category}
                    </span>
                  </div>

                  {/* Read More Overlay */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <div className="bg-white text-[#C2185B] px-4 py-2 rounded-full text-xs font-bold tracking-wide flex items-center gap-2 shadow-lg">
                      Leer más
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  {/* Date */}
                  <div className="flex items-center gap-2 mb-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#F48FB1]">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                    <time className="text-[#F48FB1] text-xs font-medium tracking-wide">
                      {post.date}
                    </time>
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-lg font-medium leading-snug mb-3 line-clamp-2 group-hover:text-[#F48FB1] transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Author (if available) */}
                  {post.author && (
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                      <div className="w-8 h-8 rounded-full bg-[#F48FB1]/30 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#F48FB1]">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <span className="text-white/50 text-xs font-medium">
                        {post.author}
                      </span>
                    </div>
                  )}
                </div>
              </article>
            ))
          )}
        </div>

        {/* CTA Section */}
        <div ref={ctaRef} className={`mt-12 md:mt-16 text-center scroll-scale ${ctaVisible ? 'visible' : ''}`}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <p className="text-white/60 text-sm">
              ¿Te interesa nuestro contenido?
            </p>
            <a
              href="https://cosmeticosthiers.myshopify.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-white hover:bg-[#F48FB1] text-[#C2185B] hover:text-white px-6 py-3 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Visita nuestra tienda
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform duration-300">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute left-0 top-1/4 w-64 h-64 bg-[#F48FB1]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
