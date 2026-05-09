import { Button, Divider, Heading, Logo, Text } from "@/shared/ui";

function GoogleIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.76-.07-1.49-.2-2.19H12v4.14h5.38a4.6 4.6 0 0 1-2 3.02v2.52h3.24c1.9-1.75 2.98-4.33 2.98-7.49Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.97-.9 6.62-2.43l-3.24-2.52c-.9.6-2.04.95-3.38.95-2.6 0-4.81-1.76-5.6-4.12H3.06v2.6A9.99 9.99 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.4 13.88A6 6 0 0 1 6.08 12c0-.65.11-1.28.32-1.88v-2.6H3.06A9.99 9.99 0 0 0 2 12c0 1.61.39 3.14 1.06 4.48l3.34-2.6Z"
      />
      <path
        fill="#EA4335"
        d="M12 6c1.47 0 2.79.51 3.83 1.5l2.87-2.87C16.97 3.01 14.7 2 12 2a9.99 9.99 0 0 0-8.94 5.52l3.34 2.6C7.19 7.76 9.4 6 12 6Z"
      />
    </svg>
  );
}

function NaverIcon() {
  return (
    <span className="flex size-5 items-center justify-center text-[15px] font-bold leading-none text-white">
      N
    </span>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-md py-2xl">
      <section className="flex w-full max-w-[420px] -translate-y-20 flex-col items-center gap-xl">
        <div className="flex w-full flex-col items-center gap-md">
          <Logo priority />

          <div className="flex flex-col items-center gap-sm text-center">
            <Heading as="h1" size="xl">
              IT-DA
            </Heading>
            <Text size="md" color="muted">
              유기견과 새 가족을 연결해요
            </Text>
          </div>
        </div>

        <Divider className="w-[200px]" />

        <div className="flex w-full max-w-[300px] flex-col gap-3">
          <Button variant="outline" size="lg" fullWidth leftIcon={<GoogleIcon />}>
            구글로 시작하기
          </Button>
          <Button
            size="lg"
            fullWidth
            className="bg-[#03C75A] text-white hover:bg-[#02b350]"
            leftIcon={<NaverIcon />}
          >
            네이버로 시작하기
          </Button>
        </div>
      </section>
    </main>
  );
}
