import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  return (
    <section className="bg-white py-32">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl">
          Page introuvable
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink-600">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="mt-8">
          <Link href="/">
            <Button>Retour à l&apos;accueil</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
