"use client";

import { DogRegisterBasicStep } from "@/features/dogs/components/dog-register-basic-step";
import { DogRegisterEnvironmentStep } from "@/features/dogs/components/dog-register-environment-step";
import { DogRegisterLifestyleStep } from "@/features/dogs/components/dog-register-lifestyle-step";
import { DogImageUploadModal } from "@/features/dogs/components/dog-image-upload-modal";
import { useDogRegisterForm } from "@/features/dogs/hooks/use-dog-register-form";
import { useDogRegisterStep } from "@/features/dogs/hooks/use-dog-register-step";
import { ProgressBar } from "@/shared/ui";

export function DogRegisterForm() {
  const step = useDogRegisterStep();
  const dogRegisterForm = useDogRegisterForm();
  const {
    values,
    fieldErrors,
    sigunguOptions,
    isImageUploadModalOpen,
    isSubmitting,
    submitErrorMessage,
    canProceedByStep,
    canSubmit,
    updateField,
    validateStep,
    handleRegionSidoChange,
    handleRegionSigunguChange,
    handleTraitToggle,
    handleAddImage,
    handleCloseImageUploadModal,
    handleUploadImage,
    handleCompleteImageUpload,
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
    <>
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
            imageError={fieldErrors.imageUrls}
            nameError={fieldErrors.name}
            breedError={fieldErrors.breed}
            regionSidoError={fieldErrors.regionSido}
            regionSigunguError={fieldErrors.regionSigungu}
            weightError={fieldErrors.weight}
            sigunguOptions={sigunguOptions}
            onFieldChange={updateField}
            onRegionSidoChange={handleRegionSidoChange}
            onRegionSigunguChange={handleRegionSigunguChange}
            onAddImage={handleAddImage}
            onRemoveImage={handleRemoveImage}
            canGoNext={canProceedByStep[1]}
            onNext={handleNextStep}
          />
        ) : null}

        {step.currentStep === 2 ? (
          <DogRegisterLifestyleStep
            values={values}
            traitsError={fieldErrors.traits}
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
      <DogImageUploadModal
        open={isImageUploadModalOpen}
        maxCount={3}
        currentCount={values.imageUrls?.length ?? 0}
        onClose={handleCloseImageUploadModal}
        onUpload={handleUploadImage}
        onComplete={handleCompleteImageUpload}
      />
    </>
  );
}
