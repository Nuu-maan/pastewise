import { PasteWorkspace } from "@/components/paste/paste-workspace";
import { GithubStars } from "@/components/site/github-stars";
import { MadeBy } from "@/components/site/made-by";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center px-4 pt-[20vh] pb-16">
      <h1 className="sr-only">pastewise: paste anything, get the right tool</h1>
      <GithubStars repo="Nuu-maan/pastewise" />
      <PasteWorkspace />
      <MadeBy />
    </main>
  );
}
