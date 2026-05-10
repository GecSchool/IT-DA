"use client";

import { useState } from "react";

type UseLifestyleStepOptions = {
  totalSteps?: number;
};

export function useLifestyleStep({ totalSteps = 2 }: UseLifestyleStepOptions = {}) {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => {
    setCurrentStep((step) => Math.min(step + 1, totalSteps));
  };

  const goToPreviousStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 1));
  };

  return {
    currentStep,
    totalSteps,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === totalSteps,
    goToNextStep,
    goToPreviousStep,
  };
}
