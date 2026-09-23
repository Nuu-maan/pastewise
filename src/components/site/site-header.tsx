import { Badge } from "@/components/ui/badge";

export function SiteHeader({ online }: { online: boolean }) {
  return (
    <header className="flex items-center justify-between py-6">
      <span className="flex items-center gap-2 font-medium tracking-tight">
        <span className="grid size-5 place-items-center rounded-md bg-foreground font-mono text-[10px] text-background">
          {"{}"}
        </span>
        pastewise
      </span>
      <Badge variant="outline" className="gap-1.5 font-normal text-muted-foreground">
        <span className={online ? "size-1.5 rounded-full bg-emerald-500" : "size-1.5 rounded-full bg-amber-500"} />
        {online ? "Powered by Jev" : "Offline mode"}
      </Badge>
    </header>
  );
}
