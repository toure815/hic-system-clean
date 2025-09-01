import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useBackend } from "../hooks/useBackend";
import { useToast } from "@/components/ui/use-toast";
import { OnboardingSteps } from "../components/onboarding/OnboardingSteps";
import { OnboardingProgress } from "../components/onboarding/OnboardingProgress";
import type { OnboardingStepData, OnboardingStep } from "../types/onboarding";

const STEPS: OnboardingStep[] = [
  "identify-provider",
  "practice-type",
  "specialty", 
  "licenses",
  "required-docs",
  "payers",
  "portal-logins"
];

export function OnboardingStartPage() {
  const backend = useBackend();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepData, setStepData] = useState<OnboardingStepData>({});

  // Load existing draft
  const { data: draftResponse } = useQuery({
    queryKey: ["onboarding-draft"],
    queryFn: () => backend.onboarding.getDraft(),
  });

  // Initialize state from draft
  useEffect(() => {
    const draft = draftResponse?.draft;
    if (draft) {
      setStepData(draft.stepData);
      const stepIndex = STEPS.indexOf(draft.currentStep);
      if (stepIndex >= 0) {
        setCurrentStepIndex(stepIndex);
      }
    }
  }, [draftResponse]);

  // Save draft mutation
  const saveDraftMutation = useMutation({
    mutationFn: (data: { stepData: OnboardingStepData; currentStep: OnboardingStep }) =>
      backend.onboarding.saveDraft(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["onboarding-draft"] });
    },
    onError: (error: any) => {
      console.error("Save draft error:", error);
      toast({
        title: "Error saving progress",
        description: error.message || "Failed to save your progress",
        variant: "destructive",
      });
    },
  });

  // Complete onboarding mutation
  const completeOnboardingMutation = useMutation({
    mutationFn: (finalStepData: OnboardingStepData) =>
      backend.onboarding.completeOnboarding({ finalStepData }),
    onSuccess: () => {
      toast({
        title: "Onboarding complete!",
        description: "Your credentialing application has been submitted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["onboarding-draft"] });
    },
    onError: (error: any) => {
      console.error("Complete onboarding error:", error);
      toast({
        title: "Error completing onboarding",
        description: error.message || "Failed to complete the onboarding process",
        variant: "destructive",
      });
    },
  });

  const handleStepChange = (newStepData: Partial<OnboardingStepData>) => {
    const updatedStepData = { ...stepData, ...newStepData };
    setStepData(updatedStepData);
    
    // Auto-save draft
    saveDraftMutation.mutate({
      stepData: updatedStepData,
      currentStep: STEPS[currentStepIndex],
    });
  };

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      
      // Save with next step
      saveDraftMutation.mutate({
        stepData,
        currentStep: STEPS[nextIndex],
      });
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      
      // Save with previous step
      saveDraftMutation.mutate({
        stepData,
        currentStep: STEPS[prevIndex],
      });
    }
  };

  const handleComplete = () => {
    completeOnboardingMutation.mutate(stepData);
  };

  const currentStep = STEPS[currentStepIndex];
  const isLastStep = currentStepIndex === STEPS.length - 1;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Provider Credentialing</h1>
        <p className="text-gray-600 mt-1">
          Complete your credentialing application step by step
        </p>
      </div>

      <OnboardingProgress 
        steps={STEPS}
        currentStepIndex={currentStepIndex}
      />

      <OnboardingSteps
        currentStep={currentStep}
        stepData={stepData}
        onStepChange={handleStepChange}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onComplete={handleComplete}
        canGoNext={true} // You might want to add validation logic here
        canGoPrevious={currentStepIndex > 0}
        isLastStep={isLastStep}
        isLoading={saveDraftMutation.isPending || completeOnboardingMutation.isPending}
      />
    </div>
  );
}
