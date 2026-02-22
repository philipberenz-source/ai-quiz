import { Brain } from "lucide-react";
import { Separator } from "./ui/separator";

function Footer() {
  return (
    <footer className="mt-14 border-t border-border/70 bg-background/70 backdrop-blur-sm">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-primary/15 p-2 text-primary transition-colors hover:bg-primary/20">
              <Brain className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold tracking-wide text-foreground sm:text-base">AI Trivia</span>
          </div>

          <nav aria-label="Footer links" className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="/terms" className="transition-colors duration-200 hover:text-foreground">
              Terms
            </a>
            <a href="/help" className="transition-colors duration-200 hover:text-foreground">
              Help
            </a>
            <a href="mailto:philipberenz@gmail.com" className="transition-colors duration-200 hover:text-foreground">
              Contact
            </a>
          </nav>
        </div>

        <Separator className="my-5" />

        <p className="text-center text-xs text-muted-foreground">© 2026 AI Trivia. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
