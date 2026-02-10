import { Banknote } from "lucide-react";

export function Header() {
  return (
    <header className="w-full py-4 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-center gap-2">
          
          <h1 className="text-xl sm:text-2xl font-display font-bold text-foreground">
            Kenyan Loans <span className="text-primary">ChapChap</span>
          </h1>
        </div>
      </div>
    </header>
  );
}
