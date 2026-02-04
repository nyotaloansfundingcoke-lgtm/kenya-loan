import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "Check" },
  { number: 2, label: "Select" },
  { number: 3, label: "Get Cash" },
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 py-6">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`step-indicator ${
                currentStep > step.number
                  ? "completed"
                  : currentStep === step.number
                  ? "active"
                  : "pending"
              }`}
            >
              {currentStep > step.number ? (
                <Check className="w-4 h-4" />
              ) : (
                step.number
              )}
            </div>
            <span
              className={`mt-1.5 text-xs sm:text-sm font-medium ${
                currentStep >= step.number
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-8 sm:w-16 h-0.5 mx-2 sm:mx-3 ${
                currentStep > step.number ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
