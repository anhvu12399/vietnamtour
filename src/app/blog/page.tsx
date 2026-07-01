import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoriesTabBar from '@/components/CategoriesTabBar';
import { getBlogPostsFromSanity } from '@/sanity/client';

export const metadata: Metadata = {
  title: 'Travel Blog | Insider Tips & Guides for Vietnam | Vietnam Tour',
  description: 'Read the latest travel stories, tips, and hidden gems from our local Vietnam specialists. Plan your perfect journey with our insider blog.',
  alternates: {
    canonical: 'https://www.vietnamtours.co.uk/blog',
  },
};

const categoryColors: Record<string, string> = {
  'Travel Tips':          'bg-blue-900/30 text-blue-300/90 border-blue-700/30',
  'Culture & History':    'bg-amber-900/30 text-luxury-gold border-amber-700/30',
  'Food & Drink':         'bg-orange-900/30 text-orange-300/90 border-orange-700/30',
  'Adventure':            'bg-green-900/30 text-green-300/90 border-green-700/30',
  'Planning & Logistics': 'bg-teal-900/30 text-teal-300/90 border-teal-700/30',
  'News & Updates':       'bg-pink-900/30 text-pink-300/90 border-pink-700/30',
};

function getCategoryColor(cat: string) {
  return categoryColors[cat] || 'bg-[#faf8f5] text-[#343434] border-[#e6e2d6]';
}

export default async function BlogListingPage() {
  const posts = await getBlogPostsFromSanity();
  
  // If no posts yet, we show a graceful empty state
  const featuredPost = posts.length > 0 ? posts[0] : null;
  const standardPosts = posts.length > 1 ? posts.slice(1) : [];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#faf8f5] text-[#343434]">
        {/* ── Hero Header ── */}
        <section className="pt-32 pb-16 px-6 lg:px-12 bg-luxury-slate relative border-b border-[#e6e2d6]">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-normal tracking-tight text-white mb-6">
              Vietnam Travel <i className="text-luxury-gold">Journal</i>
            </h1>
            <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto">
              Insider tips, hidden gems, and travel stories crafted by our local specialists to help you plan the perfect journey.
            </p>
          </div>
        </section>

        {/* Categories Tab Bar placeholder (using standard component, assuming you want it here) */}
        <div id="details">
          <CategoriesTabBar activeTab="guides" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          
          {posts.length === 0 ? (
            <div className="text-center py-24 border border-[#e6e2d6] rounded-xl bg-white/5">
              <h2 className="text-2xl font-playfair text-white mb-3">No articles yet</h2>
              <p className="text-white/60">Our specialists are currently writing new travel stories. Check back soon!</p>
            </div>
          ) : (
            <>
              {/* ── Featured Post ── */}
              {featuredPost && (
                <section className="mb-20">
                  <h2 className="text-sm tracking-[0.2em] text-luxury-gold font-bold uppercase mb-8 flex items-center gap-4">
                    <span>Featured Article</span>
                    <span className="h-[1px] flex-1 bg-gradient-to-r from-luxury-gold/50 to-transparent"></span>
                  </h2>
                  
                  <Link href={`/blog/${featuredPost.slug.current}`} className="group block relative rounded-2xl overflow-hidden bg-[#18201d] border border-[#e6e2d6] hover:border-[#e6e2d6] transition-all duration-500 shadow-2xl">
                    <div className="flex flex-col lg:flex-row">
                      {/* Image side */}
                      <div className="relative h-[300px] lg:h-[500px] lg:w-[60%] overflow-hidden">
                        {featuredPost.featuredImage ? (
                          <Image
                            src={featuredPost.featuredImage}
                            alt={featuredPost.imageAlt || featuredPost.title}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-white/5" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-luxury-slate/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#18201d]/90" />
                        
                        <div className="absolute top-6 left-6 flex gap-2">
                          <span className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 border rounded-full backdrop-blur-md ${getCategoryColor(featuredPost.category)}`}>
                            {featuredPost.category}
                          </span>
                        </div>
                      </div>

                      {/* Content side */}
                      <div className="lg:w-[40%] p-8 lg:p-12 flex flex-col justify-center relative">
                        <div className="text-xs text-white/40 tracking-wider uppercase mb-4 flex items-center gap-3">
                          {featuredPost.publishedAt && (
                            <time dateTime={featuredPost.publishedAt}>
                              {new Date(featuredPost.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </time>
                          )}
                          {featuredPost.author && (
                            <>
                              <span>•</span>
                              <span className="text-white/60">By {featuredPost.author.name}</span>
                            </>
                          )}
                        </div>

                        <h3 className="text-2xl lg:text-4xl font-playfair text-white mb-6 leading-tight group-hover:text-luxury-gold transition-colors">
                          {featuredPost.title}
                        </h3>

                        <p className="text-white/60 leading-relaxed mb-8 text-sm lg:text-base">
                          {featuredPost.excerpt}
                        </p>

                        <div className="flex items-center gap-3 text-luxury-gold font-medium tracking-wide uppercase text-xs mt-auto">
                          <span>Read Full Story</span>
                          <span className="transform transition-transform group-hover:translate-x-2">→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </section>
              )}

              {/* ── Standard Posts Grid ── */}
              {standardPosts.length > 0 && (
                <section>
                  <h2 className="text-sm tracking-[0.2em] text-luxury-gold font-bold uppercase mb-8 flex items-center gap-4">
                    <span>Latest Articles</span>
                    <span className="h-[1px] flex-1 bg-gradient-to-r from-luxury-gold/50 to-transparent"></span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {standardPosts.map((post: any) => (
                      <Link key={post._id} href={`/blog/${post.slug.current}`} className="group flex flex-col bg-[#18201d] border border-[#e6e2d6] rounded-2xl overflow-hidden hover:border-[#e6e2d6] transition-all duration-500 hover:-translate-y-1 shadow-xl">
                        
                        {/* Card Image */}
                        <div className="relative h-[240px] overflow-hidden">
                          {post.featuredImage ? (
                            <Image
                              src={post.featuredImage}
                              alt={post.imageAlt || post.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-white/5" />
                          )}
                          <div className="absolute top-4 left-4">
                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 border rounded-sm backdrop-blur-md ${getCategoryColor(post.category)}`}>
                              {post.category}
                            </span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-6 flex flex-col flex-1">
                          <div className="text-xs text-white/40 tracking-wider uppercase mb-3 flex items-center justify-between">
                            {post.publishedAt && (
                              <time dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </time>
                            )}
                          </div>

                          <h3 className="text-xl font-playfair text-white mb-3 leading-snug group-hover:text-luxury-gold transition-colors line-clamp-3">
                            {post.title}
                          </h3>

                          <p className="text-sm text-white/50 leading-relaxed mb-6 line-clamp-3 flex-1">
                            {post.excerpt}
                          </p>

                          {post.author && (
                            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[#e6e2d6]">
                              {post.author.avatar ? (
                                <Image
                                  src={post.author.avatar}
                                  alt={post.author.name}
                                  width={24}
                                  height={24}
                                  className="rounded-full"
                                />
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-white/10" />
                              )}
                              <span className="text-xs text-white/60">{post.author.name}</span>
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
