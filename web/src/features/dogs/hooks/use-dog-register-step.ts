"use client";

import { useState } from "react";

import type { DogRegisterStep } from "@/features/dogs/types/dog-register-form";

const totalSteps = 3;

export function useDogRegisterStep() {
  const [currentStep, setCurrentStep] = useState<DogRegisterStep>(1);

  const goToNextStep = () => {
    setCurrentStep((step) => Math.min(step + 1, totalSteps) as DogRegisterStep);
  };

  const goToPreviousStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 1) as DogRegisterStep);
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
