import { Container } from "@/components/layout/container";

export default function Loading() {
  return (
    <Container className="py-16 sm:py-24" aria-busy="true" aria-live="polite">
      <p className="sr-only">Loading page</p>
      <div className="h-3 w-28 bg-muted" />
      <div className="mt-5 h-12 max-w-xl bg-muted" />
      <div className="mt-4 h-4 max-w-lg bg-muted" />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="h-64 border border-border bg-card" />
        <div className="h-64 border border-border bg-card" />
        <div className="hidden h-64 border border-border bg-card lg:block" />
      </div>
    </Container>
  );
}
