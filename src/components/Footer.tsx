import { FileText, Users } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-6 mt-auto border-t border-border bg-card">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <span>No paperwork required.</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span>No guarantors needed.</span>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Kenyan Loans ChapChap. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
