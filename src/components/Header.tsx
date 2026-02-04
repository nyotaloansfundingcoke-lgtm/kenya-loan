import { Banknote } from "lucide-react";

export function Header() {
  return (
    <header className="w-full py-4 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl gradient-primary">
            <Banknote className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-foreground">
            Kenyan Loans <span className="text-primary">ChapChap</span>
          </h1>
        </div>
      </div>
    </header>
  );
}
