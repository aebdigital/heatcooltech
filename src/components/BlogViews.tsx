import { blogPost } from "@/src/data/site";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function BlogPostPage() {
  return (
    <>
      <Header />
      <main className="bg-white px-5 py-14 md:px-8 lg:px-14 lg:py-20">
        <article className="mx-auto max-w-3xl">
          <h1 className="mb-4 font-display text-5xl font-bold text-[#f0425c]">{blogPost.title}</h1>
          <p className="mb-8 text-lg text-neutral-500">{blogPost.author}</p>
          <p className="mb-12 text-xl leading-8">{blogPost.content}</p>

          <h2 className="mb-4 font-display text-3xl font-semibold">1 komentár</h2>
          <div className="border-l-4 border-[#f0425c] bg-neutral-100 p-5">
            <h5 className="font-semibold">{blogPost.commentAuthor}</h5>
            <p className="mt-2 leading-7">{blogPost.comment}</p>
          </div>

          <h2 className="mt-12 font-display text-3xl font-semibold">Zanechajte svoj komentár (Zrušiť odpoveď)</h2>
        </article>
      </main>
      <Footer />
    </>
  );
}

export function CategoryPage() {
  return (
    <>
      <Header />
      <main className="bg-white px-5 py-14 md:px-8 lg:px-14 lg:py-20">
        <section className="mx-auto max-w-4xl">
          <h1 className="mb-8 font-display text-5xl font-bold text-[#f0425c]">Kategória: Nezaradené</h1>
          <article className="border-b border-neutral-200 pb-8">
            <h3 className="font-display text-3xl font-semibold">{blogPost.title}</h3>
            <p className="mt-1 text-neutral-500">{blogPost.date}</p>
            <p className="mt-5 text-lg leading-8">{blogPost.content}</p>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
