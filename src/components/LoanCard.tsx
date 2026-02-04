import { Check } from "lucide-react";
import type { LoanOption } from "@/types/loan";

interface LoanCardProps {
  option: LoanOption;
  isSelected: boolean;
  onSelect: () => void;
}

export function LoanCard({ option, isSelected, onSelect }: LoanCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE").format(amount);
  };

  return (
    <button
      onClick={onSelect}
      className={`loan-card w-full text-left ${isSelected ? "selected" : ""}`}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <Check className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      <div className="space-y-1">
        <p className="text-lg sm:text-xl font-bold text-foreground">
          Ksh {formatCurrency(option.amount)}
        </p>
        <p className="text-sm text-muted-foreground">
          Fee: <span className="font-medium text-primary">Ksh {formatCurrency(option.fee)}</span>
        </p>
      </div>
    </button>
  );
}
