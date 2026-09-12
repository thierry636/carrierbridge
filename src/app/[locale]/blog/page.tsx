import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";

function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}

/**
 * The listing is ready for posts but there are none yet. Articles will slot in
 * here as a `posts` array; until then the page routes readers to the free tool
 * rather than showing an empty shell.
 */
const posts: { slug: string; title: string; excerpt: string; date: string }[] = [];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "blog.meta" });
  return pageMetadata({
    locale,
    pathname: "/blog",
    title: t("title"),
    description: t("description"),
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <div className="py-14 lg:py-20">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
            {t("h1")}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-600">{t("lede")}</p>
        </div>

        {posts.length === 0 ? (
          <div className="mt-12 max-w-2xl rounded-xl border border-ink-200 bg-ink-50 p-8">
            <h2 className="text-lg font-semibold text-ink-900">{t("empty.title")}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">{t("empty.text")}</p>
            <Link
              href="/outils/indexation-gazole"
              className={`${buttonVariants({ size: "md" })} mt-6`}
            >
              {t("empty.cta")} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        ) : (
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug} className="rounded-xl border border-ink-200 bg-white p-6">
                <h2 className="text-base font-semibold text-ink-900">{post.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{post.excerpt}</p>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
}
