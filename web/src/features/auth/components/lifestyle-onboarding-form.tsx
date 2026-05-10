"use client";

import { LifestyleStepOne } from "@/features/auth/components/lifestyle-step-one";
import { LifestyleStepTwo } from "@/features/auth/components/lifestyle-step-two";
import { useLifestyleOnboardingForm } from "@/features/auth/hooks/use-lifestyle-onboarding-form";
import { useLifestyleStep } from "@/features/auth/hooks/use-lifestyle-step";
import { ProgressBar } from "@/shared/ui";

export function LifestyleOnboardingForm() {
  const { currentStep, totalSteps, goToNextStep, goToPreviousStep } = useLifestyleStep();
  const {
    values,
    updateField,
    canSubmit,
    isSubmitting,
    submitErrorMessage,
    handlePreferredTraitToggle,
    handleSubmitLifestyleOnboarding,
  } = useLifestyleOnboardingForm();

  return (
    <div className="flex w-full flex-col gap-[28px]">
      <ProgressBar
        value={currentStep}
        max={totalSteps}
        label={`${currentStep} / ${totalSteps}`}
      />

      {currentStep === 1 ? (
        <LifestyleStepOne
          housingType={values.housingType}
          familyType={values.familyType}
          hasPet={values.hasPet}
          onHousingTypeChange={(value) => updateField("housingType", value)}
          onFamilyTypeChange={(value) => updateField("familyType", value)}
          onHasPetChange={(value) => updateField("hasPet", value)}
          onNext={goToNextStep}
        />
      ) : (
        <LifestyleStepTwo
          dailyOutTime={values.dailyOutTime}
          preferredTraits={values.preferredTraits}
          preferredSize={values.preferredSize}
          onDailyOutTimeChange={(value) => updateField("dailyOutTime", value)}
          onPreferredTraitToggle={handlePreferredTraitToggle}
          onPreferredSizeChange={(value) => updateField("preferredSize", value)}
          canSubmit={canSubmit}
          isSubmitting={isSubmitting}
          submitErrorMessage={submitErrorMessage}
          onPrevious={goToPreviousStep}
          onSubmit={handleSubmitLifestyleOnboarding}
        />
      )}
    </div>
  );
}
