import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoriesTabBar from '@/components/CategoriesTabBar';
import { getPosts } from '@/sanity/client';
import type { Metadata } from 'next';

export const revalidate = 60; // Revalidate every minute to show new posts quickly

export const metadata: Metadata = {
  title: 'Travel Inspiration & Journal | Vietnam Tour',
  description: 'Discover expert guides, destination diaries, and luxury travel inspiration for your bespoke journey to Vietnam.',
};

export default async function InspirationPage() {
  const posts = await getPosts();

  // Sort posts just in case or use them directly (already ordered by publishedAt desc in client)
  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-luxury-slate text-luxury-linen">
        
        {/* Scenic Hero Banner */}
        <section className="relative h-[250px] sm:h-[300px] w-full flex items-center justify-center overflow-hidden">
          <Image
            src="/images/vietnamtour_cave_dining.png"
            alt="Travel Inspiration Header"
            fill
            className="object-cover brightness-[0.5]"
            priority
          />
          <div className="absolute inset-0 bg-[#121816]/25" />
          
          <div className="relative z-10 text-center px-6 pt-24 sm:pt-32">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-medium leading-tight tracking-wide">
              Inspiration & Insights
            </h1>
            
            {/* Breadcrumbs */}
            <div className="mt-3 flex items-center justify-center space-x-2 text-[11px] uppercase tracking-widest text-[#c5a880] font-semibold">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/40">&gt;</span>
              <span className="text-white/80">Inspiration</span>
            </div>
          </div>
        </section>

        {/* Categories Tab Bar */}
        <CategoriesTabBar activeTab="guides" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 space-y-20">
          
          {/* Header Section */}
          <div className="space-y-4 max-w-3xl animate-fade-in">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-luxury-gold block">
              Travel Journal
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl text-luxury-linen font-medium leading-tight">
              Inspiration & Insights
            </h1>
            <p className="text-base sm:text-lg text-luxury-linen/70 font-light leading-relaxed max-w-2xl">
              Immerse yourself in our collection of articles, travel diaries, and expert recommendations curated by our destination specialists.
            </p>
            <div className="h-[1px] w-24 bg-gradient-to-r from-luxury-gold to-transparent pt-0.5 mt-6" />
          </div>

          {/* Featured Post (Big Banner Style) */}
          {featuredPost && (
            <div className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-luxury-moss/30 border border-luxury-moss/50 p-6 sm:p-8 rounded-sm animate-fade-in hover:border-luxury-gold/20 transition-all duration-500">
              <div className="lg:col-span-7 relative h-72 sm:h-96 md:h-[450px] overflow-hidden rounded-sm">
                {featuredPost.mainImage ? (
                  <Image
                    src={featuredPost.mainImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-luxury-moss" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-slate/60 to-transparent pointer-events-none" />
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-luxury-gold block">
                    Featured Story
                  </span>
                  {featuredPost.publishedAt && (
                    <span className="text-xs text-luxury-linen/40 font-light block">
                      {new Date(featuredPost.publishedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                </div>

                <h2 className="font-serif text-2xl sm:text-4xl text-luxury-linen group-hover:text-luxury-gold transition-colors font-medium leading-tight">
                  <Link href={`/inspiration/${featuredPost.slug?.current || ''}`}>
                    {featuredPost.title}
                  </Link>
                </h2>

                {featuredPost.excerpt && (
                  <p className="text-sm sm:text-base text-luxury-linen/70 font-light leading-relaxed line-clamp-4">
                    {featuredPost.excerpt}
                  </p>
                )}

                <div className="pt-4">
                  <Link
                    href={`/inspiration/${featuredPost.slug?.current || ''}`}
                    className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-luxury-gold group-hover:underline"
                  >
                    <span>Read Full Article</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Grid of Other Posts */}
          {gridPosts.length > 0 && (
            <div className="space-y-12">
              <h3 className="font-serif text-xl sm:text-2xl text-luxury-gold font-light tracking-wide border-b border-luxury-moss/50 pb-4">
                Latest Articles
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {gridPosts.map((post, idx) => (
                  <article key={post._id} className="group flex flex-col space-y-5">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden rounded-sm bg-luxury-moss border border-luxury-moss/30">
                      {post.mainImage ? (
                        <Image
                          src={post.mainImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-luxury-moss" />
                      )}
                    </div>

                    {/* Metadata & Title */}
                    <div className="space-y-3 flex-grow flex flex-col justify-between">
                      <div className="space-y-2">
                        {post.publishedAt && (
                          <span className="text-[10px] text-luxury-linen/50 uppercase tracking-wider block font-light">
                            {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </span>
                        )}
                        <h4 className="font-serif text-lg sm:text-xl text-luxury-linen group-hover:text-luxury-gold transition-colors font-medium leading-snug">
                          <Link href={`/inspiration/${post.slug?.current || ''}`}>
                            {post.title}
                          </Link>
                        </h4>
                        {post.excerpt && (
                          <p className="text-xs sm:text-sm text-luxury-linen/60 font-light leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}
                      </div>

                      <div className="pt-4">
                        <Link
                          href={`/inspiration/${post.slug?.current || ''}`}
                          className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-semibold text-luxury-gold group-hover:underline"
                        >
                          <span>Read Article</span>
                          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="text-center py-20 bg-luxury-moss/10 border border-dashed border-luxury-moss/50 rounded-sm space-y-4">
              <svg 
                className="w-12 h-12 mx-auto text-luxury-gold/50"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <h3 className="font-serif text-xl text-luxury-linen font-medium">No Journal Entries Found</h3>
              <p className="text-sm text-luxury-linen/60 font-light max-w-sm mx-auto">
                We are currently crafting new travel diaries and expert guides. Please check back soon.
              </p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
