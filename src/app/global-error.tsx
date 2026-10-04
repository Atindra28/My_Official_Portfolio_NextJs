"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#141311", color: "#f4f1ea", fontFamily: "Georgia, serif" }}>
        <main style={{ maxWidth: 640, margin: "0 auto", padding: "96px 24px" }}>
          <p style={{ letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "ui-monospace, monospace", fontSize: 12 }}>
            Error
          </p>
          <h1 style={{ fontSize: 40, fontWeight: 400, marginTop: 12 }}>This view failed to load.</h1>
          <p style={{ color: "#b7b1a6", lineHeight: 1.6 }}>
            Something unexpected stopped the page. Try again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: 24,
              background: "#e4c9a4",
              color: "#1c1915",
              border: 0,
              padding: "12px 18px",
              fontSize: 14,
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
