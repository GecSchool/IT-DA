import { LifestyleOnboardingForm } from "@/features/auth/components/lifestyle-onboarding-form";
import { SideNavigation } from "@/shared/ui";

export default function Page() {
  return (
    <>
      <SideNavigation />
      <main className="flex min-h-screen justify-center bg-background px-md pb-[calc(96px+env(safe-area-inset-bottom))] pt-2xl md:px-xl md:py-2xl md:pl-[104px]">
        <section className="flex w-full max-w-[560px] flex-col">
          <LifestyleOnboardingForm />
        </section>
      </main>
    </>
  );
}
