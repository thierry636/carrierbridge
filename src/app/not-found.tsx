import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="fr">
      <body
        style={{
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          color: "#0f172a",
          background: "#fff",
        }}
      >
        <div style={{ textAlign: "center", padding: "0 24px" }}>
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#2563eb",
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            404
          </p>
          <h1 style={{ fontSize: 36, margin: 0 }}>Page introuvable</h1>
          <p style={{ marginTop: 12, color: "#475569" }}>
            La page que vous cherchez n&apos;existe pas.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              marginTop: 24,
              padding: "10px 18px",
              background: "#2563eb",
              color: "#fff",
              borderRadius: 8,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </body>
    </html>
  );
}
