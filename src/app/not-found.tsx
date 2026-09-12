import Link from "next/link";

/**
 * Root-level 404 for paths that never reach the locale segment, so it cannot
 * rely on next-intl messages.
 */
export default function NotFound() {
  return (
    <html lang="fr">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: "4rem 1.5rem" }}>
        <main style={{ maxWidth: "36rem", margin: "0 auto" }}>
          <p style={{ color: "#2563eb", fontWeight: 600, fontSize: "0.875rem" }}>404</p>
          <h1 style={{ fontSize: "1.875rem", lineHeight: 1.2, margin: "0.75rem 0 0" }}>
            Cette page n’existe pas
          </h1>
          <p style={{ color: "#475569", marginTop: "1rem" }}>
            Le lien que vous avez suivi est peut-être obsolète, ou l’adresse comporte une erreur.
          </p>
          <p style={{ marginTop: "2rem" }}>
            <Link href="/" style={{ color: "#2563eb", fontWeight: 600 }}>
              Retour à l’accueil
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
