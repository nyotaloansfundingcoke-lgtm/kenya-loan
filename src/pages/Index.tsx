import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StepIndicator } from "@/components/StepIndicator";
import { TrustBadges } from "@/components/TrustBadges";
import { EligibilityForm } from "@/components/EligibilityForm";
import { LoanSelection } from "@/components/LoanSelection";
import { PaymentSuccess } from "@/components/PaymentSuccess";
import type { UserData, LoanOption } from "@/types/loan";

type Step = 1 | 2 | 3;

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedLoan, setSelectedLoan] = useState<LoanOption | null>(null);

  const handleEligibilitySubmit = (data: UserData) => {
    setUserData(data);
    setCurrentStep(2);
  };

  const handlePaymentInitiated = (loan: LoanOption, _transactionId: string) => {
    setSelectedLoan(loan);
    setCurrentStep(3);
  };

  const handleStartOver = () => {
    setCurrentStep(1);
    setUserData(null);
    setSelectedLoan(null);
  };

  return (
    <div className="min-h-screen flex flex-col gradient-hero">
      <Header />
      
      <main className="flex-1 container py-6 sm:py-10">
        <StepIndicator currentStep={currentStep} />
        
        <div className="mt-6 sm:mt-10">
          {currentStep === 1 && (
            <>
              <EligibilityForm onSubmit={handleEligibilitySubmit} />
              <div className="mt-8">
                <TrustBadges />
              </div>
            </>
          )}

          {currentStep === 2 && userData && (
            <LoanSelection
              userData={userData}
              onPaymentInitiated={handlePaymentInitiated}
            />
          )}

          {currentStep === 3 && userData && selectedLoan && (
            <PaymentSuccess
              userData={userData}
              selectedLoan={selectedLoan}
              onStartOver={handleStartOver}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
