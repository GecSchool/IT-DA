"use client";

import { DogRegisterBasicStep } from "@/features/dogs/components/dog-register-basic-step";
import { DogRegisterEnvironmentStep } from "@/features/dogs/components/dog-register-environment-step";
import { DogRegisterLifestyleStep } from "@/features/dogs/components/dog-register-lifestyle-step";
import { useDogRegisterForm } from "@/features/dogs/hooks/use-dog-register-form";
import { useDogRegisterStep } from "@/features/dogs/hooks/use-dog-register-step";
import { ProgressBar } from "@/shared/ui";

export function DogRegisterForm() {
  const step = useDogRegisterStep();
  const dogRegisterForm = useDogRegisterForm();
  const {
    form,
    values,
    sigunguOptions,
    isSubmitting,
    submitErrorMessage,
    canProceedByStep,
    canSubmit,
    updateField,
    validateStep,
    handleRegionSidoChange,
    handleTraitToggle,
    handleAddImage,
    handleRemoveImage,
    handleSubmitDogRegister,
  } = dogRegisterForm;

  const handleNextStep = async () => {
    const isValidStep = await validateStep(step.currentStep);

    if (!isValidStep) {
      return;
    }

    step.goToNextStep();
  };

  return (
    <form
      className="flex w-full max-w-[560px] flex-col gap-[28px]"
      onSubmit={handleSubmitDogRegister}
    >
      <ProgressBar
        value={step.currentStep}
        max={step.totalSteps}
        label={`${step.currentStep} / ${step.totalSteps}`}
      />

      {step.currentStep === 1 ? (
        <DogRegisterBasicStep
          values={values}
          imageError={form.formState.errors.imageUrls?.message}
          nameError={form.formState.errors.name?.message}
          breedError={form.formState.errors.breed?.message}
          regionSidoError={form.formState.errors.regionSido?.message}
          regionSigunguError={form.formState.errors.regionSigungu?.message}
          weightError={form.formState.errors.weight?.message}
          sigunguOptions={sigunguOptions}
          onFieldChange={updateField}
          onRegionSidoChange={handleRegionSidoChange}
          onAddImage={handleAddImage}
          onRemoveImage={handleRemoveImage}
          canGoNext={canProceedByStep[1]}
          onNext={handleNextStep}
        />
      ) : null}

      {step.currentStep === 2 ? (
        <DogRegisterLifestyleStep
          values={values}
          traitsError={form.formState.errors.traits?.message}
          onFieldChange={updateField}
          onTraitToggle={handleTraitToggle}
          canGoNext={canProceedByStep[2]}
          onPrevious={step.goToPreviousStep}
          onNext={handleNextStep}
        />
      ) : null}

      {step.currentStep === 3 ? (
        <DogRegisterEnvironmentStep
          values={values}
          submitErrorMessage={submitErrorMessage}
          isSubmitting={isSubmitting}
          canSubmit={canSubmit}
          onFieldChange={updateField}
          onPrevious={step.goToPreviousStep}
        />
      ) : null}
    </form>
  );
}
