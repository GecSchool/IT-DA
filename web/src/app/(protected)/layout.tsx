import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { SideNavigation } from "@/shared/ui";

export default function ProtectedLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <SideNavigation />
      <main className="flex min-h-screen justify-center bg-background px-md pb-[calc(96px+env(safe-area-inset-bottom))] pt-2xl md:px-xl md:py-2xl md:pl-[104px]">
        {children}
      </main>
      {modal}
    </ProtectedRoute>
  );
}
