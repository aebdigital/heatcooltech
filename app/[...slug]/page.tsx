import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostPage, CategoryPage } from "@/src/components/BlogViews";
import { ContentPage } from "@/src/components/ContentPage";
import { HomePage } from "@/src/components/HomePage";
import { blogPost, getPage, getPagePath, pages, site } from "@/src/data/site";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

function slugFromSegments(segments: string[]) {
  return segments.join("/");
}

export function generateStaticParams() {
  return [
    ...pages.map((page) => ({ slug: [page.slug] })),
    { slug: ["ahoj-svet"] },
    { slug: ["category", "nezaradene"] },
    { slug: ["template", "head"] },
    { slug: ["template", "foot"] },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = slugFromSegments((await params).slug);

  if (slug === "ahoj-svet") {
    return {
      title: blogPost.title,
      description: blogPost.description,
      alternates: { canonical: `/${blogPost.slug}/` },
    };
  }

  if (slug === "category/nezaradene") {
    return {
      title: "Nezaradené",
      description: "Archív kategórie Nezaradené importovaný z pôvodného WordPress webu.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  if (slug === "template/head" || slug === "template/foot") {
    return {
      title: "Heatcooltech s.r.o. - montáž, klimatizácie, tepelné čerpadlá",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const page = getPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.browserTitle ?? page.title,
    description: page.description,
    alternates: {
      canonical: getPagePath(page.slug),
    },
    openGraph: {
      title: page.browserTitle ?? page.title,
      description: page.description,
      url: `${site.source}${getPagePath(page.slug)}`,
      images: [{ url: page.dotacieImage?.src ?? page.gallery?.[0]?.src ?? site.socialImage, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.browserTitle ?? page.title,
      description: page.description,
      images: [page.dotacieImage?.src ?? page.gallery?.[0]?.src ?? site.socialImage],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const slug = slugFromSegments((await params).slug);

  if (slug === "ahoj-svet") {
    return <BlogPostPage />;
  }

  if (slug === "category/nezaradene") {
    return <CategoryPage />;
  }

  if (slug === "template/head" || slug === "template/foot") {
    return <HomePage />;
  }

  const page = getPage(slug);

  if (!page) {
    notFound();
  }

  return <ContentPage page={page} />;
}
