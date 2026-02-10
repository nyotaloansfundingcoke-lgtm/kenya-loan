import { CheckCircle, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LoanOption, UserData } from "@/types/loan";

interface PaymentSuccessProps {
  userData: UserData;
  selectedLoan: LoanOption;
  onStartOver: () => void;
}

export function PaymentSuccess({
  userData,
  selectedLoan,
  onStartOver,
}: PaymentSuccessProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE").format(amount);
  };

  const getFirstName = (fullName: string) => {
    return fullName.split(" ")[0];
  };

  return (
    <div className="w-full max-w-md mx-auto text-center animate-fade-in-up">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success-light flex items-center justify-center">
        <CheckCircle className="w-10 h-10 text-primary" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">
        Payment Initiated!
      </h2>

      <p className="text-muted-foreground mb-6">
        {getFirstName(userData.fullName)}, we've sent an M-Pesa request to your phone.
      </p>

      <div className="bg-card rounded-xl border border-border p-6 mb-6 text-left space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Loan Amount</span>
          <span className="font-bold text-foreground">
            Ksh {formatCurrency(selectedLoan.amount)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Transaction Fee</span>
          <span className="font-medium text-primary">
            Ksh {formatCurrency(selectedLoan.fee)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Phone Number</span>
          <span className="font-medium text-foreground">
            {userData.phoneNumber}
          </span>
        </div>
        <hr className="border-border" />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Repayment Term</span>
          <span className="font-medium text-foreground">2 months</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Interest Rate</span>
          <span className="font-medium text-foreground">10%</span>
        </div>
      </div>

      <div className="bg-warning-light rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">
              Complete the M-Pesa payment
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your M-Pesa PIN when prompted. Your loan will be disbursed within 5 minutes after confirmation.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-info-light rounded-xl p-4 mb-8">
        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">
              Didn't receive the prompt?
            </p>
            
          </div>
        </div>
      </div>

      <Button
        onClick={onStartOver}
        variant="outline"
        className="w-full h-12"
      >
        Apply for Another Loan
      </Button>
    </div>
  );
}
