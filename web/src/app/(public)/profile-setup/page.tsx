import { ProfileSetupForm } from "@/features/auth/components/profile-setup-form";
import { Heading, Text } from "@/shared/ui";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-md py-2xl">
      <section className="flex w-full max-w-[560px] flex-col gap-xl -translate-y-20">
        <header className="flex flex-col gap-sm">
          <Heading as="h1" size="lg">
            기본 정보를 입력해주세요
          </Heading>
          <Text color="muted">완료하면 모든 기능을 사용할 수 있어요</Text>
        </header>

        <ProfileSetupForm />
      </section>
    </main>
  );
}
