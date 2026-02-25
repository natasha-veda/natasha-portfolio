'use client'

import Link from 'next/link'

const posts = [
  {
    slug: 'hello-world',
    title: 'Hello World: My First Blog Post',
    date: 'February 25, 2026',
    excerpt: 'This is my first blog post on my portfolio website...'
  },
]

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-light">◈</span>
            <span className="font-medium text-lg">Natasha</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#about" className="text-sm text-white/50 hover:text-white transition-colors">About</Link>
            <Link href="/#stack" className="text-sm text-white/50 hover:text-white transition-colors">Stack</Link>
            <Link href="/#projects" className="text-sm text-white/50 hover:text-white transition-colors">Projects</Link>
            <Link href="/blog" className="text-sm text-white hover transition-colors">Blog</Link>
            <Link href="/#contact" className="text-sm text-white/50 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Blog</h1>
          <p className="text-white/40 mb-12">Thoughts on code & creativity</p>
          
          <div className="space-y-4">
            {posts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="block p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
              >
                <p className="text-xs text-white/40 mb-2">{post.date}</p>
                <h2 className="font-medium text-lg mb-2">{post.title}</h2>
                <p className="text-white/50 text-sm">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-10">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <p className="text-white/30 text-sm">© 2026 Natasha</p>
        </div>
      </footer>
    </div>
  )
}
