import { Check } from "lucide-react";
import type { OnboardingStep } from "../../types/onboarding";

interface OnboardingProgressProps {
  steps: OnboardingStep[];
  currentStepIndex: number;
}

const STEP_LABELS: Record<OnboardingStep, string> = {
  "identify-provider": "Identify Provider",
  "practice-type": "Practice Type",
  "specialty": "Specialty",
  "business-profile": "Business Profile",
  "licenses": "Licenses",
  "required-docs": "Required Documents",
  "payers": "Payers",
  "portal-logins": "Portal Logins",
};

export function OnboardingProgress({ steps, currentStepIndex }: OnboardingProgressProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isUpcoming = index > currentStepIndex;

          return (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : isCurrent
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={`text-xs font-medium max-w-20 ${
                      isCompleted || isCurrent ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {STEP_LABELS[step]}
                  </p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 ${
                    isCompleted ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
