import { PasteWorkspace } from "@/components/paste/paste-workspace";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { hasJevKey } from "@/lib/jev/client";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col px-4">
      <SiteHeader online={hasJevKey()} />
      <section className="py-10 text-center sm:py-14">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Paste anything. Get the right tool.
        </h1>
        <p className="mt-4 text-muted-foreground text-balance">
          JSON, JWTs, cron, stack traces, colors, timestamps. Close the twelve tabs.
        </p>
      </section>
      <PasteWorkspace />
      <div className="flex-1" />
      <SiteFooter />
    </main>
  );
}
